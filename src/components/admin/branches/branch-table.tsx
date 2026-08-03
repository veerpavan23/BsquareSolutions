'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2, Archive, RotateCcw, Building2, MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';
import { Branch } from '@prisma/client';
import { BranchArchiveDialog } from './branch-archive-dialog';
import { archiveBranchAction, restoreBranchAction } from '@/modules/branches/branch.actions';

interface BranchTableProps {
  branches: (Branch & { _count?: { classrooms: number } })[];
  userPermissions: string[];
  onRefresh: () => void;
}

export function BranchTable({ branches, userPermissions, onRefresh }: BranchTableProps) {
  const [archiveTarget, setArchiveTarget] = useState<(Branch & { _count?: { classrooms: number } }) | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canEdit = userPermissions.includes('branch.edit');
  const canArchive = userPermissions.includes('branch.archive');
  const canRestore = userPermissions.includes('branch.restore');

  const handleArchiveConfirm = async (reason: string) => {
    if (!archiveTarget) return;
    setIsSubmitting(true);
    try {
      const res = await archiveBranchAction(archiveTarget.id, archiveTarget.recordVersion, reason);
      if (res.success) {
        onRefresh();
        setArchiveTarget(null);
      } else {
        alert(res.error.message);
      }
    } catch (err: any) {
      alert(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestore = async (branch: Branch) => {
    if (!confirm(`Are you sure you want to restore the branch '${branch.branchName}'?`)) return;
    try {
      const res = await restoreBranchAction(branch.id, branch.recordVersion);
      if (res.success) {
        onRefresh();
      } else {
        alert(res.error.message);
      }
    } catch (err: any) {
      alert(err.message || 'An unexpected error occurred.');
    }
  };

  const formatBranchType = (type: string) => {
    return type.replace(/_/g, ' ');
  };

  if (branches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <Building2 className="w-12 h-12 text-slate-350 dark:text-slate-600 mb-3" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">No Branches Found</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
          Adjust your filter options or create a new branch location configuration.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                <th className="px-6 py-3.5 font-semibold">Code</th>
                <th className="px-6 py-3.5 font-semibold">Branch Name</th>
                <th className="px-6 py-3.5 font-semibold">Type</th>
                <th className="px-6 py-3.5 font-semibold">City/State</th>
                <th className="px-6 py-3.5 font-semibold">Contact</th>
                <th className="px-6 py-3.5 font-semibold text-center">Classrooms</th>
                <th className="px-6 py-3.5 font-semibold text-center">HQ</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-850/60 text-slate-700 dark:text-slate-300">
              {branches.map((branch) => {
                const isArchived = branch.deletedAt !== null;
                return (
                  <tr key={branch.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-white">
                      {branch.branchCode}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-955 dark:text-slate-200">
                      {branch.branchName}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        {formatBranchType(branch.branchType)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{branch.city || 'Virtual'}, {branch.state || 'Online'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-0.5 text-xs text-slate-500 dark:text-slate-450">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 shrink-0" />
                        <span>{branch.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 shrink-0" />
                        <span>{branch.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {branch._count?.classrooms ?? 0}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {branch.isHeadOffice ? (
                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                          HQ
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-650">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isArchived ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-150 dark:border-red-900/40">
                          <XCircle className="w-3 h-3" />
                          <span>Archived</span>
                        </span>
                      ) : branch.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/40">
                          <CheckCircle className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-150 dark:border-amber-900/40">
                          <XCircle className="w-3 h-3" />
                          <span>Inactive</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {canEdit && !isArchived && (
                          <Link
                            href={`/admin/branches/${branch.id}/edit`}
                            aria-label={`Edit ${branch.branchName}`}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                        )}
                        {!isArchived && canArchive && (
                          <button
                            onClick={() => setArchiveTarget(branch)}
                            aria-label={`Archive ${branch.branchName}`}
                            className="p-1.5 text-slate-400 hover:text-red-650 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        {isArchived && canRestore && (
                          <button
                            onClick={() => handleRestore(branch)}
                            aria-label={`Restore ${branch.branchName}`}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 rounded transition"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards Layout */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800/60">
          {branches.map((branch) => {
            const isArchived = branch.deletedAt !== null;
            return (
              <div key={branch.id} className="p-4 space-y-3 hover:bg-slate-50/20 dark:hover:bg-slate-950/10 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {branch.branchCode}
                    </span>
                    {branch.isHeadOffice && (
                      <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                        HQ
                      </span>
                    )}
                  </div>
                  {isArchived ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-150 dark:border-red-900/40">
                      Archived
                    </span>
                  ) : branch.isActive ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/40">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-150 dark:border-amber-900/40">
                      Inactive
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {branch.branchName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {formatBranchType(branch.branchType)} &bull; {branch.city || 'Virtual'}, {branch.state || 'Online'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-800/40 pt-2">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Contact</span>
                    <span className="block mt-0.5 truncate">{branch.phone}</span>
                    <span className="block truncate">{branch.email}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Classrooms</span>
                    <span className="block mt-0.5 font-bold text-slate-800 dark:text-slate-200">
                      {branch._count?.classrooms ?? 0} rooms
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/40">
                  {canEdit && !isArchived && (
                    <Link
                      href={`/admin/branches/${branch.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-350 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                  )}
                  {!isArchived && canArchive && (
                    <button
                      onClick={() => setArchiveTarget(branch)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded transition"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      <span>Archive</span>
                    </button>
                  )}
                  {isArchived && canRestore && (
                    <button
                      onClick={() => handleRestore(branch)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BranchArchiveDialog
        isOpen={!!archiveTarget}
        branchName={archiveTarget?.branchName || ''}
        onClose={() => setArchiveTarget(null)}
        onConfirm={handleArchiveConfirm}
        isLoading={isSubmitting}
      />
    </>
  );
}
export default BranchTable;
