import { z } from 'zod';
import { CourseStatus, CourseLevel, DurationUnit } from '@prisma/client';

export const createCourseSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  code: z.string().min(2, 'Course Code must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  academyId: z.string().cuid('Vertical is required'),
  // We'll hardcode categoryId for MVP to whatever the first one is or handle it in service, 
  // actually wait, in schema.prisma Course requires categoryId. 
  // The user didn't mention Categories in MVP. 
  // We can just create a dummy category in the service or make categoryId optional in prisma. 
  // I'll make it optional in the schema input and handle it in service.
  level: z.nativeEnum(CourseLevel).default(CourseLevel.BEGINNER),
  durationValue: z.number().int().nullable().optional(),
  durationUnit: z.nativeEnum(DurationUnit).nullable().optional(),
  learningHours: z.number().int().nullable().optional(),
  standardPrice: z.number().nullable().optional(),
  discountedPrice: z.number().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
  description: z.string().default(''), // Full description
  thumbnailUrl: z.string().nullable().optional(),
  brochureUrl: z.string().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;

export const updateCourseSchema = createCourseSchema.partial().extend({
  recordVersion: z.number().int(),
});

export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;

// Curriculum Editor schemas
export const courseTopicSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Topic title is required'),
  description: z.string().nullable().optional(),
  position: z.number().int(),
});

export const courseModuleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Module title is required'),
  description: z.string().nullable().optional(),
  position: z.number().int(),
  topics: z.array(courseTopicSchema).default([]),
});

export const updateCurriculumSchema = z.object({
  courseId: z.string().cuid(),
  recordVersion: z.number().int(),
  modules: z.array(courseModuleSchema),
});

export type UpdateCurriculumInput = z.infer<typeof updateCurriculumSchema>;

export const publishCourseSchema = z.object({
  id: z.string().cuid(),
});
