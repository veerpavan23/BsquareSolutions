'use client';

import React from 'react';
import { BookDemoModal } from './BookDemoModal';
import { BrochureModal } from './BrochureModal';
// Import other deep-linked modals here in the future

export function PublicModalHost() {
  return (
    <>
      <BookDemoModal />
      <BrochureModal />
      {/* SearchModal, CourseCompareModal etc. are not currently URL-driven in the same way, but could be added here if migrated */}
    </>
  );
}
