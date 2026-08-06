'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/courses';
import { X, Calendar, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

import { useModalRoute } from '@/lib/modal-routing/modal-hooks';

export const BookDemoModal: React.FC = () => {
  const { isOpen, closeModal, getCloseUrl, getParam } = useModalRoute('book-demo');
  const courseParam = getParam('course');
  
  // Validate courseParam exists in COURSES, else fallback
  const validCourse = COURSES.find(c => c.slug === courseParam || c.id === courseParam);
  const defaultCourseId = validCourse ? validCourse.id : COURSES[0].id;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseIds: [defaultCourseId],
    preferredMode: 'Online Live',
    preferredTime: 'Morning (08:00 AM)',
    consent: true,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Update formData if URL param changes
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, courseIds: [defaultCourseId] }));
    }
  }, [isOpen, defaultCourseId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!formData.consent) {
      setStatus('error');
      setErrorMessage('Please accept the consent terms.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate API network request (Configurable Service Layer)
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  const handleClose = () => {
    closeModal();
    setStatus('idle');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
          <div className="flex items-center gap-2 text-[#071D59] dark:text-white font-heading font-bold text-lg">
            <Calendar className="w-5 h-5 text-[#0086F8]" /> Book a Free Live Demo Class
          </div>
          <Link
            href={getCloseUrl()}
            onClick={() => setStatus('idle')}
            scroll={false}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg inline-flex"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Demo Class Slot Reserved!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you <span className="font-semibold text-[#0086F8]">{formData.name}</span>. Our academic counselor will reach out via WhatsApp & Phone to send your live class joining link.
              </p>
              <Link
                href={getCloseUrl()}
                onClick={() => setStatus('idle')}
                scroll={false}
                className="mt-4 px-6 py-2.5 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-xl transition-all inline-block"
              >
                Close Window
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === 'error' && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Select Technology / Course *
                </label>
                <select
                  multiple
                  size={4}
                  value={formData.courseIds}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, courseIds: selected });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                >
                  {COURSES.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title} ({course.academy})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Training Mode
                  </label>
                  <select
                    value={formData.preferredMode}
                    onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  >
                    <option value="Online Live">Online Live Interactive</option>
                    <option value="Classroom">Classroom Training</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  >
                    <option value="Morning">Morning (07:30 AM - 09:30 AM)</option>
                    <option value="Evening">Evening (07:00 PM - 09:00 PM)</option>
                    <option value="Weekend">Weekend Batch (Sat/Sun)</option>
                  </select>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 rounded text-[#0086F8] focus:ring-[#0086F8]"
                />
                <label htmlFor="consent" className="text-xs text-slate-500 dark:text-slate-400">
                  I agree to receive course updates and demo session details from BSquare Solutions & Services via SMS/WhatsApp.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#00C2FF] hover:opacity-95 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing Slot...
                  </>
                ) : (
                  'Confirm Free Demo Booking'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
