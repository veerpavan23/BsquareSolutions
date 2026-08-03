'use server';

import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/modules/auth/permissions';
import { classroomService } from './classroom.service';
import {
  classroomCreateSchema,
  classroomUpdateSchema,
  classroomFilterSchema,
  classroomArchiveSchema,
  classroomRestoreSchema,
} from './classroom.schemas';
import { ClassroomQueryOptions, CreateClassroomDto, UpdateClassroomDto } from './classroom.types';
import { ActionResult, handleActionError } from '@/lib/errors/errors';

export async function revalidateClassrooms() {
  revalidatePath('/admin/classrooms');
}

export async function revalidateClassroom(id: string) {
  revalidatePath(`/admin/classrooms/${id}`);
  revalidatePath(`/admin/classrooms/${id}/edit`);
}

export async function getClassroomsAction(
  filters: ClassroomQueryOptions
): Promise<ActionResult<{ list: any[]; count: number }>> {
  try {
    await requirePermission('classroom.view');
    const parsedFilters = classroomFilterSchema.parse(filters);
    const result = await classroomService.getClassroomList(parsedFilters);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getClassroomAction(id: string): Promise<ActionResult<any>> {
  try {
    await requirePermission('classroom.view');
    const result = await classroomService.getClassroomById(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function createClassroomAction(data: CreateClassroomDto): Promise<ActionResult<any>> {
  try {
    const actor = await requirePermission('classroom.create');
    const parsedData = classroomCreateSchema.parse(data);
    const result = await classroomService.createClassroom(parsedData, actor);
    
    await revalidateClassrooms();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateClassroomAction(
  id: string,
  expectedVersion: number,
  data: UpdateClassroomDto
): Promise<ActionResult<any>> {
  try {
    const actor = await requirePermission('classroom.edit');
    const parsedData = classroomUpdateSchema.parse({ ...data, recordVersion: expectedVersion });
    
    const { recordVersion, ...updatePayload } = parsedData;
    const result = await classroomService.updateClassroom(id, recordVersion, updatePayload, actor);
    
    await revalidateClassrooms();
    await revalidateClassroom(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function archiveClassroomAction(
  id: string,
  expectedVersion: number,
  reason: string
): Promise<ActionResult<any>> {
  try {
    const actor = await requirePermission('classroom.archive');
    const parsed = classroomArchiveSchema.parse({ recordVersion: expectedVersion, reason });
    const result = await classroomService.archiveClassroom(id, parsed.recordVersion, parsed.reason, actor);
    
    await revalidateClassrooms();
    await revalidateClassroom(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function restoreClassroomAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<any>> {
  try {
    const actor = await requirePermission('classroom.restore');
    const parsed = classroomRestoreSchema.parse({ recordVersion: expectedVersion });
    const result = await classroomService.restoreClassroom(id, parsed.recordVersion, actor);
    
    await revalidateClassrooms();
    await revalidateClassroom(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}
