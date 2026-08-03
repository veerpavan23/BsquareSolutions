'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, ShieldAlert, Key, Archive, CheckCircle, XCircle } from 'lucide-react';
import { Role } from '@prisma/client';
import { RoleArchiveDialog } from './role-archive-dialog';
import { archiveRoleAction } from '@/modules/roles/role.actions';

interface RoleListProps {
  roles: (Role & { userCount: number; permissionCount: number })[];
  userPermissions: string[];
  onRefresh: () => void;
}

export function RoleList({ roles, userPermissions, onRefresh }: RoleListProps) {
  const [archiveTarget, setArchiveTarget] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canEdit = userPermissions.includes('role.edit');
  const canArchive = userPermissions.includes('role.archive');
  const canViewPermissions = userPermissions.includes('permission.view');

  const handleArchiveConfirm = async (reason: string) => {
    if (!archiveTarget) return;
    setIsSubmitting(true);
    try {
      const res = await archiveRoleAction(archiveTarget.id, reason);
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

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                <th className="px-6 py-3.5 font-semibold">Role Name</th>
                <th className="px-6 py-3.5 font-semibold">Description</th>
                <th className="px-6 py-3.5 font-semibold text-center">Active Users</th>
                <th className="px-6 py-3.5 font-semibold text-center">Permissions</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-850/60 text-slate-700 dark:text-slate-300">
              {roles.map((role) => {
                const isArchived = role.deletedAt !== null;
                return (
                  <tr key={role.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-955/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {role.name}
                        </span>
                        {role.isProtected ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-50 dark:bg-red-950/30 text-red-650 dark:text-red-400 border border-red-100 dark:border-red-900/40">
                            <ShieldAlert className="w-2.5 h-2.5" />
                            <span>PROTECTED</span>
                          </span>
                        ) : role.isSystemRole ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-755 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                            <Shield className="w-2.5 h-2.5" />
                            <span>SYSTEM</span>
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {role.description || 'No description provided.'}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                      {role.userCount}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-indigo-600 dark:text-indigo-400">
                      {role.permissionCount}
                    </td>
                    <td className="px-6 py-4">
                      {isArchived ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100">
                          Archived
                        </span>
                      ) : role.isActive ? (
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
                        {canViewPermissions && (
                          <Link
                            href={`/admin/settings/roles/${role.id}`}
                            aria-label={`View Matrix for ${role.name}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 hover:bg-indigo-100 rounded transition"
                          >
                            <Key className="w-3.5 h-3.5" />
                            <span>Matrix</span>
                          </Link>
                        )}
                        {!role.isSystemRole && !role.isProtected && !isArchived && canArchive && (
                          <button
                            onClick={() => setArchiveTarget(role)}
                            aria-label={`Archive ${role.name}`}
                            className="p-1.5 text-slate-400 hover:text-red-650 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition"
                          >
                            <Archive className="w-4 h-4" />
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
      </div>

      <RoleArchiveDialog
        isOpen={!!archiveTarget}
        roleName={archiveTarget?.name || ''}
        onClose={() => setArchiveTarget(null)}
        onConfirm={handleArchiveConfirm}
        isLoading={isSubmitting}
      />
    </>
  );
}
export default RoleList;
