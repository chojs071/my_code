'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResumeStore } from '@/stores/resume';
import { useUploadStore } from '@/stores/uploads';
import type { ResumeEntry } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Dialog } from '@/components/ui/Dialog';
import { Modal } from '@/components/ui/Modal';
import { UploadZone } from '@/components/ui/UploadZone';
import {
  FileText, Plus, Download, Trash2, Pencil,
  File, Loader2,
} from 'lucide-react';

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface FormState {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string;
}

const emptyForm: FormState = {
  title: '',
  organization: '',
  period: '',
  description: '',
  tags: '',
};

export default function ResumePage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const { entries, addEntry, updateEntry, deleteEntry } = useResumeStore();
  const { files, uploading, loading: uploadsLoading, fetchFiles, uploadFile, deleteFile } = useUploadStore();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.organization.toLowerCase().includes(q) ||
        e.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query, entries]);

  const openAddModal = useCallback(() => {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((entry: ResumeEntry) => {
    setForm({
      title: entry.title,
      organization: entry.organization,
      period: entry.period,
      description: entry.description,
      tags: entry.tags.join(', '),
    });
    setEditingId(entry.id);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!form.title.trim() || !form.organization.trim()) return;
    const tags = form.tags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const data = {
      title: form.title.trim(),
      organization: form.organization.trim(),
      period: form.period.trim(),
      description: form.description.trim(),
      tags,
    };

    if (editingId) {
      updateEntry(editingId, data);
    } else {
      addEntry(data);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  }, [form, editingId, addEntry, updateEntry]);

  const handleDelete = useCallback(() => {
    if (!deleteId) return;
    deleteEntry(deleteId);
    setDeleteId(null);
  }, [deleteId, deleteEntry]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {t("resume.title")}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {t("resume.subtitle")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            {t("resume.download")}
          </Button>
          <Button size="sm" onClick={openAddModal}>
            <Plus className="h-4 w-4" />
            {t("resume.addExperience")}
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <FileText className="h-4 w-4 text-neutral-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {t("resume.uploadResume")}
            </h2>
            <p className="text-xs text-neutral-400">{t("resume.uploadSubtitle")}</p>
          </div>
        </div>
        <UploadZone onUpload={uploadFile} uploading={uploading} />
      </Card>

      {uploadsLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      ) : files.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {t("resume.uploadedFiles")} ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <File className="h-5 w-5 text-neutral-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-neutral-900 dark:text-nettral-100">{file.name}</p>
                  <p className="text-xs text-neutral-400">
                    {formatSize(file.size)} &middot; {formatDate(file.uploadedAt)}
                  </p>
                </div>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <SearchBar onSearch={setQuery} placeholder={t("resume.searchExperience")} />

      {filtered.length === 0 && !query.trim() && entries.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-12 w-12" />}
          title={t("resume.noEntries")}
          action={
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4" />
              {t("resume.addExperience")}
            </Button>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<FileText className="h-12 w-12" />} title={t("common.noResults")} />
      ) : (
        <div className="space-y-4">
          {filtered.map((entry) => (
            <Card key={entry.id} hover className="group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-sm font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                      {entry.organization.charAt(0)}
                    </span>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{entry.title}</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">{entry.organization}</p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="rounded-lg p-1.5 text-neutral-400 opacity-0 transition-opacity hover:bg-neutral-100 hover:text-neutral-600 group-hover:opacity-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(entry.id)}
                    className="rounded-lg p-1.5 text-neutral-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {entry.description || '\u2014'}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <span className="text-xs text-neutral-400 dark:text-neutral-500">{entry.period}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingId(null); }}
        title={editingId ? t("resume.editExperience") : t("resume.addExperience")}
      >
        <div className="space-y-4">
          <Input
            id="title"
            label={t("resume.formTitle")}
            placeholder={t("resume.formTitlePlaceholder")}
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <Input
            id="organization"
            label={t("resume.formOrganization")}
            placeholder={t("resume.formOrgPlaceholder")}
            value={form.organization}
            onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
          />
          <Input
            id="period"
            label={t("resume.formPeriod")}
            placeholder={t("resume.formPeriodPlaceholder")}
            value={form.period}
            onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
          />
          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t("resume.formDescription")}
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder={t("resume.formDescriptionPlaceholder")}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 transition-colors focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:border-neutral-500 dark:focus:ring-white/10"
            />
          </div>
          <Input
            id="tags"
            label={t("resume.formTags")}
            placeholder={t("resume.formTagsHint")}
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => { setModalOpen(false); setEditingId(null); }}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSave}>
              {t("common.save")}
            </Button>
          </div>
        </div>
      </Modal>

      <Dialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title={t("resume.deleteExperience")}
        description={t("resume.deleteConfirm")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        variant="danger"
      />
    </div>
  );
}
