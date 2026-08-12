import React from 'react';
import Link from 'next/link';
import { Lock, User, KeyRound, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Student LMS Login | BSquare Solutions',
  description: 'Login to BSquare Solutions Learning Management System for enrolled students.',
};

export default function LMSLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-[#071D59] to-[#0086F8] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <span className="text-white font-extrabold text-2xl font-heading">B²</span>
            </div>
          </Link>
          <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Student Portal</h1>
          <p className="text-slate-500 text-sm mt-1">Learning Management System</p>
        </div>

        {/* Login Form Container */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-[#131B2E]">
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  placeholder="student@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs font-bold text-[#0086F8] hover:underline">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0086F8] hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <Lock className="w-4 h-4" /> Secure Login
            </button>
          </form>

          {/* Restriction Notice */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed font-medium">
                <strong>Access Restricted.</strong> LMS access is restricted to enrolled students. Public self-registration is disabled. Please contact administration for your credentials.
              </div>
            </div>
          </div>

        </div>
        
        {/* Footer */}
        <div className="text-center mt-8 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} BSquare Solutions. All rights reserved.
        </div>
      </div>
    </div>
  );
}
