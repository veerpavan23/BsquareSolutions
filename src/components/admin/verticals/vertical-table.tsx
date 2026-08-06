'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2, MoreVertical, Archive, Globe, CheckCircle2, XCircle, Star } from 'lucide-react';
import { Academy, PublishStatus } from '@prisma/client';
import { publishAcademyAction, unpublishAcademyAction, archiveAcademyAction, restoreAcademyAction } from '@/modules/academies/academy.actions';

interface VerticalTableProps {
  verticals: Academy[];
  userPermissions: string[];
  onRefresh: () => Promise<void>;
}

export function VerticalTable({ verticals, userPermissions, onRefresh }: VerticalTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const canEdit = userPermissions.includes('academy.edit');
  const canPublish = userPermissions.includes('academy.publish');
  const canArchive = userPermissions.includes('academy.archive');
  const canRestore = userPermissions.includes('academy.restore');

  const handleAction = async (
    id: string, 
    version: number, 
    action: (id: string, v: number) => Promise<any>
  ) => {
    setLoadingId(id);
    try {
      const res = await action(id, version);
      if (res.success) {
        await onRefresh();
      } else {
        alert(res.error?.message || 'Action failed');
      }
    } finally {
      setLoadingId(null);
    }
  };

  if (verticals.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">No Verticals Found</h3>
        <p className="text-slate-500 mt-1 max-w-sm mx-auto">
          Get started by creating your first learning vertical (e.g., Salesforce, Data Analytics).
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-205 dark:border-slate-800 text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">Vertical Name</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-center">Featured</th>
              <th className="px-6 py-4 font-medium">Last Updated</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {verticals.map((vertical) => (
              <tr 
                key={vertical.id}
                className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                  vertical.publishStatus === PublishStatus.ARCHIVED ? 'opacity-60 grayscale' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    {vertical.name}
                  </div>
                  {vertical.shortDescription && (
                    <div className="text-xs text-slate-500 truncate max-w-[200px] mt-0.5">
                      {vertical.shortDescription}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  /{vertical.slug}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      vertical.publishStatus === PublishStatus.PUBLISHED
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                        : vertical.publishStatus === PublishStatus.DRAFT
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                        : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                    }`}
                  >
                    {vertical.publishStatus}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {vertical.isFeatured ? (
                    <Star className="w-4 h-4 text-amber-400 mx-auto fill-amber-400" />
                  ) : (
                    <Star className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                  )}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                  {new Date(vertical.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {canEdit && (
                      <Link
                        href={`/admin/verticals/${vertical.id}/edit`}
                        className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        title="Edit Vertical"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    )}
                    
                    {canPublish && vertical.publishStatus !== PublishStatus.PUBLISHED && vertical.publishStatus !== PublishStatus.ARCHIVED && (
                      <button
                        disabled={loadingId === vertical.id}
                        onClick={() => handleAction(vertical.id, vertical.recordVersion, publishAcademyAction)}
                        className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        title="Publish"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}

                    {canPublish && vertical.publishStatus === PublishStatus.PUBLISHED && (
                      <button
                        disabled={loadingId === vertical.id}
                        onClick={() => handleAction(vertical.id, vertical.recordVersion, unpublishAcademyAction)}
                        className="p-2 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition"
                        title="Unpublish"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}

                    {canArchive && vertical.publishStatus !== PublishStatus.ARCHIVED && (
                      <button
                        disabled={loadingId === vertical.id}
                        onClick={() => handleAction(vertical.id, vertical.recordVersion, archiveAcademyAction)}
                        className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition"
                        title="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    )}

                    {canRestore && vertical.publishStatus === PublishStatus.ARCHIVED && (
                      <button
                        disabled={loadingId === vertical.id}
                        onClick={() => handleAction(vertical.id, vertical.recordVersion, restoreAcademyAction)}
                        className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                        title="Restore"
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
