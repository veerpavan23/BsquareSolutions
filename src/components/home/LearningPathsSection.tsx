'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LEARNING_PATHS, CareerPath } from '@/data/learningPaths';
import { Compass, CheckCircle, ArrowRight, Award, Briefcase, Code } from 'lucide-react';

export const LearningPathsSection: React.FC = () => {
  const [selectedPathId, setSelectedPathId] = useState<string>(LEARNING_PATHS[0].id);

  const selectedPath = LEARNING_PATHS.find((p) => p.id === selectedPathId) || LEARNING_PATHS[0];

  return (
    <section className="py-20 bg-white dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#0086F8]" /> Visual Career Roadmaps
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
              Beginner → Intermediate → Advanced → Career
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Clear, step-by-step learning blueprints mapping required skills, courses, certifications, and target job roles.
            </p>
          </div>

          <Link
            href="/learning-paths"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0086F8] hover:underline"
          >
            Explore All 11 Career Roadmaps <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Roadmap Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {LEARNING_PATHS.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPathId === path.id
                  ? 'bg-[#071D59] text-white dark:bg-[#0086F8] shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {path.title}
            </button>
          ))}
        </div>

        {/* Selected Roadmap Stepper Card */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0086F8] uppercase tracking-wider">Target Job Role</span>
              <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-1">
                {selectedPath.targetRole}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{selectedPath.description}</p>
            </div>
          </div>

          {/* Stepper Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {selectedPath.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#0086F8] text-white text-xs font-bold flex items-center justify-center shadow-md">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[11px] font-bold text-[#0086F8] uppercase">
                      {step.phaseTitle}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                      {step.skillToLearn}
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs pt-2">
                    <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <Code className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">Course: </span>
                        <Link href={`/courses/${step.courseSlug}`} className="text-[#0086F8] hover:underline font-medium">
                          {step.recommendedCourse}
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">Certification: </span>
                        <span>{step.suggestedCertification}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">Capstone: </span>
                        <span>{step.practicalProject}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Unlocked Role:</span>
                  <span className="font-bold text-[#071D59] dark:text-cyan-300 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> {step.potentialJobRole}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
