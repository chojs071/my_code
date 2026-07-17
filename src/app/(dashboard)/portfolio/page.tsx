'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { usePortfolioStore } from '@/stores/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchBar } from '@/components/ui/SearchBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import {
  Briefcase,
  Plus,
  ExternalLink,
  Calendar,
  Pencil,
  Trash2,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { PortfolioProject } from '@/types';

const emptyForm = {
  title: '',
  description: '',
  tags: '',
  url: '',
  date: new Date().toISOString().split('T')[0],
};

type FormState = typeof emptyForm;

export default function PortfolioPage() {
  const { t } = useTranslation();
  const { projects, addProject, updateProject, deleteProject } = usePortfolioStore();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<PortfolioProject[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(projects);
      return;
    }
    const lower = query.toLowerCase();
    setFiltered(
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(lower))
      )
    );
  }, [query, projects]);

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (project: PortfolioProject) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      url: project.url || '',
      date: project.date,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags,
      url: form.url.trim() || undefined,
      date: form.date,
      image: '/placeholder.svg',
    };

    if (editingId) {
      updateProject(editingId, payload);
    } else {
      addProject(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('resume.deleteConfirm'))) {
      deleteProject(id);
    }
  };

  const displayProjects = filtered;

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
        <Button size="sm" onClick={openAddModal}>
          <Plus className="h-4 w-4" />
          {t('portfolio.addProject')}
        </Button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder={t('common.search')} />

      {displayProjects.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-12 w-12" />}
          title={t('portfolio.noProjects')}
          action={
            <Button onClick={openAddModal}>
              <Plus className="h-4 w-4" />
              {t('portfolio.addProject')}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {displayProjects.map((project) => (
            <Card key={project.id} hover className="group relative flex flex-col">
              <div className="absolute right-3 top-3 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => openEditModal(project)}
                  className="rounded-lg bg-white/90 p-1.5 text-neutral-500 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-neutral-800 dark:bg-neutral-800/90 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded-lg bg-white/90 p-1.5 text-red-400 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-600 dark:bg-neutral-800/90 dark:text-red-400 dark:hover:bg-neutral-700 dark:hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

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
                <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? (t('portfolio.editProject') || 'Edit Project') : t('portfolio.addProject')}
      >
        <div className="space-y-4">
          <Input
            label={t('resume.formTitle')}
            id="project-title"
            placeholder={t('portfolio.formTitlePlaceholder') || 'My Project'}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            label={t('resume.formDescription')}
            id="project-desc"
            placeholder={t('portfolio.formDescPlaceholder') || 'Describe your project...'}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Input
            label={t('portfolio.url') || 'URL'}
            id="project-url"
            placeholder="https://github.com/my-project"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
          <Input
            label={t('portfolio.date')}
            id="project-date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Input
            label={t('resume.formTags')}
            id="project-tags"
            placeholder={t('resume.formTagsHint')}
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
