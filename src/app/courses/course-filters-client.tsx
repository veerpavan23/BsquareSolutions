'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';

export function CourseFiltersClient({ 
  categories, 
  initialCategory, 
  initialLevel, 
  initialSearch 
}: { 
  categories: any[];
  initialCategory?: string;
  initialLevel?: string;
  initialSearch?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');

  // Debounce search update
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedLevel]);

  const updateURL = () => {
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedLevel && selectedLevel !== 'all') params.set('level', selectedLevel);
    if (searchQuery) params.set('search', searchQuery);
    
    // Only push if different from current
    const currentQueryString = searchParams.toString();
    const newQueryString = params.toString();
    if (currentQueryString !== newQueryString) {
      router.push(`?${newQueryString}`);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-4 mb-10 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search technology, course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
        />
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
          <Filter className="w-4 h-4" /> Category:
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
        >
          <option value="all">All Academies</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
        >
          <option value="all">All Skill Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
}
