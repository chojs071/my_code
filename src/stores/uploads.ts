import { create } from 'zustand';

export interface UploadedFile {
  id: string;
  name: string;
  fileName: string;
  size: number;
  uploadedAt: string;
}

interface UploadStore {
  files: UploadedFile[];
  uploading: boolean;
  loading: boolean;
  fetchFiles: () => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
}

export const useUploadStore = create<UploadStore>((set, get) => ({
  files: [],
  uploading: false,
  loading: false,

  fetchFiles: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/uploads/resume');
      const data = await res.json();
      set({ files: data.files ?? [] });
    } catch {
      console.error('Failed to fetch files');
    } finally {
      set({ loading: false });
    }
  },

  uploadFile: async (file: File) => {
    set({ uploading: true });
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/uploads/resume', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Upload failed');
      }
      await get().fetchFiles();
    } finally {
      set({ uploading: false });
    }
  },

  deleteFile: async (id: string) => {
    try {
      const res = await fetch(`/api/uploads/resume?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      set({ files: get().files.filter((f) => f.id !== id) });
    } catch {
      console.error('Failed to delete file');
    }
  },
}));
