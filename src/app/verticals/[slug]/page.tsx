import React from 'react';
import { notFound } from 'next/navigation';
import { academyReadService } from '@/modules/public/academy-read.service';
import { courseReadService } from '@/modules/public/course-read.service';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function VerticalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vertical = await academyReadService.getVerticalBySlug(slug);

  if (!vertical) {
    notFound();
  }

  const courses = await courseReadService.getAllActiveCourses(vertical.name);

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#071D59] via-[#0B2570] to-[#071D59] text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
            Academy
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
            {vertical.name} Training
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {vertical.shortDescription}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Full Description */}
        {vertical.description && (
          <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 max-w-4xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">About {vertical.name}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {vertical.description}
            </p>
          </div>
        )}

        {/* Courses in this vertical */}
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white text-center mb-8">
            Available Courses in {vertical.name}
          </h2>
          
          {courses.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No courses currently available in this academy. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map(course => (
                <div
                  key={course.id}
                  className="group glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900"
                >
                  <div>
                    <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {course.shortDescription}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0086F8] hover:text-blue-700 transition-colors"
                    >
                      View Course Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
