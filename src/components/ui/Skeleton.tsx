import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-neutral-200 dark:bg-neutral-700',
        {
          'h-4 w-full rounded': variant === 'text',
          'rounded-full': variant === 'circular',
          'rounded-lg': variant === 'rectangular',
        },
        className
      )}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <Skeleton className="mb-2 h-5 w-3/4" />
      <Skeleton className="mb-1 h-4 w-1/2" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
