'use client';

import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

interface PermissionChangeDialogProps {
  isOpen: boolean;
  addedCount: number;
  removedCount: number;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  isLoading?: boolean;
}

export function PermissionChangeDialog({
  isOpen,
  addedCount,
  removedCount,
  onClose,
  onConfirm,
  isLoading = false,
}: PermissionChangeDialogProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (reason.trim().length < 5) {
      setError('A reason of at least 5 characters is required for this sensitive operation.');
      return;
    }

    try {
      await onConfirm(reason.trim());
      setReason('');
    } catch (err: any) {
      setError(err?.message || 'Failed to update permissions.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-655 dark:text-amber-400 rounded-full shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Confirm Permission Changes
              </h3>
              <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 space-y-1">
                <p>Please confirm the modifications to this role's permission matrix:</p>
                <div className="flex items-center gap-4 mt-2 font-medium">
                  {addedCount > 0 && (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      +{addedCount} granted
                    </span>
                  )}
                  {removedCount > 0 && (
                    <span className="text-red-600 dark:text-red-400">
                      -{removedCount} revoked
                    </span>
                  )}
                  {addedCount === 0 && removedCount === 0 && (
                    <span className="text-slate-500">No changes detected</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="change-reason" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1.5">
                Audit Reason for Change <span className="text-red-500">*</span>
              </label>
              <textarea
                id="change-reason"
                rows={3}
                required
                placeholder="Describe why you are modifying this role's permissions (minimum 5 characters)..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-955 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition text-sm"
              />
              {error && (
                <p className="text-red-650 dark:text-red-400 text-xs mt-1.5 font-semibold">
                  {error}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Confirm Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default PermissionChangeDialog;
