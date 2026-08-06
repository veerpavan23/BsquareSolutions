'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/courses';
import { X, Download, CheckCircle2, FileText, Loader2 } from 'lucide-react';

import { useModalRoute } from '@/lib/modal-routing/modal-hooks';

export const BrochureModal: React.FC = () => {
  const { isOpen, closeModal, getParam } = useModalRoute('brochure');
  const courseParam = getParam('course');
  
  // Validate courseParam exists in COURSES, else fallback
  const validCourse = COURSES.find(c => c.slug === courseParam || c.id === courseParam);
  const selectedCourse = validCourse || COURSES[0];

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  const handleClose = () => {
    closeModal();
    setStatus('idle');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 text-[#071D59] dark:text-white font-heading font-bold">
            <FileText className="w-5 h-5 text-[#0086F8]" /> Request Course Brochure
          </div>
          <button onClick={handleClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Brochure Request Received!</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                The detailed syllabus brochure for <span className="font-semibold text-[#0086F8]">{selectedCourse.title}</span> will be emailed to <span className="font-mono text-xs">{email}</span> and shared via WhatsApp.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 w-full py-2.5 bg-[#0086F8] text-white font-semibold rounded-xl text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-xl">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Course Selected</div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm mt-0.5">{selectedCourse.title}</div>
                <div className="text-xs text-[#0086F8] mt-1">{selectedCourse.academy}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8] text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-6 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Preparing Brochure...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" /> Request PDF Brochure
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
