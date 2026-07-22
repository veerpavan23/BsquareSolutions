'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FREE_RESOURCES, INTERVIEW_QUESTIONS } from '@/data/resources';
import { BookOpen, FileText, Download, ChevronRight, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ResourcesPreview: React.FC = () => {
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(INTERVIEW_QUESTIONS[0].id);

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4 text-[#0086F8]" /> Free Student Resources
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
              Interview Questions, Cheatsheets & Practice Tests
            </h2>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0086F8] hover:underline"
          >
            Access All Free Resources & Mock Tests <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Top Interview Questions Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#0086F8]" /> Top Technical Interview Questions
            </h3>

            <div className="space-y-3">
              {INTERVIEW_QUESTIONS.map((iq) => {
                const isOpen = expandedFaqId === iq.id;
                return (
                  <div
                    key={iq.id}
                    className="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-slate-800 transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaqId(isOpen ? null : iq.id)}
                      className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                          {iq.category}
                        </span>
                        {iq.question}
                      </span>
                      <span className="text-xl text-[#0086F8]">{isOpen ? '−' : '+'}</span>
                    </button>

                    {isOpen && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-emerald-500 font-semibold block mb-1">Answer Summary:</strong>
                        {iq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Downloadable Guides & Cheatsheets */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0086F8]" /> Popular Cheat Sheets & Guides
            </h3>

            <div className="space-y-3">
              {FREE_RESOURCES.slice(0, 3).map((res) => (
                <div
                  key={res.id}
                  className="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 hover:shadow-md transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-[#0086F8]">{res.category}</span>
                      <span className="text-[10px] text-slate-400">• {res.readTimeOrDuration}</span>
                    </div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-xs">
                      {res.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{res.description}</p>
                  </div>

                  <Link
                    href="/resources"
                    className="p-2 bg-blue-50 dark:bg-blue-950 text-[#0086F8] hover:bg-[#0086F8] hover:text-white rounded-xl transition-colors shrink-0"
                    title="Download Resource"
                  >
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
