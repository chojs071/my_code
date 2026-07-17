'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder, className }: SearchBarProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder={placeholder ?? t('common.search')}
        className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-white/10"
      />
      <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-xs text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-500 md:flex">
        <span>⌘</span>K
      </kbd>
    </div>
  );
}
