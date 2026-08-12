import React from 'react';
import Link from 'next/link';
import { Briefcase, ChevronRight, Play } from 'lucide-react';

export const metadata = {
  title: 'Internship Programs | BSquare Solutions',
  description: 'Gain real-world experience with BSquare Solutions internship programs. Work on live projects and build your professional portfolio.',
};

export default function InternshipsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#0086F8] text-sm font-bold tracking-wider uppercase">
            <Briefcase className="w-4 h-4" /> Real-world Experience
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0086F8] to-[#00C2FF]">Internship Programs</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Bridge the gap between academic learning and industry requirements. Work on live enterprise projects under the mentorship of senior architects.
          </p>
        </div>

        {/* Internship Listings Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Item 1 */}
          <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group bg-white dark:bg-[#131B2E]">
            <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#071D59]/10 to-[#0086F8]/10" />
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center text-2xl font-black text-[#0086F8] z-10">
                SF
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                <span>3 Months</span> • <span>Live Project</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors">
                Salesforce Developer Internship
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                Gain hands-on experience building custom Lightning Web Components and Apex triggers for a real estate client CRM implementation.
              </p>
              
              <Link href="/contact?subject=Salesforce%20Internship" className="inline-flex items-center gap-2 font-bold text-[#0086F8] hover:text-blue-700 text-sm mt-4">
                Apply Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Item 2 */}
          <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all group bg-white dark:bg-[#131B2E]">
            <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-orange-500/10" />
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-sm flex items-center justify-center text-2xl font-black text-amber-500 z-10">
                BI
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                <span>2 Months</span> • <span>Live Project</span>
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors">
                Power BI & Analytics Internship
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                Work with messy datasets, build robust Star Schemas, and develop executive dashboards for supply chain optimization.
              </p>
              
              <Link href="/contact?subject=PowerBI%20Internship" className="inline-flex items-center gap-2 font-bold text-[#0086F8] hover:text-blue-700 text-sm mt-4">
                Apply Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
        </div>
        
        {/* Banner */}
        <div className="rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-[#071D59] to-[#0B2570] text-white text-center mt-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0086F8] to-[#00C2FF]" />
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">Don't see your desired domain?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            We frequently open new internship cohorts for MERN stack, Data Science, and DevOps. Drop your resume and we will notify you.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0086F8] hover:bg-blue-600 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg">
            Submit Resume
          </Link>
        </div>

      </div>
    </main>
  );
}
