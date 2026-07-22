'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BSquareLogo } from '@/components/brand/BSquareLogo';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071D59] text-white pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BSquareLogo variant="full" size="xl" isDark={true} />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              BSquare Solutions & Services is India&apos;s leading professional technology training academy. We specialize in expert-led Salesforce, Power BI, Tableau, Analytics, and AI certification programs with hands-on live projects and dedicated career guidance.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>100% Practical Hands-on Training & Live Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>100+ Hiring Partners & Comprehensive Placement Support</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Academies */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-cyan-400 mb-4">
              Training Academies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link href="/salesforce-training" className="hover:text-cyan-300 transition-colors">
                  Salesforce Academy
                </Link>
              </li>
              <li>
                <Link href="/power-bi-training" className="hover:text-cyan-300 transition-colors">
                  Power BI Academy
                </Link>
              </li>
              <li>
                <Link href="/tableau-training" className="hover:text-cyan-300 transition-colors">
                  Tableau Academy
                </Link>
              </li>
              <li>
                <Link href="/data-analytics-training" className="hover:text-cyan-300 transition-colors">
                  Analytics Academy
                </Link>
              </li>
              <li>
                <Link href="/ai-data-science-training" className="hover:text-cyan-300 transition-colors">
                  AI & Data Science Academy
                </Link>
              </li>
              <li>
                <Link href="/corporate-training" className="hover:text-cyan-300 transition-colors">
                  Corporate Training Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Career Roadmaps & Student Hub */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-cyan-400 mb-4">
              Quick Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link href="/learning-paths" className="hover:text-cyan-300 transition-colors">
                  Visual Career Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-cyan-300 transition-colors">
                  Certified Elite Trainers
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-cyan-300 transition-colors">
                  Student Success Stories
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-cyan-300 transition-colors">
                  Free Practice Quizzes & Guides
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-300 transition-colors">
                  Tech Blog & Interview Tips
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-cyan-300 transition-colors">
                  Student LMS Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="font-heading font-bold text-sm tracking-wider uppercase text-cyan-400 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>BSquare Technology Campus, Corporate Tower, Technology Hub, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:underline font-semibold text-white">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:info@bsquare.co.in" className="hover:underline">
                  info@bsquare.co.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BSquare Solutions & Services. All Rights Reserved. Master the World&apos;s Leading Technologies.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/contact" className="hover:underline">Contact & Location</Link>
            <Link href="/courses" className="hover:underline">All Courses</Link>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-[#0086F8] hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            title="Back to Top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </footer>
  );
};
