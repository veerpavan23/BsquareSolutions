'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Play, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DemoClassCTA: React.FC = () => {
  
  const { openModal } = useModalNavigation();

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-xl relative overflow-hidden">
          
          <div className="w-16 h-16 rounded-2xl bg-[#0086F8] text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
              Experience the BSquare Teaching Methodology
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Book a Free Live Demo Class today. Interact directly with our lead instructors, experience live project code-alongs, and get all your career queries answered.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free - No Credit Card Required
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 60-Minute Interactive Session
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Live Q&A With Trainer
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => openModal('book-demo')}
              className="px-8 py-4 bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#00C2FF] hover:opacity-95 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-blue-500/25 transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-cyan-300" /> Reserve My Free Demo Class Seat Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
