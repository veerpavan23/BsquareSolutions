'use client';

import React from 'react';
import Link from 'next/link';
import { TESTIMONIALS, CAREER_STATS_DISCLAIMER } from '@/data/testimonials';
import { Award, Briefcase, GraduationCap, ArrowRight, CheckCircle2, Star, Sparkles } from 'lucide-react';

export const StudentOutcomesSection: React.FC = () => {
  const transitionStories = TESTIMONIALS.filter((t) => t.type === 'career-transition' || t.type === 'certification');

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Verified Alumni Success
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Real Student Outcomes & Career Transitions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            See how our students and working professionals gained high-demand tech skills and cleared official certifications.
          </p>
        </div>

        {/* Disclaimer Banner per Requirement 12 */}
        <div className="p-4 mb-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center text-xs font-semibold text-[#0086F8]">
          ✨ {CAREER_STATS_DISCLAIMER}
        </div>

        {/* Outcomes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transitionStories.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl p-7 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                    {item.batchYear}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  &quot;{item.content}&quot;
                </p>

                {item.projectShowcaseTitle && (
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white block">Project Built:</span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px]">{item.projectShowcaseTitle}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0086F8] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {item.avatarText}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    {item.studentName}
                  </h4>
                  <p className="text-xs text-[#0086F8] font-semibold">{item.role}</p>
                  {item.previousRole && (
                    <p className="text-[10px] text-slate-400">Prev: {item.previousRole}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#071D59] dark:bg-[#0086F8] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-95 transition-all shadow-md"
          >
            View All Student Placement Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
