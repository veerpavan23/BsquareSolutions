import { z } from 'zod';

export const classroomCreateSchema = z.object({
  branchId: z.string().trim().min(1, 'Branch assignment is required'),
  classroomCode: z.string().trim().min(2, 'Classroom code must be at least 2 characters').toUpperCase(),
  classroomName: z.string().trim().min(3, 'Classroom name must be at least 3 characters'),
  capacity: z.number().int().min(1, 'Capacity must be greater than zero'),
  floor: z.number().int().optional().or(z.null()),
  facilities: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export const classroomUpdateSchema = classroomCreateSchema.partial().extend({
  recordVersion: z.number().int(),
});

export const classroomFilterSchema = z.object({
  search: z.string().optional(),
  branchId: z.string().optional(),
  isActive: z.boolean().optional(),
  capacityMin: z.number().int().optional(),
  capacityMax: z.number().int().optional(),
  includeArchived: z.boolean().optional(),
  sortBy: z.enum(['classroomCode', 'classroomName', 'capacity', 'floor', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
});

export const classroomArchiveSchema = z.object({
  recordVersion: z.number().int(),
  reason: z.string().trim().min(5, 'A reason of at least 5 characters is required for archiving'),
});

export const classroomRestoreSchema = z.object({
  recordVersion: z.number().int(),
});
