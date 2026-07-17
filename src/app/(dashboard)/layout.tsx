'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useNavigationStore } from '@/stores/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobileMenuOpen = useNavigationStore((s) => s.isMobileMenuOpen);
  const closeMobileMenu = useNavigationStore((s) => s.closeMobileMenu);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key="page-content"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <BottomNav />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
