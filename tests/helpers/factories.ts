import { prisma } from './test-database';
import { BranchType, Branch, Classroom, AdminUser } from '@prisma/client';

export async function createBranchHelper(overrides: Partial<Branch> = {}): Promise<Branch> {
  const uniq = Math.random().toString(36).substring(2, 7);
  return await prisma.branch.create({
    data: {
      branchCode: overrides.branchCode || `BR-${uniq.toUpperCase()}`,
      branchName: overrides.branchName || `Branch Name ${uniq}`,
      slug: overrides.slug || `branch-name-${uniq}`,
      branchType: overrides.branchType || 'TRAINING_CENTER',
      addressLine1: overrides.addressLine1 !== undefined ? overrides.addressLine1 : '123 Test Road',
      addressLine2: overrides.addressLine2 || null,
      city: overrides.city !== undefined ? overrides.city : 'Hyderabad',
      district: overrides.district || null,
      state: overrides.state !== undefined ? overrides.state : 'Telangana',
      postalCode: overrides.postalCode !== undefined ? overrides.postalCode : '500081',
      country: overrides.country || 'India',
      phone: overrides.phone || '+91 90000 00000',
      alternatePhone: overrides.alternatePhone || null,
      email: overrides.email || `branch-${uniq}@test.com`,
      timezone: overrides.timezone || 'Asia/Kolkata',
      latitude: overrides.latitude || null,
      longitude: overrides.longitude || null,
      googleMapsUrl: overrides.googleMapsUrl || null,
      isHeadOffice: overrides.isHeadOffice || false,
      isActive: overrides.isActive !== undefined ? overrides.isActive : true,
      displayOrder: overrides.displayOrder || 0,
      recordVersion: overrides.recordVersion || 1,
    },
  });
}

export async function createClassroomHelper(
  branchId: string,
  overrides: Partial<Classroom> = {}
): Promise<Classroom> {
  const uniq = Math.random().toString(36).substring(2, 7);
  return await prisma.classroom.create({
    data: {
      branchId,
      classroomCode: overrides.classroomCode || `CR-${uniq.toUpperCase()}`,
      classroomName: overrides.classroomName || `Classroom ${uniq}`,
      capacity: overrides.capacity !== undefined ? overrides.capacity : 30,
      floor: overrides.floor !== undefined ? overrides.floor : 1,
      facilities: overrides.facilities || null,
      isActive: overrides.isActive !== undefined ? overrides.isActive : true,
      recordVersion: overrides.recordVersion || 1,
    },
  });
}
