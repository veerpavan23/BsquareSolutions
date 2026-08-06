import { prisma } from '@/lib/prisma';
import { CourseStatus, Prisma } from '@prisma/client';
import { PublicCourseListDto, PublicCourseDetailDto } from '../courses/course.types';

export class CourseReadService {
  async getFeaturedCourses(): Promise<PublicCourseListDto[]> {
    const courses = await prisma.course.findMany({
      where: {
        status: CourseStatus.PUBLISHED,
        deletedAt: null,
        isFeatured: true,
      },
      include: {
        academy: {
          select: { name: true, slug: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
    
    return courses.map(this.mapToListDto);
  }

  async getAllActiveCourses(verticalSlug?: string): Promise<PublicCourseListDto[]> {
    const where: Prisma.CourseWhereInput = {
      status: CourseStatus.PUBLISHED,
      deletedAt: null,
    };

    if (verticalSlug) {
      where.academy = {
        slug: verticalSlug,
        publishStatus: 'PUBLISHED',
        deletedAt: null,
      };
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        academy: {
          select: { name: true, slug: true },
        },
      },
      orderBy: [{ isFeatured: 'desc' }, { title: 'asc' }],
    });

    return courses.map(this.mapToListDto);
  }

  async getCourseBySlug(slug: string): Promise<PublicCourseDetailDto | null> {
    const course = await prisma.course.findFirst({
      where: {
        slug,
        status: CourseStatus.PUBLISHED,
        deletedAt: null,
      },
      include: {
        academy: {
          select: { name: true, slug: true },
        },
        modules: {
          orderBy: { position: 'asc' },
          include: {
            topics: {
              orderBy: { position: 'asc' },
            },
          },
        },
      },
    });

    return course ? this.mapToDetailDto(course) : null;
  }

  private mapToListDto(course: any): PublicCourseListDto {
    return {
      id: course.id,
      code: course.code,
      title: course.title,
      slug: course.slug,
      shortDescription: course.shortDescription,
      level: course.level,
      durationValue: course.durationValue,
      durationUnit: course.durationUnit,
      standardPrice: course.standardPrice ? Number(course.standardPrice) : null,
      discountedPrice: course.discountedPrice ? Number(course.discountedPrice) : null,
      currency: course.currency,
      thumbnailUrl: course.thumbnailUrl,
      academy: {
        name: course.academy.name,
        slug: course.academy.slug,
      },
    };
  }

  private mapToDetailDto(course: any): PublicCourseDetailDto {
    return {
      ...this.mapToListDto(course),
      description: course.description,
      learningHours: course.learningHours,
      brochureUrl: course.brochureUrl,
      metaTitle: course.metaTitle,
      metaDescription: course.metaDescription,
      modules: course.modules.map((m: any) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        position: m.position,
        topics: m.topics.map((t: any) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          position: t.position,
        })),
      })),
    };
  }
}

export const courseReadService = new CourseReadService();
