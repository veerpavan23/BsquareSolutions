'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      title="Scroll to Top"
      className="fixed bottom-24 right-7 z-40 w-12 h-12 bg-[#0086F8] hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};
