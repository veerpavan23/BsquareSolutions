'use server';

import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/modules/auth/permissions';
import { branchService } from './branch.service';
import {
  branchCreateSchema,
  branchUpdateSchema,
  branchFilterSchema,
  branchArchiveSchema,
  branchRestoreSchema,
} from './branch.schemas';
import { BranchQueryOptions, CreateBranchDto, UpdateBranchDto } from './branch.types';
import { ActionResult, handleActionError, AppError } from '@/lib/errors/errors';
import { Branch } from '@prisma/client';

export async function revalidateBranches() {
  revalidatePath('/admin/branches');
  revalidatePath('/admin/dashboard');
}

export async function revalidateBranch(id: string) {
  revalidatePath(`/admin/branches/${id}`);
  revalidatePath(`/admin/branches/${id}/edit`);
}

export async function getBranchesAction(
  filters: BranchQueryOptions
): Promise<ActionResult<{ list: Branch[]; count: number }>> {
  try {
    await requirePermission('branch.view');
    const parsedFilters = branchFilterSchema.parse(filters);
    const result = await branchService.getBranchList(parsedFilters);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getBranchAction(id: string): Promise<ActionResult<Branch>> {
  try {
    await requirePermission('branch.view');
    const result = await branchService.getBranchById(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function createBranchAction(data: CreateBranchDto): Promise<ActionResult<Branch>> {
  try {
    const actor = await requirePermission('branch.create');
    const parsedData = branchCreateSchema.parse(data);
    const result = await branchService.createBranch(parsedData, actor);
    
    await revalidateBranches();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateBranchAction(
  id: string,
  expectedVersion: number,
  data: UpdateBranchDto
): Promise<ActionResult<Branch>> {
  try {
    const actor = await requirePermission('branch.edit');
    const parsedData = branchUpdateSchema.parse({ ...data, recordVersion: expectedVersion });
    
    // Extract version and separate payload
    const { recordVersion, ...updatePayload } = parsedData;
    const result = await branchService.updateBranch(id, recordVersion, updatePayload, actor);
    
    await revalidateBranches();
    await revalidateBranch(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function archiveBranchAction(
  id: string,
  expectedVersion: number,
  reason: string
): Promise<ActionResult<Branch>> {
  try {
    const actor = await requirePermission('branch.archive');
    const parsed = branchArchiveSchema.parse({ recordVersion: expectedVersion, reason });
    const result = await branchService.archiveBranch(id, parsed.recordVersion, parsed.reason, actor);
    
    await revalidateBranches();
    await revalidateBranch(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function restoreBranchAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Branch>> {
  try {
    const actor = await requirePermission('branch.restore');
    const parsed = branchRestoreSchema.parse({ recordVersion: expectedVersion });
    const result = await branchService.restoreBranch(id, parsed.recordVersion, actor);
    
    await revalidateBranches();
    await revalidateBranch(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}
