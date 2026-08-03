'use client';

import React, { useActionState, startTransition } from 'react';
import { loginAction } from '@/modules/auth/auth.actions';
import { BSquareLogo } from '@/components/brand/BSquareLogo';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white relative overflow-hidden transition-colors duration-200">
      {/* Background Gradients (Subtle Glows in Dark Mode) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl mb-4 transition-colors duration-200">
            <BSquareLogo />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide transition-colors duration-200">
            BSquare Admin Portal
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors duration-200">
            Sign in to manage your training business
          </p>
        </div>

        {/* Card Body */}
        <div className="bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 p-8 rounded-2xl shadow-xl dark:shadow-2xl transition-colors duration-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-200 text-sm p-3 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 shrink-0" />
                <span>{state.error}</span>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors duration-200">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@bsquaresolutions.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors duration-200">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 transition cursor-pointer text-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-8 transition-colors duration-200">
          &copy; {new Date().getFullYear()} BSquare Solutions & Services. All rights reserved.
        </p>
      </div>
    </main>
  );
}
