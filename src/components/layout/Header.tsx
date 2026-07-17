'use client';

import { useTranslation } from 'react-i18next';
import { Menu, Bell, User } from 'lucide-react';
import { useNavigationStore } from '@/stores/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const toggleMobileMenu = useNavigationStore((s) => s.toggleMobileMenu);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 px-4 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/80 md:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileMenu}
          className="-ml-2 rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 dark:bg-white">
            <span className="text-sm font-bold text-white dark:text-neutral-900">C</span>
          </div>
          <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {t('header.appName')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <button className="relative rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-950" />
        </button>
        <button className="flex items-center gap-2 rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700">
            <User className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </div>
        </button>
      </div>
    </header>
  );
}
