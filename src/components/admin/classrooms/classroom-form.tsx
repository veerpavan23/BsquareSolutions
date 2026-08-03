'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, AlertCircle, Plus, Sparkles } from 'lucide-react';
import { Classroom, Branch } from '@prisma/client';
import { createClassroomAction, updateClassroomAction } from '@/modules/classrooms/classroom.actions';

interface ClassroomFormProps {
  initialData?: (Classroom & { facilities: string[] }) | null;
  branches: Branch[];
}

export function ClassroomForm({ initialData, branches }: ClassroomFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  // Form states
  const [branchId, setBranchId] = useState(initialData?.branchId || (branches[0]?.id || ''));
  const [classroomCode, setClassroomCode] = useState(initialData?.classroomCode || '');
  const [classroomName, setClassroomName] = useState(initialData?.classroomName || '');
  const [capacity, setCapacity] = useState<number>(initialData?.capacity || 30);
  const [floor, setFloor] = useState<string>(initialData?.floor !== null && initialData?.floor !== undefined ? String(initialData.floor) : '0');
  
  const [facilities, setFacilities] = useState<string[]>(initialData?.facilities || []);
  const [newFacility, setNewFacility] = useState('');
  const [isActive, setIsActive] = useState(initialData?.isActive !== undefined ? initialData.isActive : true);

  // Status/Error States
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isDirty, setIsDirty] = useState(false);

  // Warn on unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  const addFacility = () => {
    const val = newFacility.trim();
    if (val && !facilities.includes(val)) {
      setFacilities([...facilities, val]);
      setNewFacility('');
      markDirty();
    }
  };

  const removeFacility = (item: string) => {
    setFacilities(facilities.filter((f) => f !== item));
    markDirty();
  };

  const handleSubmit = async (e: React.FormEvent, closeAfterSave: boolean) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg('');
    setFieldErrors({});

    const payload = {
      branchId,
      classroomCode: classroomCode.trim(),
      classroomName: classroomName.trim(),
      capacity,
      floor: floor !== '' ? parseInt(floor) : null,
      facilities,
      isActive,
    };

    try {
      let res;
      if (isEdit && initialData) {
        res = await updateClassroomAction(initialData.id, initialData.recordVersion, payload);
      } else {
        res = await createClassroomAction(payload);
      }

      if (res.success) {
        setIsDirty(false);
        if (closeAfterSave) {
          router.push('/admin/classrooms');
        } else {
          if (!isEdit) {
            router.push(`/admin/classrooms/${res.data.id}/edit`);
          } else {
            router.refresh();
          }
        }
      } else {
        setErrorMsg(res.error.message);
        if (res.error.fieldErrors) {
          setFieldErrors(res.error.fieldErrors);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, true)} onChange={markDirty} className="space-y-6 max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      {/* Top Error Alert */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div>
            <h5 className="font-semibold">Failed to Save Classroom</h5>
            <p className="mt-0.5 text-xs">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Branch Assignment Selection */}
      <div className="space-y-4">
        <div>
          <label htmlFor="branchId" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
            Parent Branch Location <span className="text-red-500">*</span>
          </label>
          <select
            id="branchId"
            value={branchId}
            onChange={(e) => {
              setBranchId(e.target.value);
              markDirty();
            }}
            disabled={isEdit} // Do not change parent branch during edit
            className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm cursor-pointer"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.branchName} ({b.branchCode})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Classroom Code */}
          <div>
            <label htmlFor="classroomCode" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
              Classroom Code <span className="text-red-500">*</span>
            </label>
            <input
              id="classroomCode"
              type="text"
              required
              placeholder="e.g. CR-101"
              value={classroomCode}
              onChange={(e) => {
                setClassroomCode(e.target.value);
                markDirty();
              }}
              className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
            />
            {fieldErrors.classroomCode && (
              <p className="text-red-550 text-xs mt-1">{fieldErrors.classroomCode[0]}</p>
            )}
          </div>

          {/* Classroom Name */}
          <div>
            <label htmlFor="classroomName" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
              Classroom Name <span className="text-red-500">*</span>
            </label>
            <input
              id="classroomName"
              type="text"
              required
              placeholder="e.g. Einstein Seminar Hall"
              value={classroomName}
              onChange={(e) => {
                setClassroomName(e.target.value);
                markDirty();
              }}
              className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
            />
            {fieldErrors.classroomName && (
              <p className="text-red-550 text-xs mt-1">{fieldErrors.classroomName[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
              Seating Capacity <span className="text-red-500">*</span>
            </label>
            <input
              id="capacity"
              type="number"
              required
              min={1}
              value={capacity}
              onChange={(e) => {
                setCapacity(parseInt(e.target.value) || 0);
                markDirty();
              }}
              className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
            />
            {fieldErrors.capacity && (
              <p className="text-red-555 text-xs mt-1">{fieldErrors.capacity[0]}</p>
            )}
          </div>

          {/* Floor */}
          <div>
            <label htmlFor="floor" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
              Floor Number
            </label>
            <input
              id="floor"
              type="number"
              placeholder="e.g. 2 (for 2nd floor, 0 for Ground, -1 for Basement)"
              value={floor}
              onChange={(e) => {
                setFloor(e.target.value);
                markDirty();
              }}
              className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
            />
          </div>
        </div>

        {/* Facilities Management */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
            Classroom Facilities
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add facility tag (e.g. WiFi, Smart TV, AC, Whiteboard)"
              value={newFacility}
              onChange={(e) => setNewFacility(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFacility();
                }
              }}
              className="flex-1 px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
            />
            <button
              type="button"
              onClick={addFacility}
              className="inline-flex items-center gap-1 px-3 bg-indigo-650 hover:bg-indigo-500 text-white font-medium rounded-lg text-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {facilities.map((fac, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-300 border border-slate-205"
              >
                <span>{fac}</span>
                <button
                  type="button"
                  onClick={() => removeFacility(fac)}
                  className="text-slate-400 hover:text-slate-650 transition focus:outline-none font-bold"
                >
                  &times;
                </button>
              </span>
            ))}
            {facilities.length === 0 && (
              <span className="text-xs text-slate-450 italic">No facility tags added.</span>
            )}
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
          <div>
            <span className="block text-sm font-semibold text-slate-900 dark:text-white">Active Status</span>
            <span className="block text-[11px] text-slate-500 mt-0.5">Available for batch assignment scheduling</span>
          </div>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => {
              setIsActive(e.target.checked);
              markDirty();
            }}
            className="w-4 h-4 text-indigo-650 border-slate-300 dark:border-slate-800 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
        <div>
          {isEdit && initialData && (
            <span className="text-xs text-slate-450 dark:text-slate-500">
              Last updated: {new Date(initialData.updatedAt).toLocaleString()} | Version: {initialData.recordVersion}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => router.push('/admin/classrooms')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={(e) => handleSubmit(e, false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Save & Continue</span>
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md hover:shadow-lg transition"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Close</span>
          </button>
        </div>
      </div>
    </form>
  );
}
export default ClassroomForm;
