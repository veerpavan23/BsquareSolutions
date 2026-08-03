import { Role, Permission, RolePermission } from '@prisma/client';

export interface CreateRoleDto {
  name: string;
  description?: string | null;
  isSystemRole?: boolean;
  isProtected?: boolean;
  isActive?: boolean;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string | null;
  isActive?: boolean;
}

export interface PermissionDto {
  id: string;
  code: string;
  description?: string | null;
}

export interface RolePermissionMatrixRow {
  permission: PermissionDto;
  assignedRoles: string[]; // List of roleIds possessing this permission
}
