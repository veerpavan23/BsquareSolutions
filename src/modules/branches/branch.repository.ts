import { prisma } from '@/lib/prisma';
import { Branch, Prisma } from '@prisma/client';
import { BranchQueryOptions, CreateBranchDto, UpdateBranchDto } from './branch.types';

export class BranchRepository {
  async findById(id: string, tx?: any): Promise<Branch | null> {
    const client = tx || prisma;
    return await client.branch.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findByCode(code: string, tx?: any): Promise<Branch | null> {
    const client = tx || prisma;
    return await client.branch.findFirst({
      where: { branchCode: code, deletedAt: null },
    });
  }

  async findBySlug(slug: string, tx?: any): Promise<Branch | null> {
    const client = tx || prisma;
    return await client.branch.findFirst({
      where: { slug, deletedAt: null },
    });
  }

  async findCurrentHeadOffice(tx?: any): Promise<Branch | null> {
    const client = tx || prisma;
    return await client.branch.findFirst({
      where: { isHeadOffice: true, isActive: true, deletedAt: null },
    });
  }

  async findMany(query: BranchQueryOptions): Promise<Branch[]> {
    const {
      search,
      type,
      city,
      state,
      isActive,
      isHeadOffice,
      includeArchived = false,
      sortBy = 'displayOrder',
      sortOrder = 'asc',
      limit,
      offset,
    } = query;

    const where: Prisma.BranchWhereInput = {};

    // Soft delete filter
    if (!includeArchived) {
      where.deletedAt = null;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (isHeadOffice !== undefined) {
      where.isHeadOffice = isHeadOffice;
    }

    if (type) {
      where.branchType = type;
    }

    if (city) {
      where.city = { contains: city };
    }

    if (state) {
      where.state = { contains: state };
    }

    if (search) {
      where.OR = [
        { branchCode: { contains: search } },
        { branchName: { contains: search } },
        { city: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const orderBy: Prisma.BranchOrderByWithRelationInput = {};
    if (sortBy) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.displayOrder = 'asc';
    }

    return await prisma.branch.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
      include: {
        _count: {
          select: { classrooms: true },
        },
      },
    });
  }

  async count(query: BranchQueryOptions): Promise<number> {
    const {
      search,
      type,
      city,
      state,
      isActive,
      isHeadOffice,
      includeArchived = false,
    } = query;

    const where: Prisma.BranchWhereInput = {};

    if (!includeArchived) {
      where.deletedAt = null;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (isHeadOffice !== undefined) {
      where.isHeadOffice = isHeadOffice;
    }

    if (type) {
      where.branchType = type;
    }

    if (city) {
      where.city = { contains: city };
    }

    if (state) {
      where.state = { contains: state };
    }

    if (search) {
      where.OR = [
        { branchCode: { contains: search } },
        { branchName: { contains: search } },
        { city: { contains: search } },
        { email: { contains: search } },
      ];
    }

    return await prisma.branch.count({ where });
  }

  async create(data: CreateBranchDto, tx?: any): Promise<Branch> {
    const client = tx || prisma;
    return await client.branch.create({
      data: {
        ...data,
        branchCode: data.branchCode.toUpperCase().trim(),
        slug: data.slug.toLowerCase().trim(),
      },
    });
  }

  async update(id: string, expectedVersion: number, data: UpdateBranchDto, tx?: any): Promise<Branch> {
    const client = tx || prisma;
    
    // Optimistic Concurrency Check
    const branch = await client.branch.findFirst({
      where: { id, deletedAt: null },
    });
    if (!branch) {
      throw new Error('Branch not found');
    }
    if (branch.recordVersion !== expectedVersion) {
      throw new Error('STALE_RECORD');
    }

    const updateData: Prisma.BranchUpdateInput = {};
    if (data.branchCode) updateData.branchCode = data.branchCode.toUpperCase().trim();
    if (data.branchName) updateData.branchName = data.branchName.trim();
    if (data.slug) updateData.slug = data.slug.toLowerCase().trim();
    if (data.branchType) updateData.branchType = data.branchType;
    
    if (data.addressLine1 !== undefined && data.addressLine1 !== null) updateData.addressLine1 = data.addressLine1;
    if (data.addressLine2 !== undefined) updateData.addressLine2 = data.addressLine2;
    if (data.city !== undefined && data.city !== null) updateData.city = data.city;
    if (data.district !== undefined) updateData.district = data.district;
    if (data.state !== undefined && data.state !== null) updateData.state = data.state;
    if (data.postalCode !== undefined && data.postalCode !== null) updateData.postalCode = data.postalCode;
    if (data.country !== undefined) updateData.country = data.country;
    
    if (data.phone) updateData.phone = data.phone;
    if (data.alternatePhone !== undefined) updateData.alternatePhone = data.alternatePhone;
    if (data.email) updateData.email = data.email;
    if (data.timezone) updateData.timezone = data.timezone;
    
    if (data.latitude !== undefined) updateData.latitude = data.latitude;
    if (data.longitude !== undefined) updateData.longitude = data.longitude;
    if (data.googleMapsUrl !== undefined) updateData.googleMapsUrl = data.googleMapsUrl;
    if (data.isHeadOffice !== undefined) updateData.isHeadOffice = data.isHeadOffice;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.displayOrder !== undefined) updateData.displayOrder = data.displayOrder;
    
    updateData.recordVersion = { increment: 1 };

    return await client.branch.update({
      where: { id },
      data: updateData,
    });
  }

  async archive(id: string, expectedVersion: number, reason: string, tx?: any): Promise<Branch> {
    const client = tx || prisma;

    // Optimistic Concurrency Check
    const branch = await client.branch.findFirst({
      where: { id, deletedAt: null },
    });
    if (!branch) {
      throw new Error('Branch not found');
    }
    if (branch.recordVersion !== expectedVersion) {
      throw new Error('STALE_RECORD');
    }

    return await client.branch.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
        recordVersion: { increment: 1 },
      },
    });
  }

  async restore(id: string, expectedVersion: number, tx?: any): Promise<Branch> {
    const client = tx || prisma;

    const branch = await client.branch.findFirst({
      where: { id },
    });
    if (!branch) {
      throw new Error('Branch not found');
    }
    if (branch.recordVersion !== expectedVersion) {
      throw new Error('STALE_RECORD');
    }

    return await client.branch.update({
      where: { id },
      data: {
        deletedAt: null,
        recordVersion: { increment: 1 },
      },
    });
  }

  async hasActiveClassrooms(id: string): Promise<boolean> {
    const count = await prisma.classroom.count({
      where: { branchId: id, deletedAt: null },
    });
    return count > 0;
  }

  async hasUpcomingBatches(id: string): Promise<boolean> {
    const count = await prisma.batch.count({
      where: {
        branchId: id,
        deletedAt: null,
        status: {
          notIn: ['COMPLETED', 'CANCELLED', 'ARCHIVED'],
        },
      },
    });
    return count > 0;
  }
}

export const branchRepository = new BranchRepository();
