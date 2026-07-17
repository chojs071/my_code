'use client';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { certificateData } from '@/data/certificates';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Award, Plus, ExternalLink, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function CertificatesPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [certs, setCerts] = useState(certificateData);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setCerts(certificateData);
      return;
    }
    const lower = q.toLowerCase();
    setCerts(
      certificateData.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.issuer.toLowerCase().includes(lower)
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {t('certificates.title')}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {t('certificates.subtitle')}
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          {t('certificates.addCertificate')}
        </Button>
      </div>

      <SearchBar onSearch={handleSearch} />

      {certs.length === 0 ? (
        <EmptyState
          icon={<Award className="h-12 w-12" />}
          title={t('certificates.noCertificates')}
          action={
            <Button>
              <Plus className="h-4 w-4" />
              {t('certificates.addCertificate')}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certs.map((cert) => (
            <Card key={cert.id} hover className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30">
                <Award className="h-7 w-7 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {cert.name}
                  </h3>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {cert.issuer}
                </p>
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {t('certificates.issued')}: {formatDate(cert.date)}
                  </div>
                  {cert.expiry && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {t('certificates.expiry')}: {formatDate(cert.expiry)}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
