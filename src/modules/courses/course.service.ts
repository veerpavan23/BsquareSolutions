import { CourseStatus } from '@prisma/client';
import { CourseRepository } from './course.repository';
import { CreateCourseInput, UpdateCourseInput, UpdateCurriculumInput } from './course.schemas';
import { CourseFilter } from './course.types';
import { BusinessRuleError } from '@/lib/errors/errors';
import { AuditService } from '@/modules/audit/audit.service';
import { CoursePublishValidator } from './course.publish.validator';

const repository = new CourseRepository();
const auditService = new AuditService();

export class CourseService {
  private formatSlug(input: string): string {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  async getById(id: string) {
    const course = await repository.findById(id);
    if (!course) {
      throw new BusinessRuleError('Course not found');
    }
    return course;
  }

  async getBySlug(slug: string) {
    const course = await repository.findBySlug(slug);
    if (!course) {
      throw new BusinessRuleError('Course not found');
    }
    return course;
  }

  async list(filter?: CourseFilter) {
    return repository.findMany(filter);
  }

  async create(data: CreateCourseInput, actorId: string, actorEmail: string) {
    // Validation: Slug and Code uniqueness
    const slug = this.formatSlug(data.slug || data.title);
    const existingSlug = await repository.findBySlug(slug);
    if (existingSlug) {
      throw new BusinessRuleError(`A Course with slug "${slug}" already exists.`);
    }

    const { academyId, ...rest } = data;
    const categoryId = await repository.getDefaultCategoryId(academyId);

    const course = await repository.create({
      ...rest,
      slug,
      academyId: academyId,
      categoryId: categoryId,
      status: CourseStatus.DRAFT,
      currency: 'INR',
    });

    await auditService.logEvent({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'CREATE_RECORD',
      module: 'COURSES',
      entityId: course.id,
      entityLabel: course.title,
    });

    return course;
  }

  async update(id: string, data: UpdateCourseInput, actorId: string, actorEmail: string) {
    const existing = await this.getById(id);

    // Validate slug uniqueness if slug changed
    if (data.slug && data.slug !== existing.slug) {
      const slug = this.formatSlug(data.slug);
      const duplicate = await repository.findBySlug(slug);
      if (duplicate && duplicate.id !== id) {
        throw new BusinessRuleError(`A Course with slug "${slug}" already exists.`);
      }
      data.slug = slug;
    }

    const { academyId, recordVersion, ...rest } = data;
    const updateData: any = { ...rest };
    
    if (academyId && academyId !== existing.academy.id) {
      const categoryId = await repository.getDefaultCategoryId(academyId);
      updateData.academy = { connect: { id: academyId } };
      updateData.categoryId = categoryId;
    }

    const updated = await repository.update(id, updateData, recordVersion!);

    await auditService.logEvent({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UPDATE_RECORD',
      module: 'COURSES',
      entityId: updated.id,
      entityLabel: updated.title,
    });

    return updated;
  }

  async updateCurriculum(data: UpdateCurriculumInput, actorId: string, actorEmail: string) {
    const updated = await repository.updateCurriculum(data.courseId, data.recordVersion, data.modules);
    
    await auditService.logEvent({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UPDATE_RECORD',
      module: 'COURSES',
      entityId: updated.id,
      entityLabel: updated.title,
      reason: 'Updated Curriculum',
    });

    return updated;
  }

  async publish(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    const course = await this.getById(id);

    // Validate using the external validator
    CoursePublishValidator.validateForPublishing(course);

    const updated = await repository.update(
      id,
      { status: CourseStatus.PUBLISHED, publishedAt: new Date() },
      recordVersion
    );

    await auditService.logEvent({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'PUBLISH_COURSE',
      module: 'COURSES',
      entityId: updated.id,
      entityLabel: updated.title,
    });

    return updated;
  }

  async unpublish(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    const updated = await repository.update(
      id,
      { status: CourseStatus.UNPUBLISHED },
      recordVersion
    );

    await auditService.logEvent({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UNPUBLISH_COURSE',
      module: 'COURSES',
      entityId: updated.id,
      entityLabel: updated.title,
    });

    return updated;
  }

  async archive(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    const updated = await repository.update(
      id,
      { status: CourseStatus.ARCHIVED },
      recordVersion
    );
    await repository.softDelete(id);

    await auditService.logEvent({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'DELETE_RECORD',
      module: 'COURSES',
      entityId: updated.id,
      entityLabel: updated.title,
      reason: 'Archived Course',
    });

    return updated;
  }

  async restore(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    await repository.restore(id);
    const updated = await repository.update(
      id,
      { status: CourseStatus.DRAFT },
      recordVersion
    );

    await auditService.logEvent({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UPDATE_RECORD',
      module: 'COURSES',
      entityId: updated.id,
      entityLabel: updated.title,
      reason: 'Restored Course',
    });

    return updated;
  }
}
