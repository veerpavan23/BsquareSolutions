'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Sparkles, Play, Calendar, ShieldCheck, Award, ArrowRight, Code2, LineChart, Cloud } from 'lucide-react';

export const Hero: React.FC = () => {
  
  const { openModal } = useModalNavigation();

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 dark:from-[#0B0F19] dark:via-[#0F172A] dark:to-[#0B0F19]">
      {/* Background Hero Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-hero-glow pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#071D59] dark:text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#0086F8]" />
              <span>India&apos;s Premier Technology Training Institute</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#071D59] dark:text-white tracking-tight leading-[1.15]">
              Learn. Build.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0086F8] via-[#00C2FF] to-blue-600">
                Transform Your Career.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Master Salesforce, Tableau, Power BI, Data Analytics and emerging technologies through expert-led training, practical projects and certification-focused learning.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* Primary CTA */}
              <Link
                href="/courses"
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#00C2FF] hover:opacity-95 text-white font-extrabold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Secondary CTA */}
              <button
                onClick={() => openModal('book-demo')}
                className="w-full sm:w-auto px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-[#0086F8] text-slate-900 dark:text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
              >
                <Play className="w-4 h-4 text-[#0086F8] fill-[#0086F8]" /> Book a Free Demo
              </button>

              {/* Third CTA */}
              <a
                href="#upcoming-batches"
                className="w-full sm:w-auto px-6 py-3.5 text-slate-800 dark:text-slate-200 hover:text-[#0086F8] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-blue-500" /> View Batches
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> 100% Practical Labs
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> Global Certification Prep
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-500" /> Lifetime LMS Access
              </span>
            </div>
          </div>

          {/* Right Column: Futuristic Tech Graphic Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#00C2FF] opacity-30 blur-xl animate-pulse" />

              {/* Main Interactive Tech Dashboard Visual */}
              <div className="relative bg-white/95 dark:bg-[#131B2E]/95 rounded-3xl p-6 shadow-2xl space-y-5 border border-slate-200 dark:border-slate-800">
                
                {/* Header Widget */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#0086F8]">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                        BSquare Cloud Academy
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        Live Class & Hands-on Lab Sandbox
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    ● Live Session
                  </span>
                </div>

                {/* Floating Tech Badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#071D59] dark:text-blue-300">
                      <Cloud className="w-4 h-4 text-[#0086F8]" /> Salesforce ADM-201
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">Flow Automation Lab</div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                      <LineChart className="w-4 h-4" /> Power BI & Fabric
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">DAX Calculated Measures</div>
                  </div>
                </div>

                {/* Live Code / Analytics Preview Card */}
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
                    <span className="flex items-center gap-1"><Code2 className="w-3 h-3 text-[#0086F8]" /> Apex_Handler.cls</span>
                    <span className="text-emerald-400">● 100% Code Coverage</span>
                  </div>
                  <pre className="text-[11px] text-blue-300 overflow-x-auto">
                    <code>
{`public with sharing class ClaimService {
  public static void processClaims(List<Claim__c> claims) {
    // Agentforce Autonomous AI Validation
    AgentforceAI.evaluateRules(claims);
  }
}`}
                    </code>
                  </pre>
                </div>

                {/* Student Certification Badge */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-6 h-6 text-amber-500" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Global Certification Readiness
                      </div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-300">
                        Salesforce, Microsoft & Tableau Exam Mock Tests
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#0086F8]">98% Pass Rate</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
