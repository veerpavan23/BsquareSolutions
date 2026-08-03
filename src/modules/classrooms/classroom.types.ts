import { Classroom } from '@prisma/client';

export interface ClassroomQueryOptions {
  search?: string;
  branchId?: string;
  isActive?: boolean;
  capacityMin?: number;
  capacityMax?: number;
  includeArchived?: boolean;
  sortBy?: 'classroomCode' | 'classroomName' | 'capacity' | 'floor' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface CreateClassroomDto {
  branchId: string;
  classroomCode: string;
  classroomName: string;
  capacity: number;
  floor?: number | null;
  facilities?: string[] | null;
  isActive?: boolean;
}

export interface UpdateClassroomDto {
  branchId?: string;
  classroomCode?: string;
  classroomName?: string;
  capacity?: number;
  floor?: number | null;
  facilities?: string[] | null;
  isActive?: boolean;
}
