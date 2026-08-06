import { Prisma, PublishStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { AcademyFilter } from './academy.types';

export class AcademyRepository {
  async findById(id: string) {
    return prisma.academy.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.academy.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
    });
  }

  async findMany(filter?: AcademyFilter) {
    const where: Prisma.AcademyWhereInput = {
      deletedAt: null,
    };

    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { slug: { contains: filter.search } },
      ];
    }

    if (filter?.publishStatus) {
      where.publishStatus = filter.publishStatus;
    }

    if (filter?.isActive !== undefined) {
      where.isActive = filter.isActive;
    }

    if (filter?.isFeatured !== undefined) {
      where.isFeatured = filter.isFeatured;
    }

    const page = filter?.page || 1;
    const pageSize = filter?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const [items, total] = await Promise.all([
      prisma.academy.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      }),
      prisma.academy.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async create(data: Prisma.AcademyCreateInput) {
    return prisma.academy.create({
      data,
    });
  }

  async update(id: string, data: Prisma.AcademyUpdateInput, recordVersion: number) {
    return prisma.academy.update({
      where: {
        id,
        recordVersion, // Optimistic concurrency control
      },
      data: {
        ...data,
        recordVersion: {
          increment: 1,
        },
      },
    });
  }

  async softDelete(id: string) {
    return prisma.academy.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string) {
    return prisma.academy.update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}
