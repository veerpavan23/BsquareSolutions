import { prisma } from '@/lib/prisma';
import { Classroom, Prisma } from '@prisma/client';
import { ClassroomQueryOptions, CreateClassroomDto, UpdateClassroomDto } from './classroom.types';

export class ClassroomRepository {
  private mapClassroom(c: any) {
    if (!c) return null;
    let parsedFacilities: string[] = [];
    if (c.facilities) {
      try {
        parsedFacilities = JSON.parse(c.facilities);
      } catch (e) {
        parsedFacilities = c.facilities.split(',').map((f: string) => f.trim()).filter(Boolean);
      }
    }
    return {
      ...c,
      facilities: parsedFacilities,
    };
  }

  async findById(id: string, tx?: any) {
    const client = tx || prisma;
    const result = await client.classroom.findFirst({
      where: { id, deletedAt: null },
      include: { branch: true },
    });
    return this.mapClassroom(result);
  }

  async isCodeAvailable(branchId: string, code: string, excludeId?: string): Promise<boolean> {
    const existing = await prisma.classroom.findFirst({
      where: {
        branchId,
        classroomCode: code.toUpperCase().trim(),
        deletedAt: null,
      },
    });
    if (existing && existing.id !== excludeId) {
      return false;
    }
    return true;
  }

  async findMany(query: ClassroomQueryOptions) {
    const {
      search,
      branchId,
      isActive,
      capacityMin,
      capacityMax,
      includeArchived = false,
      sortBy = 'classroomCode',
      sortOrder = 'asc',
      limit,
      offset,
    } = query;

    const where: Prisma.ClassroomWhereInput = {};

    if (!includeArchived) {
      where.deletedAt = null;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (capacityMin !== undefined || capacityMax !== undefined) {
      where.capacity = {};
      if (capacityMin !== undefined) {
        where.capacity.gte = capacityMin;
      }
      if (capacityMax !== undefined) {
        where.capacity.lte = capacityMax;
      }
    }

    if (search) {
      where.OR = [
        { classroomCode: { contains: search } },
        { classroomName: { contains: search } },
        { branch: { branchName: { contains: search } } },
      ];
    }

    const orderBy: Prisma.ClassroomOrderByWithRelationInput = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.classroomCode = 'asc';
    }

    const list = await prisma.classroom.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
      include: { branch: true },
    });

    return list.map((c) => this.mapClassroom(c));
  }

  async count(query: ClassroomQueryOptions): Promise<number> {
    const {
      search,
      branchId,
      isActive,
      capacityMin,
      capacityMax,
      includeArchived = false,
    } = query;

    const where: Prisma.ClassroomWhereInput = {};

    if (!includeArchived) {
      where.deletedAt = null;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (branchId) {
      where.branchId = branchId;
    }

    if (capacityMin !== undefined || capacityMax !== undefined) {
      where.capacity = {};
      if (capacityMin !== undefined) {
        where.capacity.gte = capacityMin;
      }
      if (capacityMax !== undefined) {
        where.capacity.lte = capacityMax;
      }
    }

    if (search) {
      where.OR = [
        { classroomCode: { contains: search } },
        { classroomName: { contains: search } },
        { branch: { branchName: { contains: search } } },
      ];
    }

    return await prisma.classroom.count({ where });
  }

  async create(data: CreateClassroomDto, tx?: any) {
    const client = tx || prisma;
    const result = await client.classroom.create({
      data: {
        branchId: data.branchId,
        classroomCode: data.classroomCode.toUpperCase().trim(),
        classroomName: data.classroomName.trim(),
        capacity: data.capacity,
        floor: data.floor,
        facilities: data.facilities ? JSON.stringify(data.facilities) : null,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
    return this.mapClassroom(result);
  }

  async update(id: string, expectedVersion: number, data: UpdateClassroomDto, tx?: any) {
    const client = tx || prisma;

    const classroom = await client.classroom.findFirst({
      where: { id, deletedAt: null },
    });
    if (!classroom) {
      throw new Error('Classroom not found');
    }
    if (classroom.recordVersion !== expectedVersion) {
      throw new Error('STALE_RECORD');
    }

    const updateData: Prisma.ClassroomUpdateInput = {};
    if (data.branchId) {
      updateData.branch = { connect: { id: data.branchId } };
    }
    if (data.classroomCode) updateData.classroomCode = data.classroomCode.toUpperCase().trim();
    if (data.classroomName) updateData.classroomName = data.classroomName.trim();
    if (data.capacity !== undefined) updateData.capacity = data.capacity;
    if (data.floor !== undefined) updateData.floor = data.floor;
    if (data.facilities !== undefined) {
      updateData.facilities = data.facilities ? JSON.stringify(data.facilities) : null;
    }
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    updateData.recordVersion = { increment: 1 };

    const result = await client.classroom.update({
      where: { id },
      data: updateData,
    });
    return this.mapClassroom(result);
  }

  async archive(id: string, expectedVersion: number, reason: string, tx?: any) {
    const client = tx || prisma;

    const classroom = await client.classroom.findFirst({
      where: { id, deletedAt: null },
    });
    if (!classroom) {
      throw new Error('Classroom not found');
    }
    if (classroom.recordVersion !== expectedVersion) {
      throw new Error('STALE_RECORD');
    }

    const result = await client.classroom.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
        recordVersion: { increment: 1 },
      },
    });
    return this.mapClassroom(result);
  }

  async restore(id: string, expectedVersion: number, tx?: any) {
    const client = tx || prisma;

    const classroom = await client.classroom.findFirst({
      where: { id },
    });
    if (!classroom) {
      throw new Error('Classroom not found');
    }
    if (classroom.recordVersion !== expectedVersion) {
      throw new Error('STALE_RECORD');
    }

    const result = await client.classroom.update({
      where: { id },
      data: {
        deletedAt: null,
        recordVersion: { increment: 1 },
      },
    });
    return this.mapClassroom(result);
  }

  async hasActiveOrUpcomingBatches(id: string): Promise<boolean> {
    const count = await prisma.batch.count({
      where: {
        classroomId: id,
        deletedAt: null,
        status: {
          notIn: ['COMPLETED', 'CANCELLED', 'ARCHIVED'],
        },
      },
    });
    return count > 0;
  }
}

export const classroomRepository = new ClassroomRepository();
