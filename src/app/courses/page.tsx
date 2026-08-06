import React from 'react';
import Link from 'next/link';
import { CourseFiltersClient } from './course-filters-client';
import { Clock, Layers, Star, Play, Download, GraduationCap } from 'lucide-react';
import { COURSES } from '@/data/courses';

export const dynamic = 'force-dynamic';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    level?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  
  // Extract unique categories from static COURSES
  const uniqueCategoryIds = Array.from(new Set(COURSES.map(c => c.categoryId)));
  const academies = uniqueCategoryIds.map(categoryId => {
    const course = COURSES.find(c => c.categoryId === categoryId);
    return {
      id: categoryId,
      name: course?.academy || categoryId,
      slug: categoryId
    };
  });
  
  const allCourses = params.category && params.category !== 'all' 
    ? COURSES.filter(c => c.academy === params.category || c.categoryId === params.category)
    : COURSES;

  const filteredCourses = allCourses.filter((c) => {
    const matchesLevel = !params.level || params.level === 'all' || 
      (c.level && c.level.toLowerCase().includes(params.level.toLowerCase()));
    
    const matchesSearch =
      !params.search ||
      params.search.trim() === '' ||
      c.title.toLowerCase().includes(params.search.toLowerCase()) ||
      c.academy.toLowerCase().includes(params.search.toLowerCase());

    return matchesLevel && matchesSearch;
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

        {/* Filter Controls Bar (Client Component) */}
        <CourseFiltersClient categories={academies} initialCategory={params.category} initialLevel={params.level} initialSearch={params.search} />

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-20 text-center space-y-3 glass-panel rounded-3xl p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses match your filter.</h3>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting a different category.</p>
            <Link
              href="/courses"
              className="inline-block px-4 py-2 bg-[#0086F8] text-white font-bold text-xs rounded-xl mt-4"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                      {course.academy}
                    </span>
                  </div>

                  <Link href={`/courses/${course.slug}`}>
                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed h-10">
                    {course.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-2 my-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Layers className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span className="line-clamp-1">{course.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 col-span-2">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-bold line-clamp-1">{course.certificationTarget}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/courses/${course.slug}?book-demo=true`}
                      className="py-2.5 px-3 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 text-center"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" /> Book Demo
                    </Link>
                    <div className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer">
                      <Download className="w-3.5 h-3.5" /> Brochure
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="block text-center py-2 text-xs font-bold text-slate-500 hover:text-[#0086F8] transition-colors"
                  >
                    View Full Syllabus & Curriculum →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
