'use client';

import React, { useState } from 'react';
import { TESTIMONIALS } from '@/data/testimonials';
import { Star, Quote, Play, Award, X } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Student Feedback & Video Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            What Our Students Say About BSquare
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Read verified reviews and watch student video testimonials from past training batches.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-panel rounded-3xl p-7 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 dark:text-slate-700" />
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &quot;{t.content}&quot;
                </p>

                {t.certificationAchieved && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                    <Award className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Cleared: {t.certificationAchieved}</span>
                  </div>
                )}

                {t.videoUrl && (
                  <button
                    onClick={() => setActiveVideoUrl(t.videoUrl!)}
                    className="w-full py-2.5 px-4 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-[#0086F8] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-[#0086F8]" /> Watch Video Review (60s)
                  </button>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#071D59] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">
                    {t.studentName}
                  </h4>
                  <p className="text-xs text-[#0086F8] font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Review Modal Simulation */}
        {activeVideoUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
            <div className="w-full max-w-2xl bg-black rounded-2xl overflow-hidden relative shadow-2xl">
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-3 right-3 z-10 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-[#0086F8] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h3 className="text-lg font-bold text-white">Student Video Review Demonstration</h3>
                <p className="text-xs text-slate-400">
                  This modal renders verified student video feedback clips uploaded by BSquare academy graduates.
                </p>
                <button
                  onClick={() => setActiveVideoUrl(null)}
                  className="px-6 py-2 bg-[#0086F8] text-white font-semibold rounded-xl text-xs"
                >
                  Close Video Preview
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
