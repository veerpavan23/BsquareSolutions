'use client';

import React from 'react';
import Link from 'next/link';
import { TRAINERS } from '@/data/trainers';
import { Award, Star, ExternalLink, ArrowRight, UserCheck } from 'lucide-react';

export const TrainersSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider mb-2">
              <UserCheck className="w-4 h-4 text-[#0086F8]" /> Active Industry Practitioners
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
              Learn From Certified Elite Instructors
            </h2>
          </div>
          <Link
            href="/trainers"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0086F8] hover:underline"
          >
            Meet All Lead Trainers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Trainers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#071D59] via-[#0086F8] to-[#00C2FF] text-white font-heading font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
                  {trainer.avatarText}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                    {trainer.name}
                  </h3>
                  <a
                    href={trainer.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#0086F8] p-1"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
                    </svg>
                  </a>
                </div>

                <div className="text-xs text-[#0086F8] font-semibold mt-0.5">
                  {trainer.designation}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                  {trainer.bio}
                </p>

                {/* Experience & Rating */}
                <div className="flex items-center justify-between my-4 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{trainer.experienceYears}+ Yrs Field Exp</span>
                  <span className="flex items-center gap-1 font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {trainer.rating}
                  </span>
                </div>

                {/* Certifications List */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Key Certifications:</div>
                  <div className="flex flex-wrap gap-1">
                    {trainer.certifications.slice(0, 2).map((cert, cIdx) => (
                      <span key={cIdx} className="px-2 py-0.5 text-[9px] font-semibold bg-blue-50 dark:bg-blue-950 text-[#0086F8] rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-medium">
                Courses: {trainer.coursesHandled.slice(0, 2).join(', ')}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
