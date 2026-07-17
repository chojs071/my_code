'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { portfolioData } from '@/data/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Briefcase, Plus, ExternalLink, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function PortfolioPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState(portfolioData);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setProjects(portfolioData);
      return;
    }
    const lower = q.toLowerCase();
    setProjects(
      portfolioData.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lower))
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {t('portfolio.title')}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {t('portfolio.subtitle')}
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          {t('portfolio.addProject')}
        </Button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {projects.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-12 w-12" />}
          title={t('portfolio.noProjects')}
          action={
            <Button>
              <Plus className="h-4 w-4" />
              {t('portfolio.addProject')}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} hover className="flex flex-col">
              <div className="mb-3 flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                <Briefcase className="h-10 w-10 text-neutral-300 dark:text-neutral-600" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {project.title}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(project.date)}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="info" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
