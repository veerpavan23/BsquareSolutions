'use client';

import React from 'react';
import Link from 'next/link';
import { Cloud, CheckCircle2, ArrowRight, Sparkles, Award } from 'lucide-react';

export const SalesforceHighlight: React.FC = () => {
  const salesforceModules = [
    { title: "Salesforce Administrator", desc: "ADM-201 prep, security models, custom objects & org governance" },
    { title: "Platform App Builder", desc: "CRT-801 prep, data modeling, Lightning apps & mobile layouts" },
    { title: "Platform Developer I (Apex)", desc: "Apex OOPs, SOQL/SOSL queries, triggers & unit testing" },
    { title: "Platform Developer II", desc: "Advanced design patterns, enterprise frameworks & LDV strategy" },
    { title: "Lightning Web Components (LWC)", desc: "ES6+ Modern JS, Shadow DOM, Wire Service & SLDS UI" },
    { title: "Salesforce Flow Automation", desc: "Screen flows, record-triggered flows & orchestration" },
    { title: "Salesforce Integration", desc: "REST/SOAP APIs, OAuth 2.0, Named Credentials & Middleware" },
    { title: "Sales Cloud & Service Cloud", desc: "Lead-to-Opportunity pipeline & Omni-channel service desks" },
    { title: "Experience & Marketing Cloud", desc: "Custom portals, customer journeys & automated email flows" },
    { title: "Salesforce CPQ", desc: "Configure, Price, Quote product bundles & pricing rules" },
    { title: "Salesforce Data Cloud", desc: "Real-time customer data platform & unified profiles" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#071D59] via-[#0B2570] to-[#071D59] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold uppercase tracking-wider">
              <Cloud className="w-4 h-4 text-cyan-300" /> Flagship Academy Highlight
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
              India&apos;s Leading <span className="text-cyan-300">Salesforce Training</span> Institute
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              From foundational Administration and Declarative Automation to Advanced Apex, LWC, Data Cloud, and autonomous Agentforce AI — master every Salesforce track with certified MVPs.
            </p>
          </div>

          <Link
            href="/salesforce-training"
            className="px-6 py-3 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-500/30"
          >
            Explore Salesforce Academy <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salesforceModules.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all group"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certification Guarantee Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-white text-base">
                Salesforce Official Certification Focused
              </h4>
              <p className="text-xs text-slate-300">
                100% syllabus coverage for ADM-201, CRT-801, PDI, LWC, Data Cloud, and AI Specialist exams.
              </p>
            </div>
          </div>
          <Link
            href="/courses/salesforce-administrator"
            className="px-5 py-2.5 bg-white text-[#071D59] font-bold text-xs rounded-xl hover:bg-cyan-300 transition-colors shrink-0"
          >
            View ADM-201 Syllabus
          </Link>
        </div>

      </div>
    </section>
  );
};
