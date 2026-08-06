'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/courses';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, setIsWishlistOpen, wishlistCourseIds, toggleWishlistCourse } = useApp();
  const { openModal } = useModalNavigation();

  if (!isWishlistOpen) return null;

  const wishlistCourses = COURSES.filter((c) => wishlistCourseIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsWishlistOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#131B2E] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 text-[#071D59] dark:text-white font-heading font-bold text-lg">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Saved Courses ({wishlistCourses.length})
            </div>
            <button onClick={() => setIsWishlistOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {wishlistCourses.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">Your wishlist is empty.</p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any course to bookmark it for quick access later.
                </p>
              </div>
            ) : (
              wishlistCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#0086F8]">{course.academy}</div>
                    <Link
                      href={`/courses/${course.slug}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="font-heading font-bold text-slate-900 dark:text-white hover:text-[#0086F8] transition-colors text-sm line-clamp-1"
                    >
                      {course.title}
                    </Link>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{course.duration} • {course.level}</div>
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openModal('book-demo', { course: course.id });
                        }}
                        className="px-3 py-1 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors"
                      >
                        Book Demo
                      </button>
                      <Link
                        href={`/courses/${course.slug}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1"
                      >
                        Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleWishlistCourse(course.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
