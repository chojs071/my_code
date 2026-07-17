'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { interviewData } from '@/data/interview';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { MessageSquare, Lightbulb, ArrowRight, ChevronRight } from 'lucide-react';

const difficultyColor = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
} as const;

export default function InterviewPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [questions, setQuestions] = useState(interviewData);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setQuestions(interviewData);
      return;
    }
    const lower = q.toLowerCase();
    setQuestions(
      interviewData.filter(
        (q) =>
          q.question.toLowerCase().includes(lower) ||
          q.category.toLowerCase().includes(lower)
      )
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {t('interview.title')}
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {t('interview.subtitle')}
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {questions.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="h-12 w-12" />}
          title={t('interview.noQuestions')}
        />
      ) : (
        <div className="space-y-3">
          {questions.map((q) => {
            const isActive = activeId === q.id;
            const hintShown = showHint === q.id;

            return (
              <Card key={q.id} hover={!isActive} className={isActive ? 'ring-2 ring-neutral-900 dark:ring-white' : ''}>
                <button
                  onClick={() => setActiveId(isActive ? null : q.id)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <MessageSquare className="h-4 w-4 text-neutral-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={difficultyColor[q.difficulty]} size="sm">
                        {t(`interview.${q.difficulty}`)}
                      </Badge>
                      <Badge size="sm">{q.category}</Badge>
                    </div>
                    <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {q.question}
                    </p>
                  </div>
                  <ChevronRight
                    className={`mt-1 h-5 w-5 shrink-0 text-neutral-400 transition-transform ${
                      isActive ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {isActive && q.hint && (
                  <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    {hintShown ? (
                      <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                        <p>{q.hint}</p>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHint(q.id);
                        }}
                      >
                        <Lightbulb className="h-4 w-4" />
                        {t('interview.showHint')}
                      </Button>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
