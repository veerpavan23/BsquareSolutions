'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { BranchType } from '@prisma/client';

export function BranchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local values matching current search params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || '');
  const [isActive, setIsActive] = useState(searchParams.get('isActive') || 'all');
  const [isHeadOffice, setIsHeadOffice] = useState(searchParams.get('isHeadOffice') || 'all');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') || '')) {
        updateParams({ search });
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const updateParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1'); // reset page on filter change
    
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === '' || val === 'all') {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });

    startTransition(() => {
      router.push(`/admin/branches?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setSearch('');
    setType('');
    setIsActive('all');
    setIsHeadOffice('all');
    startTransition(() => {
      router.push('/admin/branches');
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-slate-500 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search by code, branch name, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
          <button
            onClick={handleReset}
            disabled={isPending}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-305 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        {/* Branch Type */}
        <div className="space-y-1">
          <label htmlFor="filter-type" className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
            Branch Type
          </label>
          <select
            id="filter-type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              updateParams({ type: e.target.value });
            }}
            className="w-full px-3 py-1.5 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-305 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="HEAD_OFFICE">Head Office</option>
            <option value="TRAINING_CENTER">Training Center</option>
            <option value="ONLINE">Online Center</option>
            <option value="CORPORATE_OFFICE">Corporate Office</option>
          </select>
        </div>

        {/* Active Status */}
        <div className="space-y-1">
          <label htmlFor="filter-status" className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
            Active Status
          </label>
          <select
            id="filter-status"
            value={isActive}
            onChange={(e) => {
              setIsActive(e.target.value);
              updateParams({ isActive: e.target.value });
            }}
            className="w-full px-3 py-1.5 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-305 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="true">Active Only</option>
            <option value="false">Archived / Inactive</option>
          </select>
        </div>

        {/* Head Office status */}
        <div className="space-y-1">
          <label htmlFor="filter-headoffice" className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
            Head Office
          </label>
          <select
            id="filter-headoffice"
            value={isHeadOffice}
            onChange={(e) => {
              setIsHeadOffice(e.target.value);
              updateParams({ isHeadOffice: e.target.value });
            }}
            className="w-full px-3 py-1.5 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-305 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm cursor-pointer"
          >
            <option value="all">All</option>
            <option value="true">Head Office Only</option>
            <option value="false">Non-HQ Branches</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="space-y-1">
          <label htmlFor="filter-sort" className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
            Sort Options
          </label>
          <select
            id="filter-sort"
            value={`${searchParams.get('sortBy') || 'displayOrder'}-${searchParams.get('sortOrder') || 'asc'}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              updateParams({ sortBy, sortOrder });
            }}
            className="w-full px-3 py-1.5 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-305 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm cursor-pointer"
          >
            <option value="displayOrder-asc">Display Order (Asc)</option>
            <option value="branchCode-asc">Branch Code (A-Z)</option>
            <option value="branchName-asc">Branch Name (A-Z)</option>
            <option value="city-asc">City (A-Z)</option>
            <option value="updatedAt-desc">Last Updated (Newest)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default BranchFilters;
