'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSES } from '@/data/courses';
import { CATEGORIES } from '@/data/categories';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Filter,
  Clock,
  Award,
  Star,
  Layers,
  Heart,
  Scale,
  Play,
  Download,
  CheckCircle2
} from 'lucide-react';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const {
    openDemoModalWithCourse,
    openBrochureModalWithCourse,
    toggleWishlistCourse,
    isInWishlist,
    toggleCompareCourse,
    isInCompare,
  } = useApp();

  const filteredCourses = COURSES.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.categoryId === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || c.level.toLowerCase().includes(selectedLevel.toLowerCase());
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.academy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certificationTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Explore All Programs
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Technology Training Directory
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Expert-led technology courses designed for freshers, working professionals, and career switchers.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel rounded-2xl p-4 mb-10 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technology, tool or exam..."
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
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
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

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-20 text-center space-y-3 glass-panel rounded-3xl p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses match your filter.</h3>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#0086F8] text-white font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
              const inWishlist = mounted ? isInWishlist(course.id) : false;
              const inCompare = mounted ? isInCompare(course.id) : false;

              return (
                <div
                  key={course.id}
                  className="group glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-[10px] font-extrabold uppercase rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                        {course.academy}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => toggleCompareCourse(course.id)}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            inCompare ? 'bg-blue-100 text-[#0086F8] dark:bg-blue-950' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title="Compare Course"
                        >
                          <Scale className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleWishlistCourse(course.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            inWishlist ? 'text-rose-500 fill-rose-500' : 'text-slate-400 hover:text-rose-500'
                          }`}
                          title="Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <Link href={`/courses/${course.slug}`}>
                      <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Layers className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 col-span-2">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        <span className="font-bold">{course.rating}</span>
                        <span className="text-slate-400">({course.reviewCount} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-[#071D59] dark:text-blue-300 mb-4">
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="line-clamp-1">{course.certificationTarget}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openDemoModalWithCourse(course.id)}
                        className="py-2.5 px-3 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" /> Book Demo
                      </button>
                      <button
                        onClick={() => openBrochureModalWithCourse(course.id)}
                        className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Brochure
                      </button>
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="block text-center py-2 text-xs font-bold text-slate-500 hover:text-[#0086F8] transition-colors"
                    >
                      View Full Syllabus & Curriculum →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
