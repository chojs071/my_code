'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Bell } from 'lucide-react';

export default function FuturePage() {
  const { t } = useTranslation();

  const upcomingFeatures = [
    {
      title: 'Analytics Dashboard',
      description: 'Track application views, interview success rates, and skill growth over time.',
      icon: '📊',
      status: 'In Development',
    },
    {
      title: 'AI Resume Assistant',
      description: 'Get intelligent suggestions for resume improvement and keyword optimization.',
      icon: '🤖',
      status: 'Planning',
    },
    {
      title: 'Skill Assessments',
      description: 'Take technical assessments to validate and showcase your skills.',
      icon: '📝',
      status: 'Planning',
    },
    {
      title: 'Network & Community',
      description: 'Connect with peers, mentors, and recruiters in your field.',
      icon: '🌐',
      status: 'Research',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {t('future.title')}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {t('future.subtitle')}
        </p>
      </div>

      <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-12 text-center dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30">
          <Sparkles className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {t('future.title')}
        </h2>
        <p className="mt-2 max-w-md text-sm text-neutral-500 dark:text-neutral-400">
          {t('future.description')}
        </p>
        <Button className="mt-6">
          <Bell className="h-4 w-4" />
          {t('future.notifyMe')}
        </Button>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Upcoming Features
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {upcomingFeatures.map((feature) => (
            <Card key={feature.title}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {feature.title}
                    </h4>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
