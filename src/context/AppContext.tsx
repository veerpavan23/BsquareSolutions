'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course } from '@/data/courses';
import { useModalNavigation } from '@/lib/modal-routing/modal-hooks';

interface AppContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  openDemoModalWithCourse: (courseId?: string) => void;
  
  openBrochureModalWithCourse: (courseId: string) => void;
  
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  comparedCourseIds: string[];
  toggleCompareCourse: (courseId: string) => void;
  clearCompare: () => void;
  
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  wishlistCourseIds: string[];
  toggleWishlistCourse: (courseId: string) => void;
  isInWishlist: (courseId: string) => boolean;
  isInCompare: (courseId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openModal } = useModalNavigation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [comparedCourseIds, setComparedCourseIds] = useState<string[]>([]);
  
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistCourseIds, setWishlistCourseIds] = useState<string[]>([]);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('bsquare_wishlist');
      if (savedWishlist) setWishlistCourseIds(JSON.parse(savedWishlist));

      const savedCompare = localStorage.getItem('bsquare_compare');
      if (savedCompare) setComparedCourseIds(JSON.parse(savedCompare));
    } catch (err) {
      console.error('LocalStorage read error:', err);
    }
  }, []);

  // Save to localStorage when updated
  const toggleWishlistCourse = (courseId: string) => {
    setWishlistCourseIds((prev) => {
      const next = prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId];
      try {
        localStorage.setItem('bsquare_wishlist', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const toggleCompareCourse = (courseId: string) => {
    setComparedCourseIds((prev) => {
      if (prev.includes(courseId)) {
        const next = prev.filter((id) => id !== courseId);
        try {
          localStorage.setItem('bsquare_compare', JSON.stringify(next));
        } catch (e) {}
        return next;
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 courses at a time.');
        return prev;
      }
      const next = [...prev, courseId];
      try {
        localStorage.setItem('bsquare_compare', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const clearCompare = () => {
    setComparedCourseIds([]);
    try {
      localStorage.removeItem('bsquare_compare');
    } catch (e) {}
  };

  const openDemoModalWithCourse = (courseId?: string) => {
    openModal('book-demo', courseId ? { course: courseId } : undefined);
  };

  const openBrochureModalWithCourse = (courseId: string) => {
    openModal('brochure', { course: courseId });
  };

  const isInWishlist = (courseId: string) => wishlistCourseIds.includes(courseId);
  const isInCompare = (courseId: string) => comparedCourseIds.includes(courseId);

  return (
    <AppContext.Provider
      value={{
        isSearchOpen,
        setIsSearchOpen,
        openDemoModalWithCourse,
        openBrochureModalWithCourse,
        isCompareOpen,
        setIsCompareOpen,
        comparedCourseIds,
        toggleCompareCourse,
        clearCompare,
        isWishlistOpen,
        setIsWishlistOpen,
        wishlistCourseIds,
        toggleWishlistCourse,
        isInWishlist,
        isInCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
