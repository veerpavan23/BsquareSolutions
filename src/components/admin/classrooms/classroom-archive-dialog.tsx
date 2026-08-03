'use client';

import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface ClassroomArchiveDialogProps {
  isOpen: boolean;
  classroomName: string;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  isLoading?: boolean;
}

export function ClassroomArchiveDialog({
  isOpen,
  classroomName,
  onClose,
  onConfirm,
  isLoading = false,
}: ClassroomArchiveDialogProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (reason.trim().length < 5) {
      setError('A reason of at least 5 characters is required.');
      return;
    }

    try {
      await onConfirm(reason.trim());
      setReason('');
    } catch (err: any) {
      setError(err?.message || 'Failed to archive classroom. Please check active batch dependencies.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Archive Classroom
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to archive <strong className="text-slate-705 dark:text-slate-200">{classroomName}</strong>? 
                This will soft-delete the record and remove it from active course scheduling pools.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="archive-reason" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1.5">
                Reason for archiving <span className="text-red-500">*</span>
              </label>
              <textarea
                id="archive-reason"
                rows={3}
                required
                placeholder="e.g. Undergoing renovation or converting room to trainer lounge"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition text-sm"
              />
              {error && (
                <p className="text-red-650 dark:text-red-400 text-xs mt-1.5 font-medium">
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-slate-705 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-sm transition disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Archiving...</span>
                  </>
                ) : (
                  'Confirm Archive'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ClassroomArchiveDialog;
