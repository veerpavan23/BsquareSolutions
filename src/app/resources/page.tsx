'use client';

import React, { useState } from 'react';
import { FREE_RESOURCES, INTERVIEW_QUESTIONS, QUIZ_QUESTIONS } from '@/data/resources';
import { BookOpen, HelpCircle, CheckCircle2, XCircle, RotateCcw, Download, Award, Sparkles } from 'lucide-react';

export default function FreeResourcesPage() {
  const [selectedQuizCategory, setSelectedQuizCategory] = useState<string>('all');
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState<boolean>(false);
  const [expandedIqId, setExpandedIqId] = useState<string | null>(INTERVIEW_QUESTIONS[0].id);

  const filteredQuizzes = selectedQuizCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter((q) => q.category === selectedQuizCategory);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submittedQuiz) return;
    setCurrentAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    filteredQuizzes.forEach((q) => {
      if (currentAnswers[q.id] === q.correctOptionId) score += 1;
    });
    return score;
  };

  const handleResetQuiz = () => {
    setCurrentAnswers({});
    setSubmittedQuiz(false);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Free Student Learning Hub
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Interview Questions, Quizzes & Exam Resources
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Boost your tech interview preparation and test your knowledge with interactive mock quizzes and downloadable cheatsheets.
          </p>
        </div>

        {/* Section 1: Interactive Certification Mock Quiz Engine */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0086F8]">
                <Sparkles className="w-4 h-4" /> Interactive Practice Quiz Engine
              </div>
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mt-1">
                Certification Practice Mock Test
              </h2>
            </div>

            {/* Topic Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Filter Topic:</span>
              <select
                value={selectedQuizCategory}
                onChange={(e) => {
                  setSelectedQuizCategory(e.target.value);
                  handleResetQuiz();
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none"
              >
                <option value="all">All Topics</option>
                <option value="salesforce-admin">Salesforce Admin</option>
                <option value="power-bi-dax">Power BI DAX</option>
                <option value="tableau-lod">Tableau LOD</option>
              </select>
            </div>
          </div>

          {/* Quiz Questions List */}
          <div className="space-y-8">
            {filteredQuizzes.map((q, qIdx) => {
              const selectedOption = currentAnswers[q.id];
              const isCorrect = selectedOption === q.correctOptionId;

              return (
                <div key={q.id} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                      Q{qIdx + 1}: {q.questionText}
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-blue-50 dark:bg-blue-950 text-[#0086F8] shrink-0">
                      {q.category}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => {
                      const isSelected = selectedOption === opt.id;
                      let optionStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-[#0086F8]';

                      if (isSelected && !submittedQuiz) {
                        optionStyle = 'bg-blue-50 dark:bg-blue-950 border-[#0086F8] text-[#0086F8] font-bold';
                      }
                      if (submittedQuiz) {
                        if (opt.id === q.correctOptionId) {
                          optionStyle = 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                        } else if (isSelected && opt.id !== q.correctOptionId) {
                          optionStyle = 'bg-rose-50 dark:bg-rose-950 border-rose-500 text-rose-600 dark:text-rose-400';
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt.text}</span>
                          {submittedQuiz && opt.id === q.correctOptionId && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                          {submittedQuiz && isSelected && opt.id !== q.correctOptionId && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submission */}
                  {submittedQuiz && (
                    <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong className="text-[#0086F8] font-semibold block mb-1">Explanation:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Action Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {!submittedQuiz ? (
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(currentAnswers).length === 0}
                className="w-full sm:w-auto px-8 py-3 bg-[#0086F8] hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
              >
                Submit Answers & View Score
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  Your Score: <span className="text-emerald-500 font-extrabold">{calculateScore()}</span> / {filteredQuizzes.length} Correct
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs rounded-xl flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Quiz
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Top Interview Questions */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#0086F8]" /> Frequently Asked Interview Questions
          </h2>

          <div className="space-y-3">
            {INTERVIEW_QUESTIONS.map((iq) => {
              const isOpen = expandedIqId === iq.id;
              return (
                <div key={iq.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setExpandedIqId(isOpen ? null : iq.id)}
                    className="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-blue-50 dark:bg-blue-950 text-[#0086F8]">
                        {iq.category}
                      </span>
                      {iq.question}
                    </span>
                    <span className="text-xl text-[#0086F8]">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong className="text-emerald-500 font-semibold block mb-1">Detailed Explanation:</strong>
                      {iq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Downloadable Cheat Sheets & Guides */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0086F8]" /> Downloadable Cheat Sheets & Project Templates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FREE_RESOURCES.map((res) => (
              <div key={res.id} className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#0086F8] uppercase mb-2">
                    <span>{res.category}</span>
                    <span className="text-slate-400">{res.readTimeOrDuration}</span>
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <a
                  href={`#download-${res.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Preparing download for: ${res.title}`);
                  }}
                  className="w-full py-2.5 bg-blue-50 dark:bg-blue-950 text-[#0086F8] hover:bg-[#0086F8] hover:text-white font-bold text-xs rounded-xl transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Resource
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
