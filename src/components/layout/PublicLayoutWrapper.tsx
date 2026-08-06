'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/modals/SearchModal';
import { PublicModalHost } from '@/components/modals/PublicModalHost';
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
      <Suspense fallback={null}>
        <SearchModal />
        <CourseCompareModal />
        <PublicModalHost />
      </Suspense>
      <WishlistDrawer />
      <WhatsAppWidget />
    </>
  );
}
export default PublicLayoutWrapper;
