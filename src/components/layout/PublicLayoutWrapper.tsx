'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { BrochureModal } from '@/components/modals/BrochureModal';
import { CourseCompareModal } from '@/components/modals/CourseCompareModal';
import { WishlistDrawer } from '@/components/drawers/WishlistDrawer';
import { WhatsAppWidget } from '@/components/layout/WhatsAppWidget';

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
      <SearchModal />
      <BookDemoModal />
      <BrochureModal />
      <CourseCompareModal />
      <WishlistDrawer />
      <WhatsAppWidget />
    </>
  );
}
export default PublicLayoutWrapper;
