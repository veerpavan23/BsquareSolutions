import { z } from 'zod';

export const roleCreateSchema = z.object({
  name: z.string().trim().min(3, 'Role name must be at least 3 characters'),
  description: z.string().trim().optional().or(z.null()),
  isActive: z.boolean().default(true),
});

export const roleUpdateSchema = roleCreateSchema.partial();

export const rolePermissionUpdateSchema = z.object({
  permissionIds: z.array(z.string()),
  reason: z.string().trim().min(5, 'A reason of at least 5 characters is required for sensitive updates'),
});
