'use client';

import React from 'react';
import { Award, Users, Building2, ThumbsUp, Briefcase, GraduationCap } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '15+', icon: Award, color: 'text-blue-500' },
    { label: 'Students Trained', value: '5,000+', icon: Users, color: 'text-[#0086F8]' },
    { label: 'Corporate Trainings', value: '200+', icon: Building2, color: 'text-cyan-500' },
    { label: 'Student Satisfaction', value: '95%', icon: ThumbsUp, color: 'text-emerald-500' },
    { label: 'Hiring Partners', value: '100+', icon: Briefcase, color: 'text-indigo-500' },
    { label: 'Certified Trainers', value: '100%', icon: GraduationCap, color: 'text-amber-500' },
  ];

  return (
    <section className="py-12 bg-[#071D59] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all"
              >
                <Icon className={`w-7 h-7 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-300 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
