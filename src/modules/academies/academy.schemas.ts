import { z } from 'zod';
import { PublishStatus } from '@prisma/client';

export const createAcademySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  shortDescription: z.string().nullable().optional(),
  fullDescription: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  thumbnail: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  displayOrder: z.number().int().default(0),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  publishStatus: z.nativeEnum(PublishStatus).default(PublishStatus.DRAFT),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  openGraphImage: z.string().nullable().optional(),
});

export type CreateAcademyInput = z.infer<typeof createAcademySchema>;

export const updateAcademySchema = createAcademySchema.partial().extend({
  recordVersion: z.number().int(),
});

export type UpdateAcademyInput = z.infer<typeof updateAcademySchema>;

export const publishAcademySchema = z.object({
  id: z.string().cuid(),
});
