import { z } from 'zod';

const branchTypeEnum = z.enum(['HEAD_OFFICE', 'TRAINING_CENTER', 'ONLINE', 'CORPORATE_OFFICE', 'PARTNER_CENTER']);

const branchBaseSchema = z.object({
  branchCode: z.string().trim().min(2, 'Branch code must be at least 2 characters').toUpperCase(),
  branchName: z.string().trim().min(3, 'Branch name must be at least 3 characters'),
  slug: z
    .string()
    .trim()
    .min(3, 'Slug must be at least 3 characters')
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, 'Slug must be URL-safe (lowercase letters, numbers, and hyphens only)'),
  branchType: branchTypeEnum,
  addressLine1: z.string().trim().optional().or(z.null()).or(z.literal('')),
  addressLine2: z.string().trim().optional().or(z.null()).or(z.literal('')),
  city: z.string().trim().optional().or(z.null()).or(z.literal('')),
  district: z.string().trim().optional().or(z.null()).or(z.literal('')),
  state: z.string().trim().optional().or(z.null()).or(z.literal('')),
  postalCode: z.string().trim().optional().or(z.null()).or(z.literal('')),
  country: z.string().trim().default('India'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits'),
  alternatePhone: z.string().trim().optional().or(z.null()).or(z.literal('')),
  email: z.string().trim().email('Invalid email address'),
  timezone: z.string().trim().default('Asia/Kolkata'),
  latitude: z.number().min(-90).max(90).optional().or(z.null()),
  longitude: z.number().min(-180).max(180).optional().or(z.null()),
  googleMapsUrl: z.string().trim().optional().or(z.null()).or(z.literal('')),
  isHeadOffice: z.boolean().default(false),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

export const branchCreateSchema = branchBaseSchema.refine((data) => {
  if (data.branchType !== 'ONLINE') {
    return !!data.addressLine1 && !!data.city && !!data.state && !!data.postalCode;
  }
  return true;
}, {
  message: 'Physical branches must contain address, city, state, and postal code.',
  path: ['addressLine1'],
});

export const branchUpdateSchema = branchBaseSchema.partial().extend({
  recordVersion: z.number().int(),
});

export const branchFilterSchema = z.object({
  search: z.string().optional(),
  type: branchTypeEnum.optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  isActive: z.boolean().optional(),
  isHeadOffice: z.boolean().optional(),
  includeArchived: z.boolean().optional(),
  sortBy: z.enum(['branchCode', 'branchName', 'city', 'displayOrder', 'updatedAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  limit: z.number().int().optional(),
  offset: z.number().int().optional(),
});

export const branchArchiveSchema = z.object({
  recordVersion: z.number().int(),
  reason: z.string().trim().min(5, 'A reason of at least 5 characters is required for archiving'),
});

export const branchRestoreSchema = z.object({
  recordVersion: z.number().int(),
});
