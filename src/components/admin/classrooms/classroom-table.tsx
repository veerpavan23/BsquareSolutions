'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Edit2, Archive, RotateCcw, Monitor, CheckCircle, XCircle, LayoutGrid } from 'lucide-react';
import { Classroom, Branch } from '@prisma/client';
import { ClassroomArchiveDialog } from './classroom-archive-dialog';
import { archiveClassroomAction, restoreClassroomAction } from '@/modules/classrooms/classroom.actions';

interface ClassroomTableProps {
  classrooms: (Omit<Classroom, 'facilities'> & { branch: Branch; facilities: string[] })[];
  userPermissions: string[];
  onRefresh: () => void;
}

export function ClassroomTable({ classrooms, userPermissions, onRefresh }: ClassroomTableProps) {
  const [archiveTarget, setArchiveTarget] = useState<(Omit<Classroom, 'facilities'> & { branch: Branch }) | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canEdit = userPermissions.includes('classroom.edit');
  const canArchive = userPermissions.includes('classroom.archive');
  const canRestore = userPermissions.includes('classroom.restore');

  const handleArchiveConfirm = async (reason: string) => {
    if (!archiveTarget) return;
    setIsSubmitting(true);
    try {
      const res = await archiveClassroomAction(archiveTarget.id, archiveTarget.recordVersion, reason);
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

  const handleRestore = async (classroom: Omit<Classroom, 'facilities'> & { facilities: string[] }) => {
    if (!confirm(`Are you sure you want to restore the classroom '${classroom.classroomName}'?`)) return;
    try {
      const res = await restoreClassroomAction(classroom.id, classroom.recordVersion);
      if (res.success) {
        onRefresh();
      } else {
        alert(res.error.message);
      }
    } catch (err: any) {
      alert(err.message || 'An unexpected error occurred.');
    }
  };

  const formatFloor = (floor: number | null | undefined) => {
    if (floor === null || floor === undefined) return 'Ground';
    if (floor === 0) return 'Ground Floor';
    if (floor < 0) return `Basement ${Math.abs(floor)}`;
    const suffix = ['th', 'st', 'nd', 'rd'][(floor % 10 > 3 || Math.floor((floor % 100) / 10) === 1) ? 0 : floor % 10];
    return `${floor}${suffix} Floor`;
  };

  if (classrooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
        <LayoutGrid className="w-12 h-12 text-slate-350 dark:text-slate-600 mb-3" />
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">No Classrooms Found</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-sm mt-1">
          Adjust your filter options or add a classroom layout to your branches.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                <th className="px-6 py-3.5 font-semibold">Code</th>
                <th className="px-6 py-3.5 font-semibold">Classroom Name</th>
                <th className="px-6 py-3.5 font-semibold">Branch Location</th>
                <th className="px-6 py-3.5 font-semibold">Floor</th>
                <th className="px-6 py-3.5 font-semibold text-center">Capacity</th>
                <th className="px-6 py-3.5 font-semibold">Facilities</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-850/60 text-slate-700 dark:text-slate-300">
              {classrooms.map((room) => {
                const isArchived = room.deletedAt !== null;
                return (
                  <tr key={room.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-slate-900 dark:text-white">
                      {room.classroomCode}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-950 dark:text-slate-200">
                      {room.classroomName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 dark:text-slate-300 font-medium">{room.branch.branchName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{room.branch.city} &bull; {room.branch.branchCode}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {formatFloor(room.floor)}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-900 dark:text-white">
                      {room.capacity} <span className="text-xs font-normal text-slate-450">seats</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {room.facilities.length > 0 ? (
                          room.facilities.map((fac, idx) => (
                            <span
                              key={idx}
                              className="inline-flex px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-850 text-slate-650 dark:text-slate-400 border border-slate-200 dark:border-slate-805"
                            >
                              {fac}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isArchived ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/20 text-red-750 dark:text-red-400 border border-red-150 dark:border-red-900/40">
                          <XCircle className="w-3 h-3" />
                          <span>Archived</span>
                        </span>
                      ) : room.isActive ? (
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
                            href={`/admin/classrooms/${room.id}/edit`}
                            aria-label={`Edit ${room.classroomName}`}
                            className="p-1.5 text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                        )}
                        {!isArchived && canArchive && (
                          <button
                            onClick={() => setArchiveTarget(room)}
                            aria-label={`Archive ${room.classroomName}`}
                            className="p-1.5 text-slate-400 hover:text-red-650 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        {isArchived && canRestore && (
                          <button
                            onClick={() => handleRestore(room)}
                            aria-label={`Restore ${room.classroomName}`}
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

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800/60">
          {classrooms.map((room) => {
            const isArchived = room.deletedAt !== null;
            return (
              <div key={room.id} className="p-4 space-y-3 hover:bg-slate-50/20 dark:hover:bg-slate-950/10 transition">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {room.classroomCode}
                  </span>
                  {isArchived ? (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-150 dark:border-red-900/40">
                      Archived
                    </span>
                  ) : room.isActive ? (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/40">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-150 dark:border-amber-900/40">
                      Inactive
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {room.classroomName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {room.branch.branchName} &bull; {formatFloor(room.floor)}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-slate-100 dark:border-slate-800/40 pt-2 text-slate-500">
                  <div>
                    <span className="font-bold text-slate-850 dark:text-slate-200">{room.capacity} seats</span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-w-[150px] justify-end">
                    {room.facilities.slice(0, 2).map((fac, idx) => (
                      <span key={idx} className="px-1 bg-slate-105 dark:bg-slate-800 rounded text-[9px]">
                        {fac}
                      </span>
                    ))}
                    {room.facilities.length > 2 && (
                      <span className="text-[9px] text-slate-400 font-semibold">+{room.facilities.length - 2} more</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/40 font-medium">
                  {canEdit && !isArchived && (
                    <Link
                      href={`/admin/classrooms/${room.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                  )}
                  {!isArchived && canArchive && (
                    <button
                      onClick={() => setArchiveTarget(room)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-red-700 bg-red-50 hover:bg-red-100 rounded transition"
                    >
                      <Archive className="w-3.5 h-3.5" />
                      <span>Archive</span>
                    </button>
                  )}
                  {isArchived && canRestore && (
                    <button
                      onClick={() => handleRestore(room)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded transition"
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

      <ClassroomArchiveDialog
        isOpen={!!archiveTarget}
        classroomName={archiveTarget?.classroomName || ''}
        onClose={() => setArchiveTarget(null)}
        onConfirm={handleArchiveConfirm}
        isLoading={isSubmitting}
      />
    </>
  );
}
export default ClassroomTable;
