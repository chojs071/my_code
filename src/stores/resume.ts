import { create } from 'zustand';
import { ResumeEntry } from '@/types';

const STORAGE_KEY = 'careerhub-resume-entries';

function loadFromStorage(): ResumeEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(entries: ResumeEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // storage full or unavailable
  }
}

interface ResumeStore {
  entries: ResumeEntry[];
  loading: boolean;
  addEntry: (entry: Omit<ResumeEntry, 'id'>) => void;
  updateEntry: (id: string, entry: Partial<Omit<ResumeEntry, 'id'>>) => void;
  deleteEntry: (id: string) => void;
  reorder: (entries: ResumeEntry[]) => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  entries: loadFromStorage(),
  loading: false,

  addEntry: (entry) => {
    const newEntry: ResumeEntry = {
      ...entry,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    };
    const updated = [...get().entries, newEntry];
    set({ entries: updated });
    saveToStorage(updated);
  },

  updateEntry: (id, data) => {
    const updated = get().entries.map((e) =>
      e.id === id ? { ...e, ...data } : e
    );
    set({ entries: updated });
    saveToStorage(updated);
  },

  deleteEntry: (id) => {
    const updated = get().entries.filter((e) => e.id !== id);
    set({ entries: updated });
    saveToStorage(updated);
  },

  reorder: (entries) => {
    set({ entries });
    saveToStorage(entries);
  },
}));
