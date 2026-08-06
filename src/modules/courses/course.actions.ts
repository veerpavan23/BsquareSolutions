'use server';

import { revalidatePath } from 'next/cache';
import { requirePermission } from '@/modules/auth/permissions';
import { CourseService } from './course.service';
import {
  createCourseSchema,
  updateCourseSchema,
  updateCurriculumSchema,
  publishCourseSchema,
  CreateCourseInput,
  UpdateCourseInput,
  UpdateCurriculumInput
} from './course.schemas';
import { CourseFilter, AdminCourseDto } from './course.types';
import { ActionResult, handleActionError, AppError } from '@/lib/errors/errors';
import { Course } from '@prisma/client';

const courseService = new CourseService();

export async function revalidateCourses() {
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  revalidatePath('/'); // Homepage features
}

export async function revalidateCourse(slug: string) {
  revalidatePath(`/courses/${slug}`);
  // Also vertical page since it lists courses
  revalidatePath('/verticals');
}

export async function getCoursesAction(
  filters?: CourseFilter
): Promise<ActionResult<{ items: AdminCourseDto[]; total: number; page: number; pageSize: number; totalPages: number }>> {
  try {
    await requirePermission('course.view');
    const result = await courseService.list(filters);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getCourseAction(id: string): Promise<ActionResult<AdminCourseDto>> {
  try {
    await requirePermission('course.view');
    const result = await courseService.getById(id);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function createCourseAction(data: CreateCourseInput): Promise<ActionResult<Course>> {
  try {
    const actor = await requirePermission('course.create');
    const parsedData = createCourseSchema.parse(data);
    const result = await courseService.create(parsedData, actor.id, actor.email);
    
    await revalidateCourses();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateCourseAction(
  id: string,
  expectedVersion: number,
  data: Omit<UpdateCourseInput, 'recordVersion'>
): Promise<ActionResult<Course>> {
  try {
    const actor = await requirePermission('course.edit');
    const parsedData = updateCourseSchema.parse({ ...data, recordVersion: expectedVersion });
    
    const result = await courseService.update(id, parsedData, actor.id, actor.email);
    
    await revalidateCourses();
    await revalidateCourse(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateCourseCurriculumAction(
  data: Omit<UpdateCurriculumInput, 'courseId' | 'recordVersion'> & { courseId: string, expectedVersion: number }
): Promise<ActionResult<Course>> {
  try {
    const actor = await requirePermission('course.edit');
    const parsedData = updateCurriculumSchema.parse({ 
      courseId: data.courseId, 
      recordVersion: data.expectedVersion,
      modules: data.modules 
    });
    
    const result = await courseService.updateCurriculum(parsedData, actor.id, actor.email);
    
    await revalidateCourses();
    await revalidateCourse(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function publishCourseAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Course>> {
  try {
    const actor = await requirePermission('course.publish');
    const parsed = publishCourseSchema.parse({ id });
    const result = await courseService.publish(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateCourses();
    await revalidateCourse(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function unpublishCourseAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Course>> {
  try {
    const actor = await requirePermission('course.unpublish');
    const parsed = publishCourseSchema.parse({ id });
    const result = await courseService.unpublish(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateCourses();
    await revalidateCourse(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function archiveCourseAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Course>> {
  try {
    const actor = await requirePermission('course.archive');
    const parsed = publishCourseSchema.parse({ id });
    const result = await courseService.archive(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateCourses();
    await revalidateCourse(result.slug);
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function restoreCourseAction(
  id: string,
  expectedVersion: number
): Promise<ActionResult<Course>> {
  try {
    const actor = await requirePermission('course.restore');
    const parsed = publishCourseSchema.parse({ id });
    const result = await courseService.restore(parsed.id, expectedVersion, actor.id, actor.email);
    
    await revalidateCourses();
    return { success: true, data: result };
  } catch (error) {
    return handleActionError(error);
  }
}
