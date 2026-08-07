'use client';

import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCustomTheme } from '@/components/providers/ThemeProvider';
import { useApp } from '@/context/AppContext';
import { BSquareLogo } from '@/components/brand/BSquareLogo';
import { MegaMenu } from './MegaMenu';
import {
  Search,
  Moon,
  Sun,
  Heart,
  Scale,
  User,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useCustomTheme();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200); // 200ms grace period to allow cursor to travel
  };

  const {
    setIsSearchOpen,
    setIsWishlistOpen,
    wishlistCourseIds,
    setIsCompareOpen,
    comparedCourseIds,
     } = useApp();
  const { openModal } = useModalNavigation();

  const isDark = mounted && theme === 'dark';

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#0B0F19] border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-[#071D59] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2 py-0.5 bg-[#00C2FF] text-slate-900 font-extrabold text-[10px] uppercase rounded shrink-0">
              NEW BATCHES
            </span>
            <span className="font-medium text-xs truncate">
              Salesforce, Power BI & AI Demo Classes open for registration this week!
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs font-semibold">
            <a href="tel:+919876543210" className="hover:underline flex items-center gap-1 text-white">
              <PhoneCall className="w-3.5 h-3.5 text-[#00C2FF]" /> +91 98765 43210
            </a>
            <span className="hidden md:inline text-blue-200">|</span>
            <Link href="/login" className="hover:underline flex items-center gap-1 text-white">
              <User className="w-3.5 h-3.5 text-[#00C2FF]" /> Student LMS Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Official BSquare Logo (Bold & HD) */}
        <Link 
          href="/" 
          className="flex items-center shrink-0"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <BSquareLogo variant="full" size="md" isDark={isDark} />
        </Link>

        {/* Center: Structured Navigation Menu (Desktop, Optimised to prevent overflow) */}
        <div className="hidden xl:flex items-center space-x-1 xl:space-x-1.5 font-bold text-xs xl:text-sm">
          <Link
            href="/"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              pathname === '/'
                ? 'text-[#0086F8] bg-blue-50 dark:bg-blue-950/60'
                : 'text-slate-700 hover:text-[#0086F8] dark:text-slate-200 dark:hover:text-[#0086F8]'
            }`}
          >
            Home
          </Link>

          {/* Academies Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#0086F8] dark:text-slate-200 dark:hover:text-[#0086F8] flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              Academies <ChevronDown className="w-4 h-4 text-[#0086F8]" />
            </button>
          </div>

          <Link
            href="/learning-paths"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              pathname === '/learning-paths'
                ? 'text-[#0086F8] bg-blue-50 dark:bg-blue-950/60'
                : 'text-slate-700 hover:text-[#0086F8] dark:text-slate-200 dark:hover:text-[#0086F8]'
            }`}
          >
            Learning Paths
          </Link>

          <Link
            href="/corporate-training"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              pathname === '/corporate-training'
                ? 'text-[#0086F8] bg-blue-50 dark:bg-blue-950/60'
                : 'text-slate-700 hover:text-[#0086F8] dark:text-slate-200 dark:hover:text-[#0086F8]'
            }`}
          >
            Corporate
          </Link>

          <Link
            href="/resources"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              pathname === '/resources'
                ? 'text-[#0086F8] bg-blue-50 dark:bg-blue-950/60'
                : 'text-slate-700 hover:text-[#0086F8] dark:text-slate-200 dark:hover:text-[#0086F8]'
            }`}
          >
            Practice Quiz
          </Link>

          <Link
            href="/contact"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              pathname === '/contact'
                ? 'text-[#0086F8] bg-blue-50 dark:bg-blue-950/60'
                : 'text-slate-700 hover:text-[#0086F8] dark:text-slate-200 dark:hover:text-[#0086F8]'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Right: Action Controls Bar (ALWAYS PROMINENT & SECURELY VISIBLE) */}
        <div className="flex items-center space-x-1.5 xl:space-x-2 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search Courses"
          >
            <Search className="w-5 h-5" />
          </button>



          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
            title="Toggle Light / Dark Mode"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 fill-slate-700" />
            )}
          </button>

          {/* Primary CTA: Book Free Demo (ALWAYS PROMINENTLY VISIBLE) */}
          <button
            onClick={() => openModal('book-demo')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[#0086F8] hover:bg-blue-600 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" /> Book Free Demo
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      {isMegaMenuOpen && (
        <div
          className="absolute top-full left-0 w-full z-50"
          onMouseEnter={handleMegaMenuEnter}
          onMouseLeave={handleMegaMenuLeave}
        >
          <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#131B2E] border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto text-slate-800 dark:text-slate-100 font-semibold text-sm">
          <div className="flex flex-col space-y-2">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Home</Link>
            <Link href="/courses" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800 text-[#0086F8] font-bold">All Courses</Link>
            <Link href="/salesforce-training" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Salesforce Academy</Link>
            <Link href="/power-bi-training" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Power BI Academy</Link>
            <Link href="/tableau-training" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Tableau Academy</Link>
            <Link href="/data-analytics-training" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Analytics Academy</Link>
            <Link href="/learning-paths" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Learning Paths</Link>
            <Link href="/corporate-training" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Corporate Training</Link>
            <Link href="/trainers" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Trainers</Link>
            <Link href="/success-stories" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Success Stories</Link>
            <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Free Resources</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">Blog</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-slate-800">About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2">Contact</Link>
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openModal('book-demo');
            }}
            className="w-full py-3 bg-[#0086F8] text-white font-bold rounded-xl text-center shadow-md uppercase tracking-wider text-xs"
          >
            Book Free Demo Class
          </button>
        </div>
      )}
    </header>
  );
};
