'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { PublishStatus } from '@prisma/client';

export function VerticalFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = searchParams.get('search') || '';
      if (currentSearch !== searchTerm) {
        handleFilterChange('search', searchTerm);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to first page
    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    router.push('?');
  };

  const hasActiveFilters = Array.from(searchParams.keys()).some((k) => k !== 'page' && k !== 'sortBy' && k !== 'sortOrder');

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-205 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      <div className="flex-1 w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search verticals by name or slug..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Filters:</span>
        </div>

        <select
          value={searchParams.get('publishStatus') || ''}
          onChange={(e) => handleFilterChange('publishStatus', e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-indigo-500/50 focus:border-indigo-500 block px-3 py-2"
        >
          <option value="">All Statuses</option>
          <option value={PublishStatus.PUBLISHED}>Published</option>
          <option value={PublishStatus.DRAFT}>Draft</option>
          <option value={PublishStatus.ARCHIVED}>Archived</option>
        </select>

        <select
          value={searchParams.get('isActive') || ''}
          onChange={(e) => handleFilterChange('isActive', e.target.value)}
          className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-indigo-500/50 focus:border-indigo-500 block px-3 py-2"
        >
          <option value="">All Active State</option>
          <option value="true">Active Only</option>
          <option value="false">Inactive Only</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
