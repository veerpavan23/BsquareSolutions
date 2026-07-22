'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { COURSES } from '@/data/courses';
import { X, Scale, Trash2, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const CourseCompareModal: React.FC = () => {
  const { isCompareOpen, setIsCompareOpen, comparedCourseIds, toggleCompareCourse, clearCompare, openDemoModalWithCourse } = useApp();

  if (!isCompareOpen) return null;

  const selectedCourses = COURSES.filter((c) => comparedCourseIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 shrink-0">
          <div className="flex items-center gap-2 text-[#071D59] dark:text-white font-heading font-bold text-lg">
            <Scale className="w-5 h-5 text-[#0086F8]" /> Course Comparison Matrix ({selectedCourses.length}/3)
          </div>
          <div className="flex items-center gap-3">
            {selectedCourses.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            )}
            <button onClick={() => setIsCompareOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {selectedCourses.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Scale className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">No courses selected for comparison yet.</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Browse our course catalog and click the &quot;Compare&quot; button on any course card to compare up to 3 programs side-by-side.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-400 w-1/4">Comparison Criteria</th>
                    {selectedCourses.map((course) => (
                      <th key={course.id} className="py-3 px-4 w-1/4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs text-[#0086F8] font-bold">{course.academy}</div>
                            <div className="font-heading font-bold text-slate-900 dark:text-white text-sm mt-0.5">{course.title}</div>
                          </div>
                          <button
                            onClick={() => toggleCompareCourse(course.id)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Duration</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4 font-medium">{c.duration}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Skill Level</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 dark:bg-blue-900/30 text-[#0086F8]">
                          {c.level}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Training Mode</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4">{c.trainingMode} ({c.batchOptions})</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Target Certification</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4 font-semibold text-[#071D59] dark:text-blue-400">{c.certificationTarget}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Live Hands-on Projects</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white">{c.liveProjectsCount} Real-world Projects</span>
                        <p className="text-xs text-slate-500 mt-0.5">{c.capstoneProject.title}</p>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Prerequisites</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4 text-xs">{c.prerequisites.join(', ')}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Tools & Technologies</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {c.tools.map((tool, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 rounded">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-500 dark:text-slate-400">Actions</td>
                    {selectedCourses.map((c) => (
                      <td key={c.id} className="py-3.5 px-4 space-y-2">
                        <button
                          onClick={() => {
                            setIsCompareOpen(false);
                            openDemoModalWithCourse(c.id);
                          }}
                          className="w-full py-2 px-3 bg-[#0086F8] hover:bg-blue-600 text-white font-semibold rounded-lg text-xs transition-colors"
                        >
                          Book Demo
                        </button>
                        <Link
                          href={`/courses/${c.slug}`}
                          onClick={() => setIsCompareOpen(false)}
                          className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          View Details <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
