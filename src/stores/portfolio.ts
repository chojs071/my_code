import { create } from 'zustand';
import { PortfolioProject } from '@/types';

const STORAGE_KEY = 'careerhub-portfolio-projects';

function loadFromStorage(): PortfolioProject[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(projects: PortfolioProject[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // storage full or unavailable
  }
}

interface PortfolioStore {
  projects: PortfolioProject[];
  loading: boolean;
  addProject: (project: Omit<PortfolioProject, 'id'>) => void;
  updateProject: (id: string, project: Partial<Omit<PortfolioProject, 'id'>>) => void;
  deleteProject: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  projects: loadFromStorage(),
  loading: false,

  addProject: (project) => {
    const newProject: PortfolioProject = {
      ...project,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    };
    const updated = [...get().projects, newProject];
    set({ projects: updated });
    saveToStorage(updated);
  },

  updateProject: (id, data) => {
    const updated = get().projects.map((p) =>
      p.id === id ? { ...p, ...data } : p
    );
    set({ projects: updated });
    saveToStorage(updated);
  },

  deleteProject: (id) => {
    const updated = get().projects.filter((p) => p.id !== id);
    set({ projects: updated });
    saveToStorage(updated);
  },
}));
