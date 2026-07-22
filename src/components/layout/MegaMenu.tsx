'use client';

import React from 'react';
import Link from 'next/link';
import { ACADEMIES_NAV } from '@/data/navigation';
import { Sparkles, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  onClose?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  return (
    <div className="w-full bg-white dark:bg-[#131B2E] border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all animate-fade-in py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ACADEMIES_NAV.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Sparkles className="w-4 h-4 text-[#0086F8]" />
              <h3 className="font-heading font-bold text-sm tracking-wider uppercase text-[#071D59] dark:text-white">
                {category.title}
              </h3>
            </div>

            <ul className="space-y-3">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group block p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-[#0086F8] transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-amber-500 text-white rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>All courses include 100% live projects, certification guidance, and placement support.</span>
        </div>
        <Link
          href="/courses"
          onClick={onClose}
          className="font-bold text-[#0086F8] hover:underline flex items-center gap-1"
        >
          View Complete Course Directory <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
