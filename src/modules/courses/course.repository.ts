import { Prisma, CourseStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CourseFilter, AdminCourseDto } from './course.types';

export class CourseRepository {
  private includeRelations = {
    modules: {
      orderBy: { position: 'asc' as Prisma.SortOrder },
      include: {
        topics: {
          orderBy: { position: 'asc' as Prisma.SortOrder },
        },
      },
    },
    academy: {
      select: {
        id: true,
        name: true,
        slug: true,
      },
    },
  };

  /**
   * Ensures a default category exists for the academy and returns its ID.
   * This is a workaround since MVP does not include category management.
   */
  async getDefaultCategoryId(academyId: string): Promise<string> {
    const category = await prisma.courseCategory.findFirst({
      where: { academyId },
    });

    if (category) return category.id;

    const newCategory = await prisma.courseCategory.create({
      data: {
        name: 'General',
        slug: 'general',
        academyId,
      },
    });
    return newCategory.id;
  }

  async findById(id: string): Promise<AdminCourseDto | null> {
    return prisma.course.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: this.includeRelations,
    }) as unknown as Promise<AdminCourseDto | null>;
  }

  async findBySlug(slug: string): Promise<AdminCourseDto | null> {
    return prisma.course.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
      include: this.includeRelations,
    }) as unknown as Promise<AdminCourseDto | null>;
  }

  async findMany(filter?: CourseFilter) {
    const where: Prisma.CourseWhereInput = {
      deletedAt: null,
    };

    if (filter?.search) {
      where.OR = [
        { title: { contains: filter.search } },
        { code: { contains: filter.search } },
        { slug: { contains: filter.search } },
      ];
    }

    if (filter?.academyId) {
      where.academyId = filter.academyId;
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.isFeatured !== undefined) {
      where.isFeatured = filter.isFeatured;
    }

    const page = filter?.page || 1;
    const pageSize = filter?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ isFeatured: 'desc' }, { title: 'asc' }],
        include: this.includeRelations,
      }),
      prisma.course.count({ where }),
    ]);

    return {
      items: items as unknown as AdminCourseDto[],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async create(data: Omit<Prisma.CourseCreateInput, 'category'> & { categoryId: string }) {
    return prisma.course.create({
      data,
      include: this.includeRelations,
    });
  }

  async update(id: string, data: Prisma.CourseUpdateInput, recordVersion: number) {
    return prisma.course.update({
      where: {
        id,
        recordVersion,
      },
      data: {
        ...data,
        recordVersion: {
          increment: 1,
        },
      },
      include: this.includeRelations,
    });
  }

  async updateCurriculum(id: string, recordVersion: number, modules: any[]) {
    // We will do this in a transaction: delete existing modules, create new ones
    return prisma.$transaction(async (tx) => {
      // Optimistic concurrency check
      const course = await tx.course.findUnique({ where: { id, recordVersion } });
      if (!course) {
        throw new Error('Course not found or record version mismatch');
      }

      await tx.courseModule.deleteMany({
        where: { courseId: id },
      });

      for (const mod of modules) {
        const createdModule = await tx.courseModule.create({
          data: {
            courseId: id,
            title: mod.title,
            description: mod.description,
            position: mod.position,
          },
        });

        if (mod.topics && mod.topics.length > 0) {
          await tx.courseTopic.createMany({
            data: mod.topics.map((t: any) => ({
              moduleId: createdModule.id,
              title: t.title,
              description: t.description,
              position: t.position,
            })),
          });
        }
      }

      return tx.course.update({
        where: { id },
        data: {
          recordVersion: { increment: 1 },
        },
        include: this.includeRelations,
      });
    });
  }

  async softDelete(id: string) {
    return prisma.course.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return prisma.course.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
