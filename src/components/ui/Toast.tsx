'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', show, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={cn(
            'fixed right-4 top-4 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg',
            {
              'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200': type === 'success',
              'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/50 dark:text-red-200': type === 'error',
              'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/50 dark:text-blue-200': type === 'info',
            }
          )}
        >
          {type === 'success' && <Check className="h-5 w-5" />}
          {type === 'error' && <AlertCircle className="h-5 w-5" />}
          {type === 'info' && <AlertCircle className="h-5 w-5" />}
          <p className="text-sm font-medium">{message}</p>
          <button onClick={onClose} className="ml-2 rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

let toastId = 0;
const listeners = new Set<(toast: { id: number; message: string; type: 'success' | 'error' | 'info' }) => void>();

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const id = ++toastId;
  listeners.forEach((fn) => fn({ id, message, type }));
}
