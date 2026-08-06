'use server';

import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/modules/auth/permissions';
import { AcademyService } from './academy.service';
import {
  createAcademySchema,
  updateAcademySchema,
  publishAcademySchema,
  CreateAcademyInput,
  UpdateAcademyInput
} from './academy.schemas';
import { AcademyFilter } from './academy.types';
import { ActionResult, handleActionError, AppError } from '@/lib/errors/errors';
import { Academy } from '@prisma/client';

const academyService = new AcademyService();

export async function revalidateAcademies() {
  revalidatePath('/admin/verticals');
  revalidatePath('/verticals');
  revalidatePath('/'); // Homepage might show featured verticals
}

export async function revalidateAcademy(slug: string) {
  revalidatePath(`/verticals/${slug}`);
}

export async function getAcademiesAction(
  filters?: AcademyFilter
): Promise<ActionResult<{ items: Academy[]; total: number; page: number; pageSize: number; totalPages: number }>> {
  try {
    await requirePermission('academy.view');
    const result = await academyService.list(filters);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getAcademyAction(id: string): Promise<ActionResult<Academy>> {
  try {
    await requirePermission('academy.view');
    const result = await academyService.getById(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function createAcademyAction(data: CreateAcademyInput): Promise<ActionResult<Academy>> {
  try {
    const actor = await requirePermission('academy.create');
    const parsedData = createAcademySchema.parse(data);
    const result = await academyService.create(parsedData, actor.id, actor.email);
    
    await revalidateAcademies();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateAcademyAction(
  id: string,
  expectedVersion: number,
  data: Omit<UpdateAcademyInput, 'recordVersion'>
): Promise<ActionResult<Academy>> {
  try {
    const actor = await requirePermission('academy.edit');
    const parsedData = updateAcademySchema.parse({ ...data, recordVersion: expectedVersion });
    
    const result = await academyService.update(id, parsedData, actor.id, actor.email);
    
    await revalidateAcademies();
    await revalidateAcademy(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function publishAcademyAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Academy>> {
  try {
    const actor = await requirePermission('academy.publish');
    const parsed = publishAcademySchema.parse({ id });
    const result = await academyService.publish(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateAcademies();
    await revalidateAcademy(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function unpublishAcademyAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Academy>> {
  try {
    const actor = await requirePermission('academy.publish');
    const parsed = publishAcademySchema.parse({ id });
    const result = await academyService.unpublish(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateAcademies();
    await revalidateAcademy(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function archiveAcademyAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Academy>> {
  try {
    const actor = await requirePermission('academy.archive');
    const parsed = publishAcademySchema.parse({ id });
    const result = await academyService.archive(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateAcademies();
    await revalidateAcademy(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function restoreAcademyAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Academy>> {
  try {
    const actor = await requirePermission('academy.restore');
    const parsed = publishAcademySchema.parse({ id });
    const result = await academyService.restore(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateAcademies();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}
