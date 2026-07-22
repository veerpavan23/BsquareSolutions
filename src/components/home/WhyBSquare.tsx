'use client';

import React from 'react';
import {
  Users,
  Code2,
  FolderGit2,
  Award,
  Compass,
  UserCheck,
  FileText,
  Briefcase,
  Calendar,
  Monitor,
  Database,
  Video,
  Building2,
  Coins,
  ShieldCheck
} from 'lucide-react';

export const WhyBSquare: React.FC = () => {
  const advantages = [
    { title: 'Industry Expert Trainers', desc: 'Learn directly from active certified architects and MVPs with 10+ years field experience.', icon: Users },
    { title: 'Hands-on Learning', desc: '100% practical live coding, org configurations, and dashboard building in every session.', icon: Code2 },
    { title: 'Real Time Projects', desc: 'Build enterprise-grade capstone applications for healthcare, retail, and financial domains.', icon: FolderGit2 },
    { title: 'Certification Guidance', desc: 'Step-by-step preparation, mock exam drills, and voucher guidance for global exams.', icon: Award },
    { title: 'Career Mentorship', desc: '1-on-1 career mapping sessions with senior industry managers to guide your career path.', icon: Compass },
    { title: 'Mock Interviews', desc: 'Rigorous technical mock interviews with personalized feedback before live company calls.', icon: UserCheck },
    { title: 'Resume Building', desc: 'Professional resume crafting highlighting key project achievements and verified skills.', icon: FileText },
    { title: 'Placement Assistance', desc: 'Direct referral assistance and resume circulating to our 100+ corporate hiring network.', icon: Briefcase },
    { title: 'Weekend & Weekday Batches', desc: 'Flexible morning, evening, and weekend class schedules tailored for working professionals.', icon: Calendar },
    { title: 'Online & Classroom', desc: 'Attend interactive live online classes or visit our state-of-the-art classroom campus.', icon: Monitor },
    { title: 'Lifetime LMS Access', desc: 'Unlimited access to course materials, code repositories, cheatsheets, and updates.', icon: Database },
    { title: 'Recorded Sessions', desc: 'High-definition recordings of every live class uploaded to your student portal within 2 hours.', icon: Video },
    { title: 'Corporate Training', desc: 'Customized team upskilling bootcamps for global enterprises and IT service organizations.', icon: Building2 },
    { title: 'Affordable Fees', desc: 'High-value premium tech training at transparent, competitive fee structures with EMI options.', icon: Coins }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            The BSquare Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#071D59] dark:text-white">
            Why Students & Professionals Choose BSquare
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            We combine rigorous hands-on technology mastery with personalized career mentoring to ensure your success.
          </p>
        </div>

        {/* Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-[#0086F8] transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0086F8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base group-hover:text-[#0086F8] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
