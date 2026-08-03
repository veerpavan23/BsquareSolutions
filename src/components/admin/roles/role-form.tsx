'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, AlertCircle } from 'lucide-react';
import { createRoleAction } from '@/modules/roles/role.actions';

export function RoleForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Status/Error States
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg('');
    setFieldErrors({});

    try {
      const res = await createRoleAction({
        name: name.trim(),
        description: description.trim() || null,
        isActive,
      });

      if (res.success) {
        router.push('/admin/settings/roles');
      } else {
        setErrorMsg(res.error.message);
        if (res.error.fieldErrors) {
          setFieldErrors(res.error.fieldErrors);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div>
            <h5 className="font-semibold">Failed to Create Role</h5>
            <p className="mt-0.5 text-xs">{errorMsg}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="role-name" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
            Role Name <span className="text-red-500">*</span>
          </label>
          <input
            id="role-name"
            type="text"
            required
            placeholder="e.g. Content Publisher"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
          />
          {fieldErrors.name && (
            <p className="text-red-550 text-xs mt-1">{fieldErrors.name[0]}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="role-desc" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
            Description
          </label>
          <textarea
            id="role-desc"
            rows={3}
            placeholder="Provide a brief explanation of the user responsibilities associated with this role..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
          />
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-955/40 rounded-lg border border-slate-100 dark:border-slate-805">
          <div>
            <span className="block text-sm font-semibold text-slate-900 dark:text-white">Active Status</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">Allow users to be assigned to this role</span>
          </div>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-indigo-650 border-slate-300 dark:border-slate-800 rounded cursor-pointer"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-850 pt-6">
        <button
          type="button"
          onClick={() => router.push('/admin/settings/roles')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md hover:shadow-lg transition"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Create Role</span>
        </button>
      </div>
    </form>
  );
}
export default RoleForm;
