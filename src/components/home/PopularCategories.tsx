'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/data/categories';
import { Cloud, BarChart3, PieChart, LineChart, Brain, Server, Briefcase, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  BarChart3,
  PieChart,
  LineChart,
  Brain,
  Server,
  Briefcase,
};

export const PopularCategories: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Specialized Training Academies
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            World-Class Technology Academies
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Structured career tracks designed to take you from foundational basics to expert certification and job readiness.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Cloud;
            return (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="group relative glass-panel rounded-3xl p-7 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 text-[11px] font-bold uppercase rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                      {cat.highlightText}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2.5">
                    {cat.description}
                  </p>

                  {/* Popular Topics List */}
                  <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-bold uppercase text-slate-400 mb-2">Key Modules:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.popularTopics.map((topic, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-md">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-[#0086F8]">
                  <span>{cat.courseCount}+ Certified Programs</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore Academy <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
