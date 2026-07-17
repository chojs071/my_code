import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300': variant === 'default',
          'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400': variant === 'success',
          'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': variant === 'warning',
          'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400': variant === 'danger',
          'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400': variant === 'info',
        },
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
