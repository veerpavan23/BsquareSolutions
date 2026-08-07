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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  
  if (!course) {
    return { title: 'Course Not Found' };
  }

  return {
    title: course.title,
    description: course.shortDescription,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      type: 'website',
      url: `https://bsquare.co.in/courses/${course.slug}`,
    },
    twitter: {
      title: course.title,
      description: course.description,
    },
    alternates: {
      canonical: `https://bsquare.co.in/courses/${course.slug}`,
    }
  };
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'BSquare Solutions',
      sameAs: 'https://bsquare.co.in',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourseDetailClient course={course as any} trainer={trainer} relatedBatches={relatedBatches} />
    </>
  );
}
