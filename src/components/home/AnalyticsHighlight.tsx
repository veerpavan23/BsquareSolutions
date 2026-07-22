'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, PieChart, Check, ArrowRight, Layers, Database, Shield } from 'lucide-react';

export const AnalyticsHighlight: React.FC = () => {
  const powerBIItems = [
    "Power Query ETL & M Language",
    "Star Schema & Fact/Dim Modeling",
    "Advanced DAX & Filter Context",
    "Power BI Service & Gateway Refresh",
    "Row-Level Security (RLS)",
    "Microsoft Fabric OneLake Integration"
  ];

  const tableauItems = [
    "Tableau Desktop & Storyboarding",
    "Tableau Prep Data Cleaning",
    "FIXED / INCLUDE / EXCLUDE LODs",
    "Parameters & Dual Axis Visuals",
    "Tableau Server & Cloud Governance",
    "Executive C-Suite Dashboard Design"
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-[#0086F8]/10 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Business Intelligence & Visual Analytics
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Power BI & Tableau Mastery
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Turn massive enterprise datasets into actionable insights with the world&apos;s two leading BI platforms.
          </p>
        </div>

        {/* Two-Column Comparison / Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Power BI Card */}
          <div className="glass-panel rounded-3xl p-8 border border-amber-200/50 dark:border-amber-900/30 bg-gradient-to-b from-amber-500/5 to-transparent flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                      Power BI Academy
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                      PL-300 & DP-600 Certified Track
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Master end-to-end data transformation, star schema modeling, DAX measure optimization, and next-generation Microsoft Fabric DirectLake architectures.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {powerBIItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/power-bi-training"
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-2"
            >
              Explore Power BI Academy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Tableau Card */}
          <div className="glass-panel rounded-3xl p-8 border border-cyan-200/50 dark:border-cyan-900/30 bg-gradient-to-b from-cyan-500/5 to-transparent flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                      Tableau Academy
                    </h3>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
                      Tableau Certified Data Analyst Track
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Master visual data storytelling, complex Fixed/Include/Exclude LOD expressions, Tableau Prep Builder cleaning, and enterprise Tableau Server publishing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {tableauItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <Check className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/tableau-training"
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-2"
            >
              Explore Tableau Academy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
