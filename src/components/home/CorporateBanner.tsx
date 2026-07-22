'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export const CorporateBanner: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#071D59] text-white p-8 md:p-12 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-cyan-300" /> Enterprise & College Training
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
                Upskill Your Corporate Workforce & College Cohorts
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                BSquare delivers tailored technology bootcamps, employee skill gap assessments, and private team cohorts for corporate organizations, IT services firms, and educational institutions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Customized Enterprise Curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Onsite, Online Live & Hybrid Batches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Certification Bootcamps & Progress Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>College & Faculty Development Programs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4">
              <Link
                href="/corporate-training"
                className="w-full sm:w-auto px-7 py-3.5 bg-white text-[#071D59] hover:bg-cyan-300 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg text-center"
              >
                Corporate Enquiry & Quote <ArrowRight className="w-4 h-4 inline ml-1" />
              </Link>
              <span className="text-xs text-slate-300 text-center lg:text-right">
                Dedicated Account Manager & Flexible Billing
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
