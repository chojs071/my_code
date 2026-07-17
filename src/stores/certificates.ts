import { create } from 'zustand';
import { Certificate } from '@/types';

const STORAGE_KEY = 'careerhub-certificates';

function loadFromStorage(): Certificate[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(certs: Certificate[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
  } catch {
    // storage full or unavailable
  }
}

interface CertificateStore {
  certificates: Certificate[];
  loading: boolean;
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<Omit<Certificate, 'id'>>) => void;
  deleteCertificate: (id: string) => void;
}

export const useCertificateStore = create<CertificateStore>((set, get) => ({
  certificates: loadFromStorage(),
  loading: false,

  addCertificate: (cert) => {
    const newCert: Certificate = {
      ...cert,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    };
    const updated = [...get().certificates, newCert];
    set({ certificates: updated });
    saveToStorage(updated);
  },

  updateCertificate: (id, data) => {
    const updated = get().certificates.map((c) =>
      c.id === id ? { ...c, ...data } : c
    );
    set({ certificates: updated });
    saveToStorage(updated);
  },

  deleteCertificate: (id) => {
    const updated = get().certificates.filter((c) => c.id !== id);
    set({ certificates: updated });
    saveToStorage(updated);
  },
}));
