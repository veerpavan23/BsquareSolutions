'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BSquareLogo } from '@/components/brand/BSquareLogo';
import {
  User,
  Lock,
  BookOpen,
  Play,
  FileText,
  Award,
  Calendar,
  CheckCircle2,
  Download,
  HelpCircle,
  Video,
  LogOut
} from 'lucide-react';

export default function StudentLMSPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('student@bsquare.co.in');
  const [password, setPassword] = useState('••••••••');
  const [activeTab, setActiveTab] = useState<'enrolled' | 'recordings' | 'assignments' | 'certificates'>('enrolled');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isLoggedIn ? (
          /* Login Screen Prototype */
          <div className="max-w-md mx-auto glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <BSquareLogo variant="icon" size="xl" className="mx-auto" />
              <h1 className="text-2xl font-heading font-bold text-[#071D59] dark:text-white">
                Student LMS Portal Login
              </h1>
              <p className="text-xs text-slate-500">Access your live sessions, recordings, and assignments.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Student Email / Enrollment ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-[11px] rounded-xl">
                ℹ️ LMS Prototype View: Click &quot;Login to LMS Dashboard&quot; below to launch student portal.
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#071D59] via-[#0086F8] to-[#00C2FF] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Login to LMS Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Student Portal Dashboard Prototype */
          <div className="space-y-8">
            
            {/* Dashboard Header */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0086F8] text-white font-extrabold text-xl flex items-center justify-center">
                  ST
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                    Welcome back, Student Portal Demo
                  </h1>
                  <p className="text-xs text-slate-500">Student ID: BSQ-2026-8941 • Salesforce Administrator ADM-201</p>
                </div>
              </div>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 self-start md:self-auto"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab('enrolled')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'enrolled' ? 'bg-[#0086F8] text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Enrolled Courses (2)
              </button>
              <button
                onClick={() => setActiveTab('recordings')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'recordings' ? 'bg-[#0086F8] text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Live Session Recordings
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'assignments' ? 'bg-[#0086F8] text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Assignments & Mock Tests
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'certificates' ? 'bg-[#0086F8] text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Certificates
              </button>
            </div>

            {/* Tab 1: Enrolled Courses */}
            {activeTab === 'enrolled' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                      Active Course
                    </span>
                    <span className="text-xs font-bold text-emerald-500">65% Completed</span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
                    Salesforce Administrator (ADM-201)
                  </h3>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#0086F8] to-[#00C2FF] h-full w-[65%]" />
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <div className="font-bold text-[#0086F8]">Next Live Class:</div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-500" /> Tomorrow, 07:30 AM IST • Record-Triggered Flows
                    </div>
                  </div>

                  <button
                    onClick={() => alert('Launching Zoom Live Class Room...')}
                    className="w-full py-2.5 bg-[#0086F8] hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" /> Join Live Zoom Class
                  </button>
                </div>

                <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-amber-50 dark:bg-amber-950 text-amber-600">
                      Upcoming Track
                    </span>
                    <span className="text-xs font-bold text-slate-400">0% Completed</span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
                    Power BI Complete Masterclass (PL-300)
                  </h3>

                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#0086F8] to-[#00C2FF] h-full w-[0%]" />
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 text-xs text-slate-500">
                    Batch Starts: Aug 10, 2026 • Pre-reading materials available
                  </div>

                  <button className="w-full py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl">
                    View Course Modules
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Session Recordings */}
            {activeTab === 'recordings' && (
              <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
                  Recent Session HD Recordings
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Session 12: Screen Flows & User Input Validation</div>
                      <div className="text-slate-400 text-[11px]">Duration: 1h 45m • Recorded yesterday</div>
                    </div>
                    <button onClick={() => alert('Playing HD Video Recording...')} className="px-4 py-2 bg-[#0086F8] text-white font-bold rounded-xl flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 fill-white" /> Watch
                    </button>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Session 11: Security Models & OWD Sharing Rules</div>
                      <div className="text-slate-400 text-[11px]">Duration: 1h 30m • Recorded 3 days ago</div>
                    </div>
                    <button onClick={() => alert('Playing HD Video Recording...')} className="px-4 py-2 bg-[#0086F8] text-white font-bold rounded-xl flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 fill-white" /> Watch
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Assignments & Mock Tests */}
            {activeTab === 'assignments' && (
              <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
                  Assignments & Certification Mock Tests
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Assignment 4: Healthcare Lead Assignment Flow</div>
                      <div className="text-emerald-500 font-bold text-[11px]">Status: Graded (95/100)</div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg">Passed</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">ADM-201 Official Full Mock Test #1</div>
                      <div className="text-amber-500 font-bold text-[11px]">Due in 2 days • 60 Questions</div>
                    </div>
                    <Link href="/resources" className="px-4 py-2 bg-[#0086F8] text-white font-bold rounded-xl">
                      Start Test
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Certificates */}
            {activeTab === 'certificates' && (
              <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
                  Verified Course Completion Certificates
                </h3>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                  <Award className="w-12 h-12 text-amber-500 mx-auto" />
                  <div className="font-bold text-slate-900 dark:text-white">Salesforce Admin ADM-201 Completion Certificate</div>
                  <p className="text-xs text-slate-500">Will be generated upon achieving 100% course completion & clearing capstone review.</p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
