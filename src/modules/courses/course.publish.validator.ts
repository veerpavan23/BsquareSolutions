import { CourseStatus } from '@prisma/client';
import { AdminCourseDto } from './course.types';
import { BusinessRuleError } from '@/lib/errors/errors';

export class CoursePublishValidator {
  /**
   * Validates if a course meets all requirements for publication.
   * Throws BusinessRuleError with specific details if validation fails.
   */
  static validateForPublishing(course: AdminCourseDto): void {
    const errors: string[] = [];

    // 1. Vertical exists
    if (!course.academyId) {
      errors.push('A valid Vertical must be assigned.');
    }

    // 2. Name/Title exists
    if (!course.title || course.title.trim().length === 0) {
      errors.push('Course name is required.');
    }

    // 3. Description exists
    if (!course.description || course.description.trim().length === 0) {
      errors.push('Course description is required.');
    }

    // 4. At least one curriculum module exists
    if (!course.modules || course.modules.length === 0) {
      errors.push('At least one curriculum module must be added.');
    }

    // 5. Banner or thumbnail exists
    if (!course.thumbnailUrl && !course.brochureUrl) { 
      // User said "Banner or thumbnail exists", Prisma schema has thumbnailUrl and brochureUrl.
      // Assuming thumbnailUrl is used for both.
      errors.push('A course thumbnail or banner image is required.');
    }

    if (errors.length > 0) {
      throw new BusinessRuleError(
        `Course cannot be published. Please resolve the following issues:\n- ${errors.join('\n- ')}`
      );
    }
  }
}
