import React from 'react';
import { notFound } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { TRAINERS } from '@/data/trainers';
import { UPCOMING_BATCHES } from '@/data/batches';
import { CourseDetailClient } from '@/components/courses/CourseDetailClient';

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const course = COURSES.find((c) => c.slug === slug);
  
  if (!course) {
    notFound();
  }

  const trainer = TRAINERS[0];
  const relatedBatches = UPCOMING_BATCHES.slice(0, 3);

  return <CourseDetailClient course={course as any} trainer={trainer} relatedBatches={relatedBatches} />;
}
