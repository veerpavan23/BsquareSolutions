'use client';

import React, { useState } from 'react';
import { Building2, CheckCircle2, ShieldCheck, Users, Calendar, Send, Loader2, Award, BookOpen } from 'lucide-react';

export default function CorporateTrainingPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    workEmail: '',
    phone: '',
    technology: 'Salesforce & Agentforce AI',
    participants: '10-25 Employees',
    mode: 'Online Live Corporate Cohort',
    startDate: '',
    objectives: '',
    requirements: '',
    consent: true,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.workEmail || !formData.phone || !formData.organization) return;
    
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            Enterprise & Institutional Upskilling
          </div>
          <h1 className="text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Corporate Technology Training Solutions
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Empower your workforce with custom-designed Salesforce, Power BI, Tableau, and AI bootcamps delivered onsite, online, or hybrid.
          </p>
        </div>

        {/* Corporate Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0086F8] text-white flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
              Customized Corporate Cohorts
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Curriculum tailored to your exact tech stack, enterprise coding standards, and internal project deliverables.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
              Skill Assessments & Analytics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pre-training baseline skill evaluation, ongoing assessment tracking, and post-bootcamp performance reports.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-lg">
              College & Faculty Development
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Institutional technology bootcamps for engineering students and faculty upskilling workshops.
            </p>
          </div>
        </div>

        {/* Corporate Enquiry Form */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">
                Submit Corporate Enquiry & Request Custom Proposal
              </h2>
              <p className="text-xs text-slate-500">Fill in your requirements below for a detailed course proposal and custom quote.</p>
            </div>

            {status === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Proposal Request Received!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Thank you <span className="font-bold text-[#0086F8]">{formData.name}</span> ({formData.organization}). Our Corporate Training Director will get in touch at <span className="font-semibold">{formData.workEmail}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tech Solutions Pvt Ltd"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Technology
                    </label>
                    <select
                      value={formData.technology}
                      onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    >
                      <option value="Salesforce & Agentforce AI">Salesforce & Agentforce AI</option>
                      <option value="Power BI & Microsoft Fabric">Power BI & Microsoft Fabric</option>
                      <option value="Tableau Desktop & Server">Tableau Desktop & Server</option>
                      <option value="Data Analytics & SQL">Data Analytics & SQL</option>
                      <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                      <option value="AWS & Cloud DevOps">AWS & Cloud DevOps</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Participant Count
                    </label>
                    <select
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    >
                      <option value="5-10">5 - 10 Employees</option>
                      <option value="10-25">10 - 25 Employees</option>
                      <option value="25-50">25 - 50 Employees</option>
                      <option value="50+">50+ Employees / College Batch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                      Preferred Mode
                    </label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                    >
                      <option value="Online Live">Online Live Cohort</option>
                      <option value="Onsite Campus">Onsite Office Campus</option>
                      <option value="Hybrid">Hybrid Delivery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Training Objectives & Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe specific team learning goals, target certifications, or project requirements..."
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0086F8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-[#0086F8] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                  Submit Corporate Proposal Request
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
