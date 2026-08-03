'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Info, Search, CheckSquare, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { PermissionChangeDialog } from './permission-change-dialog';
import { updateRolePermissionsAction } from '@/modules/roles/role.actions';

interface PermissionMatrixItem {
  id: string;
  code: string;
  description: string | null;
  isAssigned: boolean;
}

interface PermissionMatrixProps {
  roleId: string;
  roleName: string;
  initialMatrix: PermissionMatrixItem[];
}

export function PermissionMatrix({ roleId, roleName, initialMatrix }: PermissionMatrixProps) {
  const router = useRouter();
  const [matrix, setMatrix] = useState<PermissionMatrixItem[]>(initialMatrix);
  const [search, setSearch] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Dialog / Save states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Grouping configuration mapping prefix to UI headers
  const moduleGroupMap: Record<string, string> = {
    branch: 'Branches & Locations',
    classroom: 'Classrooms & Slots',
    course: 'Courses & Curriculum',
    media: 'Media Library',
    settings: 'Website Settings',
    notification: 'Notifications & Alerts',
    activity: 'Audit Trails & Activities',
    feature_flag: 'Feature Flags',
    data: 'System Data Imports & Exports',
    sensitive_data: 'Data Security Audits',
    role: 'Roles & Admin Profiles',
    permission: 'Permissions Matrix Controls',
  };

  const getModuleName = (code: string) => {
    const prefix = code.split('.')[0];
    return moduleGroupMap[prefix] || 'Other System Modules';
  };

  // Toggle single permission checkbox
  const togglePermission = (id: string) => {
    setMatrix(
      matrix.map((item) =>
        item.id === id ? { ...item, isAssigned: !item.isAssigned } : item
      )
    );
  };

  // Select all / Clear all helper utilities
  const handleSelectAll = (select: boolean) => {
    setMatrix(matrix.map((item) => ({ ...item, isAssigned: select })));
  };

  const toggleModuleSelection = (moduleKey: string, select: boolean) => {
    setMatrix(
      matrix.map((item) => {
        const itemModule = item.code.split('.')[0];
        if (itemModule === moduleKey) {
          return { ...item, isAssigned: select };
        }
        return item;
      })
    );
  };

  const toggleModuleExpand = (moduleKey: string) => {
    setExpandedModules({
      ...expandedModules,
      [moduleKey]: !expandedModules[moduleKey],
    });
  };

  // Calculate changes diff
  const currentAssignedIds = matrix.filter((item) => item.isAssigned).map((item) => item.id);
  const initialAssignedIds = initialMatrix.filter((item) => item.isAssigned).map((item) => item.id);

  const addedCount = currentAssignedIds.filter((id) => !initialAssignedIds.includes(id)).length;
  const removedCount = initialAssignedIds.filter((id) => !currentAssignedIds.includes(id)).length;
  const isModified = addedCount > 0 || removedCount > 0;

  const handleSaveSubmit = async (reason: string) => {
    setIsSaving(true);
    try {
      const res = await updateRolePermissionsAction(roleId, currentAssignedIds, reason);
      if (res.success) {
        setIsConfirmOpen(false);
        router.refresh();
      } else {
        alert(res.error.message);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Filter permission list based on search query
  const filteredMatrix = matrix.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
  );

  // Group permissions by their prefix module
  const groupedPermissions: Record<string, PermissionMatrixItem[]> = {};
  filteredMatrix.forEach((item) => {
    const prefix = item.code.split('.')[0];
    if (!groupedPermissions[prefix]) {
      groupedPermissions[prefix] = [];
    }
    groupedPermissions[prefix].push(item);
  });

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Permission Matrix: {roleName}</span>
          </h2>
          <p className="text-xs text-slate-550 dark:text-slate-450 mt-1">
            Toggle checkboxes to configure functional boundaries. Changes are transactional and require auditing validation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => handleSelectAll(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 rounded-lg border border-slate-300 dark:border-slate-800 transition"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Select All</span>
          </button>
          <button
            onClick={() => handleSelectAll(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 rounded-lg border border-slate-300 dark:border-slate-800 transition"
          >
            <Square className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Filter permissions by code or label..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
        />
      </div>

      {/* Grouped Modules */}
      <div className="space-y-4">
        {Object.entries(groupedPermissions).map(([moduleKey, items]) => {
          const title = moduleGroupMap[moduleKey] || `${moduleKey.toUpperCase()} Permissions`;
          const allAssigned = items.every((item) => item.isAssigned);
          const isCollapsed = expandedModules[moduleKey] === true;

          return (
            <div key={moduleKey} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
              {/* Module Header Bar */}
              <div className="bg-slate-50/55 dark:bg-slate-950/20 px-4 py-3 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleModuleExpand(moduleKey)}
                  className="flex items-center gap-2 hover:text-indigo-650 dark:hover:text-indigo-400 font-semibold text-slate-900 dark:text-white text-sm"
                >
                  {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  <span>{title}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-550 font-normal">
                    ({items.filter((i) => i.isAssigned).length}/{items.length} granted)
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleModuleSelection(moduleKey, true)}
                    className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Select Module
                  </button>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <button
                    type="button"
                    onClick={() => toggleModuleSelection(moduleKey, false)}
                    className="text-[10px] uppercase font-bold text-slate-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Checkbox Grid (Visible if NOT collapsed) */}
              {!isCollapsed && (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white dark:bg-slate-900">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => togglePermission(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition cursor-pointer selection:bg-transparent ${
                        item.isAssigned
                          ? 'border-indigo-150 bg-indigo-50/10 dark:border-indigo-900/40 dark:bg-indigo-950/10 text-slate-900 dark:text-slate-100'
                          : 'border-slate-200 dark:border-slate-850 hover:bg-slate-50/40 dark:hover:bg-slate-950/20 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.isAssigned}
                        onChange={() => {}} // handled by div click
                        className="w-4 h-4 text-indigo-650 border-slate-300 dark:border-slate-800 rounded mt-0.5 pointer-events-none cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <span className="block text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">
                          {item.code}
                        </span>
                        <span className="block text-[11px] leading-relaxed text-slate-500 dark:text-slate-450">
                          {item.description || 'No descriptive boundary set.'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredMatrix.length === 0 && (
          <div className="text-center p-8 text-sm text-slate-400 italic">
            No permissions matching search criteria.
          </div>
        )}
      </div>

      {/* Save action section */}
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
        <div>
          {isModified && (
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-500" />
              <span>
                Unsaved modifications detected: <strong className="text-slate-800 dark:text-slate-200">+{addedCount}</strong> granted,{' '}
                <strong className="text-slate-800 dark:text-slate-200">-{removedCount}</strong> revoked.
              </span>
            </span>
          )}
        </div>
        <button
          onClick={() => setIsConfirmOpen(true)}
          disabled={!isModified || isSaving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:shadow-none transition"
        >
          <span>Save Changes</span>
        </button>
      </div>

      <PermissionChangeDialog
        isOpen={isConfirmOpen}
        addedCount={addedCount}
        removedCount={removedCount}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleSaveSubmit}
        isLoading={isSaving}
      />
    </div>
  );
}
export default PermissionMatrix;
