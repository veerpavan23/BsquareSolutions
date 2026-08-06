import React from 'react';
import { notFound } from 'next/navigation';
import { courseReadService } from '@/modules/public/course-read.service';
import { TRAINERS } from '@/data/trainers';
import { UPCOMING_BATCHES } from '@/data/batches';
import { CourseDetailClient } from '@/components/courses/CourseDetailClient';

export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const course = await courseReadService.getCourseBySlug(slug);
  if (!course) {
    notFound();
  }

  const mappedCourse = {
    id: course.id,
    title: course.title,
    slug: course.slug,
    academy: course.academy.name,
    level: course.level,
    duration: `${course.durationValue} ${course.durationUnit}`,
    shortDescription: course.shortDescription,
    fullOverview: course.description,
    learningObjectives: ['Master core concepts and frameworks', 'Work on real-world assignments', 'Prepare for certification exams'],
    prerequisites: ['Basic understanding of internet technologies', 'Dedication to learn and practice'],
    certificationTarget: 'Industry Recognized Certification',
    batchOptions: 'Online Live & Classroom',
    rating: 4.8,
    reviewCount: 154,
    enrolledStudents: 500,
    tools: ['Modern Tools', 'Industry standard practices'],
    curriculum: course.modules.map(m => ({
      title: m.title,
      topics: m.topics.map(t => t.title)
    })),
    capstoneProject: {
      title: 'Comprehensive Final Project',
      description: 'Implement an end-to-end solution applying all the skills learned throughout the course.'
    }
  };

  const trainer = TRAINERS[0];
  const relatedBatches = UPCOMING_BATCHES.slice(0, 3);

  return <CourseDetailClient course={mappedCourse as any} trainer={trainer} relatedBatches={relatedBatches} />;
}
