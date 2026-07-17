'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useCertificateStore } from '@/stores/certificates';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Award, Plus, ExternalLink, Calendar, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Certificate } from '@/types';

const emptyForm = {
  name: '',
  issuer: '',
  date: new Date().toISOString().split('T')[0],
  expiry: '',
  credentialUrl: '',
};

type FormState = typeof emptyForm;

export default function CertificatesPage() {
  const { t } = useTranslation();
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useCertificateStore();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Certificate[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(certificates);
      return;
    }
    const lower = query.toLowerCase();
    setFiltered(
      certificates.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.issuer.toLowerCase().includes(lower)
      )
    );
  }, [query, certificates]);

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (cert: Certificate) => {
    setEditingId(cert.id);
    setForm({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiry: cert.expiry || '',
      credentialUrl: cert.credentialUrl || '',
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.issuer.trim()) return;
    const payload = {
      name: form.name.trim(),
      issuer: form.issuer.trim(),
      date: form.date,
      expiry: form.expiry.trim() || undefined,
      credentialUrl: form.credentialUrl.trim() || undefined,
      image: '/placeholder.svg',
    };

    if (editingId) {
      updateCertificate(editingId, payload);
    } else {
      addCertificate(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('resume.deleteConfirm'))) {
      deleteCertificate(id);
    }
  };

  const displayCerts = filtered;

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
        <Button size="sm" onClick={openAddModal}>
          <Plus className="h-4 w-4" />
          {t('certificates.addCertificate')}
        </Button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder={t('common.search')} />

      {displayCerts.length === 0 ? (
        <EmptyState
          icon={<Award className="h-12 w-12" />}
          title={t('certificates.noCertificates')}
          action={
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4" />
              {t('certificates.addCertificate')}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {displayCerts.map((cert) => (
            <Card key={cert.id} hover className="group relative flex gap-4">
              {/* Action buttons */}
              <div className="absolute right-3 top-3 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => openEditModal(cert)}
                  className="rounded-lg bg-white/90 p-1.5 text-neutral-500 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-neutral-800 dark:bg-neutral-800/90 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="rounded-lg bg-white/90 p-1.5 text-red-400 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-600 dark:bg-neutral-800/90 dark:text-red-400 dark:hover:bg-neutral-700 dark:hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

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

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? t('certificates.editCertificate') : t('certificates.addCertificate')}
      >
        <div className="space-y-4">
          <Input
            label={t('resume.formTitle')}
            id="cert-name"
            placeholder={t('certificates.formNamePlaceholder')}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label={t('certificates.issuer')}
            id="cert-issuer"
            placeholder={t('certificates.formIssuerPlaceholder')}
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('certificates.issued')}
              id="cert-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <Input
              label={t('certificates.expiry')}
              id="cert-expiry"
              type="date"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
            />
          </div>
          <Input
            label={t('certificates.credentialUrl')}
            id="cert-url"
            placeholder="https://credential.example.com/..."
            value={form.credentialUrl}
            onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSave}>
              {t('common.save')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
