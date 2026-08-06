'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSES, Course } from '@/data/courses';
import { useApp } from '@/context/AppContext';
import {
  Clock,
  Award,
  Star,
  Layers,
  Heart,
  Scale,
  Download,
  Play,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const FeaturedCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { toggleWishlistCourse,
    isInWishlist,
    toggleCompareCourse,
    isInCompare } = useApp();
  const { openModal } = useModalNavigation();

  const tabs = [
    { id: 'all', label: 'All Popular Courses' },
    { id: 'salesforce', label: 'Salesforce Academy' },
    { id: 'power-bi', label: 'Power BI Academy' },
    { id: 'tableau', label: 'Tableau Academy' },
    { id: 'data-analytics', label: 'Analytics Academy' },
  ];

  const filteredCourses = activeTab === 'all'
    ? COURSES.filter((c) => c.isFeatured)
    : COURSES.filter((c) => c.categoryId === activeTab);

  return (
    <section className="py-20 bg-white dark:bg-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0086F8] mb-2">
              Industry-Aligned Curriculum
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
              Featured Certification Programs
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0086F8] hover:underline"
          >
            View Complete Directory ({COURSES.length} Courses) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#071D59] text-white dark:bg-[#0086F8] shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const inWishlist = mounted ? isInWishlist(course.id) : false;
            const inCompare = mounted ? isInCompare(course.id) : false;

            return (
              <div
                key={course.id}
                className="group glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative"
              >
                <div>
                  {/* Top Badges & Actions */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                      {course.academy}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <Link href={`/courses/${course.slug}`}>
                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Course Metadata (Duration, Rating, Level) */}
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

                  {/* Certification Target */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#071D59] dark:text-blue-300 mb-4">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="line-clamp-1">{course.certificationTarget}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openModal('book-demo', { course: course.id })}
                      className="py-2.5 px-3 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Book Demo
                    </button>
                    <button
                      onClick={() => openModal('brochure', { course: course.id })}
                      className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Brochure
                    </button>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="block text-center py-2 text-xs font-bold text-slate-500 hover:text-[#0086F8] transition-colors"
                  >
                    View Full Syllabus & Batch Dates →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
