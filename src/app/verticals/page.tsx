import React from 'react';
import Link from 'next/link';
import { academyReadService } from '@/modules/public/academy-read.service';
import { Layers, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function VerticalsPage() {
  const verticals = await academyReadService.getAllActiveVerticals();

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Our Learning Verticals
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Explore Training Domains
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Discover our comprehensive learning paths and specialized technology academies designed for your career growth.
          </p>
        </div>

        {verticals.length === 0 ? (
          <div className="py-20 text-center space-y-3 glass-panel rounded-3xl p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No verticals found.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticals.map((vertical) => (
              <div
                key={vertical.id}
                className="group glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-[#0086F8]" />
                  </div>
                  <Link href={`/verticals/${vertical.slug}`}>
                    <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white group-hover:text-[#0086F8] transition-colors mb-2">
                      {vertical.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {vertical.shortDescription || 'Explore our comprehensive courses in this domain.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    href={`/verticals/${vertical.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0086F8] hover:text-blue-700 transition-colors"
                  >
                    View Academy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
