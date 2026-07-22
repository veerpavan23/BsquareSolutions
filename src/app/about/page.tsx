import { BSquareLogo } from '@/components/brand/BSquareLogo';
import { Award, ShieldCheck, Target, Eye, Compass, Users, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About BSquare Solutions & Services | Premier Tech Academy',
  description: 'Learn about BSquare Solutions & Services journey, 15+ years of training excellence, mission, vision, and leadership team.',
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-slate-50 dark:bg-[#0B0F19] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0086F8] text-xs font-bold uppercase tracking-wider">
            About BSquare Solutions & Services
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-[#071D59] dark:text-white">
            15+ Years of Technology Training Excellence
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded with a vision to bridge the gap between academic education and real-world tech industry demands, BSquare has empowered over 5,000+ students and professionals across India and globally.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0086F8] text-white flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To deliver world-class, practical, and accessible technology training in Salesforce, Power BI, Tableau, Analytics, and AI that enables learners to clear global certifications and build successful careers.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To be globally recognized as India&apos;s premier ed-tech academy, trusted by students, working professionals, corporate enterprises, and hiring partners alike for excellence in tech skills.
            </p>
          </div>
        </div>

        {/* Training Philosophy */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0086F8]">
            <Compass className="w-4 h-4" /> Core Values & Philosophy
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
            The BSquare Training Philosophy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">1. 100% Practical Focus</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe tech skills cannot be learned through slides alone. Every concept is accompanied by live code-along and sandbox configuration.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">2. Active Industry Instructors</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All training modules are taught by practicing senior architects, certified MVPs, and lead engineers currently working on active projects.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">3. Career Outcomes First</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                From day one, our curriculum focuses on certification targets, resume crafting, technical mock interviews, and placement guidance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
