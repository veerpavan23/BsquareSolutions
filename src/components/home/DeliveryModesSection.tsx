'use client';

import React from 'react';
import { Monitor, MapPin, Repeat, Video, CheckCircle2 } from 'lucide-react';

export const DeliveryModesSection: React.FC = () => {
  const modes = [
    {
      title: 'Live Online Interactive',
      desc: 'Join live instructor-led classes with screen sharing, instant Q&A, live code debugging, and hands-on lab exercises from anywhere.',
      icon: Monitor,
      badge: 'Most Popular',
      points: ['HD Video & Live Code Along', 'Instant Doubt Resolution', 'Recorded Session Access']
    },
    {
      title: 'In-Person Classroom',
      desc: 'Attend face-to-face classes at our modern technology campus with high-speed lab workstations, peer group learning, and direct instructor access.',
      icon: MapPin,
      badge: 'Campus Learning',
      points: ['Dedicated Tech Workstations', 'Peer Group Networking', 'Physical Workshop Labs']
    },
    {
      title: 'Hybrid Flexible Mode',
      desc: 'Combine online weekday live sessions with weekend in-person classroom bootcamps to match your work schedule perfectly.',
      icon: Repeat,
      badge: 'Maximum Flexibility',
      points: ['Switch Online/Classroom anytime', 'Tailored for Working Professionals', 'Blended Project Reviews']
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Flexible Learning Options
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Training Delivery Modes
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Choose the training mode that fits your lifestyle, schedule, and learning preferences.
          </p>
        </div>

        {/* Delivery Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-7 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#0086F8] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                    {m.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                    {m.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
