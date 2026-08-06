'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React from 'react';
import Link from 'next/link';
import { UPCOMING_BATCHES } from '@/data/batches';
import { useApp } from '@/context/AppContext';
import { Calendar, Clock, Monitor, UserCheck, Users, Play, ArrowRight, CheckCircle2 } from 'lucide-react';

export const UpcomingBatchesSection: React.FC = () => {
  
  const { openModal } = useModalNavigation();

  return (
    <section id="upcoming-batches" className="py-20 bg-white dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-4 h-4 text-[#0086F8]" /> Enrollment Open
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
              Upcoming Live Batches
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Small batch sizes (Max 15-20 students) to ensure 1-on-1 trainer interaction and personal code reviews.
          </p>
        </div>

        {/* Batches Table / Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPCOMING_BATCHES.map((batch) => {
            const statusColor = batch.status === 'Almost Full'
              ? 'bg-rose-500 text-white'
              : batch.status === 'Filling Fast'
              ? 'bg-amber-500 text-white'
              : 'bg-emerald-500 text-white';

            return (
              <div
                key={batch.id}
                className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full ${statusColor}`}>
                      {batch.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-500" /> {batch.availableSeats} Seats Left
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                      {batch.courseName}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#0086F8] shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white">Starts: {batch.startDate}</span>
                      <span className="text-[11px] text-slate-400">({batch.dayType})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-500 shrink-0" />
                      <span>{batch.timing}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Mode: <strong className="text-slate-900 dark:text-white">{batch.mode}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>Instructor: {batch.trainerName}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => openModal('book-demo', { course: batch.courseId })}
                    className="w-full py-2.5 px-4 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Reserve Demo Seat
                  </button>
                  <Link
                    href={`/courses/${batch.courseSlug}`}
                    className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-semibold rounded-xl text-xs transition-colors"
                  >
                    Details
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
