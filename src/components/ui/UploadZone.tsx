'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, File, X, FileText, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onUpload: (file: File) => Promise<void>;
  uploading?: boolean;
  accept?: string;
  maxSize?: number;
}

export function UploadZone({ onUpload, uploading = false, accept = '.pdf,.doc,.docx,.txt,.md,.rtf', maxSize = 10 }: UploadZoneProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const validateAndUpload = useCallback(
    (file: File) => {
      setError(null);
      setFileName(null);

      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const allowed = accept.split(',');
      if (!allowed.includes(ext)) {
        setError(t('resume.uploadInvalidType'));
        return;
      }

      if (file.size > maxSize * 1024 * 1024) {
        setError(t('resume.uploadTooLarge').replace('{size}', String(maxSize)));
        return;
      }

      setFileName(file.name);
      onUpload(file);
    },
    [onUpload, accept, maxSize, t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndUpload(file);
    },
    [validateAndUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndUpload(file);
    },
    [validateAndUpload]
  );

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors',
          dragging
            ? 'border-neutral-900 bg-neutral-50 dark:border-neutral-400 dark:bg-neutral-800/50'
            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:border-neutral-500 dark:hover:bg-neutral-800/30'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />

        {uploading ? (
          <>
            <Loader2 className="mb-3 h-8 w-8 animate-spin text-neutral-400" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('resume.uploading')}</p>
          </>
        ) : (
          <>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <Upload className="h-6 w-6 text-neutral-500" />
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t('resume.dropzoneTitle')}
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              {t('resume.dropzoneHint').replace('{size}', String(maxSize))}
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          <X className="h-4 w-4 shrink-0" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto rounded p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {fileName && !uploading && !error && (
        <div className="flex items-center gap-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
          <FileText className="h-4 w-4 shrink-0" />
          <span className="truncate">{fileName}</span>
          <span className="text-xs text-emerald-500">{t('resume.uploadSuccess')}</span>
        </div>
      )}
    </div>
  );
}
