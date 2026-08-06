'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course } from '@/data/courses';
import { Trainer } from '@/data/trainers';
import { UpcomingBatch } from '@/data/batches';
import { useApp } from '@/context/AppContext';
import {
  Clock,
  Award,
  Star,
  CheckCircle2,
  ChevronDown,
  Play,
  Download,
  Users,
  Calendar,
  FolderGit2,
  UserCheck,
  Send,
  Loader2
} from 'lucide-react';

interface CourseDetailClientProps {
  course: Course;
  trainer: Trainer;
  relatedBatches: UpcomingBatch[];
}

export const CourseDetailClient: React.FC<CourseDetailClientProps> = ({
  course,
  trainer,
  relatedBatches,
}) => {
  const { openModal } = useModalNavigation();

  const [expandedModuleIdx, setExpandedModuleIdx] = useState<number | null>(0);
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', phone: '', mode: 'Online Live', includeInternship: false });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) return;
    setEnquiryStatus('loading');
    setTimeout(() => {
      setEnquiryStatus('success');
    }, 1000);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Course Header Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden bg-gradient-to-r from-[#071D59] via-[#0B2570] to-[#071D59] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold uppercase tracking-wider">
                  {course.academy}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {course.shortDescription}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-300" /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {course.rating} ({course.reviewCount} Reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-300" /> {course.enrolledStudents}+ Students Trained
                </span>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button 
                  onClick={() => openModal('book-demo', { course: course.id })}
                  className="flex-1 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" /> Book Free Demo
                </button>
                <button 
                  onClick={() => openModal('brochure', { course: course.id })}
                  className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Syllabus PDF
                </button>
              </div>
            </div>

            {/* Target Certification Card */}
            <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-white/20 bg-white/10 text-white space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Award className="w-5 h-5" /> Target Certification
              </div>
              <div className="font-heading font-bold text-lg leading-snug">
                {course.certificationTarget}
              </div>
              <p className="text-xs text-slate-300">
                Comprehensive exam scenario preparation and voucher guidance included.
              </p>
              <div className="pt-2 border-t border-white/10 text-xs font-semibold text-cyan-300">
                Batch Mode: {course.batchOptions}
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Full Overview, Syllabus, Projects, FAQs */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview & Learning Objectives */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                Course Overview & Objectives
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.fullOverview}
              </p>

              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base mb-3">
                  What You Will Learn:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.learningObjectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-sm mb-2">
                  Prerequisites:
                </h3>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  {course.prerequisites.map((req, rIdx) => (
                    <li key={rIdx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Expandable Curriculum Accordion */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                  Curriculum & Course Syllabus
                </h2>
                <span className="text-xs font-bold text-[#0086F8]">{course.curriculum.length} Comprehensive Modules</span>
              </div>

              <div className="space-y-4">
                {course.curriculum.map((module, mIdx) => {
                  const isOpen = expandedModuleIdx === mIdx;
                  return (
                    <div
                      key={mIdx}
                      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedModuleIdx(isOpen ? null : mIdx)}
                        className="w-full p-5 flex items-center justify-between text-left font-heading font-bold text-slate-900 dark:text-white text-base"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#0086F8] text-white text-xs font-bold flex items-center justify-center">
                            {mIdx + 1}
                          </span>
                          {module.title}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#0086F8]' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-5 pt-0 border-t border-slate-200 dark:border-slate-800 space-y-2">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Module Topics:</div>
                          <ul className="space-y-2">
                            {module.topics.map((t, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0086F8] mt-1.5 shrink-0" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Capstone Project Showcase */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0086F8]">
                <FolderGit2 className="w-4 h-4" /> Real-World Hands-on Project
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                {course.capstoneProject.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.capstoneProject.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {course.tools.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Trainer Profile Highlight */}
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#0086F8]" /> Lead Instructor & Specialist
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#071D59] text-white font-extrabold text-xl flex items-center justify-center shrink-0">
                  {trainer.avatarText}
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                    {trainer.name}
                  </h4>
                  <div className="text-xs text-[#0086F8] font-semibold">{trainer.designation}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{trainer.bio}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Enrolment Enquiry & Upcoming Batches */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Instant Enrolment Enquiry Form */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
                Enquire for Next Batch
              </h3>

              {enquiryStatus === 'success' ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                  <div className="font-bold text-sm">Enquiry Submitted!</div>
                  <p>Our counselor will share fee details, syllabus, and batch dates with you.</p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={enquiryForm.name}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Preferred Mode
                    </label>
                    <select
                      value={enquiryForm.mode}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, mode: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    >
                      <option value="Online Live">Online Live Interactive</option>
                      <option value="Classroom">Classroom Training</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-2 pt-1 pb-1">
                    <input
                      type="checkbox"
                      id="internship-course-enquiry"
                      checked={enquiryForm.includeInternship}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, includeInternship: e.target.checked })}
                      className="mt-0.5 rounded border-slate-300 text-[#0086F8] focus:ring-[#0086F8] dark:border-slate-600 dark:bg-slate-700"
                    />
                    <label htmlFor="internship-course-enquiry" className="text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-slate-900 dark:text-white">Include Internship Program</span> <span className="text-[#0086F8] font-semibold">(Additional Cost Applies)</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={enquiryStatus === 'loading'}
                    className="w-full py-3 bg-[#0086F8] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {enquiryStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>

            {/* Upcoming Batches Widget */}
            <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0086F8]" /> Upcoming Batches
              </h4>

              {relatedBatches.length === 0 ? (
                <p className="text-xs text-slate-500">Regular batches starting next week. Contact us for custom timing.</p>
              ) : (
                <div className="space-y-3">
                  {relatedBatches.map((b) => (
                    <div key={b.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#0086F8]">
                        <span>Starts: {b.startDate}</span>
                        <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded">{b.status}</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-[11px]">{b.dayType} • {b.timing}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
