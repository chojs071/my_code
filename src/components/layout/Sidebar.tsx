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

export function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 lg:block">
      <nav className="flex flex-col gap-1 p-4 pt-6">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] ?? FileText;
          const isActive = pathname === item.href;
          const isDisabled = item.disabled;

          const link = (
            <Link
              href={isDisabled ? '#' : item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-200',
                isDisabled && 'cursor-not-allowed opacity-40'
              )}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <Icon className="h-5 w-5" />
              <span>{t(item.label)}</span>
              {isDisabled && (
                <span className="ml-auto rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
                  Soon
                </span>
              )}
            </Link>
          );

          return <div key={item.id}>{link}</div>;
        })}
      </nav>
    </aside>
  );
}
