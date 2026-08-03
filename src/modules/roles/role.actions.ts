'use server';

import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/modules/auth/permissions';
import { roleService } from './role.service';
import { roleCreateSchema, roleUpdateSchema, rolePermissionUpdateSchema } from './role.schemas';
import { CreateRoleDto, UpdateRoleDto } from './role.types';
import { ActionResult, handleActionError } from '@/lib/errors/errors';

export async function revalidateRoleMatrix(roleId: string) {
  revalidatePath('/admin/settings/roles');
  revalidatePath(`/admin/settings/roles/${roleId}`);
}

export async function revalidateAdminNavigation() {
  revalidatePath('/admin');
  revalidatePath('/admin/dashboard');
}

export async function getRolesAction(): Promise<ActionResult<any[]>> {
  try {
    await requirePermission('role.view');
    const result = await roleService.getRoleList();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getRolePermissionMatrixAction(roleId: string): Promise<ActionResult<any>> {
  try {
    await requirePermission('permission.view');
    const result = await roleService.getRolePermissionMatrix(roleId);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function createRoleAction(data: CreateRoleDto): Promise<ActionResult<any>> {
  try {
    const actor = await requirePermission('role.create');
    const parsedData = roleCreateSchema.parse(data);
    const result = await roleService.createRole(parsedData, actor);
    
    await revalidateRoleMatrix(result.id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateRoleAction(id: string, data: UpdateRoleDto): Promise<ActionResult<any>> {
  try {
    const actor = await requirePermission('role.edit');
    const parsedData = roleUpdateSchema.parse(data);
    const result = await roleService.updateRole(id, parsedData, actor);
    
    await revalidateRoleMatrix(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateRolePermissionsAction(
  roleId: string,
  permissionIds: string[],
  reason: string
): Promise<ActionResult<void>> {
  try {
    const actor = await requirePermission('permission.assign');
    const parsed = rolePermissionUpdateSchema.parse({ permissionIds, reason });
    await roleService.updateRolePermissions(roleId, parsed.permissionIds, parsed.reason, actor);
    
    await revalidateRoleMatrix(roleId);
    await revalidateAdminNavigation();
    return { success: true, data: undefined };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function archiveRoleAction(id: string, reason: string): Promise<ActionResult<any>> {
  try {
    const actor = await requirePermission('role.archive');
    const result = await roleService.archiveRole(id, reason, actor);
    
    await revalidateRoleMatrix(id);
    await revalidateAdminNavigation();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}
