import { create } from 'zustand';
import { ModuleId } from '@/types';

interface NavigationState {
  activeModule: ModuleId;
  isMobileMenuOpen: boolean;
  setActiveModule: (module: ModuleId) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeModule: 'resume',
  isMobileMenuOpen: false,
  setActiveModule: (module) => set({ activeModule: module, isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
