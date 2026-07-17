'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/config/navigation';
import { cn } from '@/lib/utils';
import {
  FileText,
  Briefcase,
  MessageSquare,
  Award,
  Sparkles,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Briefcase,
  MessageSquare,
  Award,
  Sparkles,
};

export function BottomNav() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white/90 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/90 lg:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] ?? FileText;
          const isActive = pathname === item.href;
          const isDisabled = item.disabled;

          return (
            <Link
              key={item.id}
              href={isDisabled ? '#' : item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'text-neutral-900 dark:text-neutral-100'
                  : 'text-neutral-400 dark:text-neutral-500',
                isDisabled && 'cursor-not-allowed opacity-40'
              )}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <Icon className="h-5 w-5" />
              <span>{t(item.label)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
