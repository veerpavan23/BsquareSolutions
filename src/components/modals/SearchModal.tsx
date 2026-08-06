'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/courses';
import { Search, X, BookOpen, ChevronRight, Award, Clock } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const { openModal } = useModalNavigation();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredCourses = query.trim() === ''
    ? COURSES.slice(0, 4)
    : COURSES.filter((c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.academy.toLowerCase().includes(query.toLowerCase()) ||
        c.certificationTarget.toLowerCase().includes(query.toLowerCase()) ||
        c.tools.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search Salesforce, Power BI, Tableau, AI, Certifications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base font-medium"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {query.trim() === '' ? 'Popular Courses' : `Found ${filteredCourses.length} Courses`}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400">
              No courses matching &quot;{query}&quot;. Try searching for &quot;Salesforce&quot;, &quot;Power BI&quot;, or &quot;DAX&quot;.
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-[#0086F8] mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <Link
                      href={`/courses/${course.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="font-semibold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors"
                    >
                      {course.title}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500" /> {course.certificationTarget}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      openModal('book-demo', { course: course.id });
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-[#0086F8] bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    Demo
                  </button>
                  <Link
                    href={`/courses/${course.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex justify-between">
          <span>Press ESC to close</span>
          <span>BSquare Technology Academy</span>
        </div>
      </div>
    </div>
  );
};
