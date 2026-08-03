import { classroomRepository } from './classroom.repository';
import { branchRepository } from '../branches/branch.repository';
import { auditService } from '../audit/audit.service';
import { AuditAction } from '@prisma/client';
import { ClassroomQueryOptions, CreateClassroomDto, UpdateClassroomDto } from './classroom.types';
import { ValidationError, ConflictError, BusinessRuleError, NotFoundError } from '@/lib/errors/errors';

export class ClassroomService {
  async getClassroomList(filters: ClassroomQueryOptions) {
    const list = await classroomRepository.findMany(filters);
    const count = await classroomRepository.count(filters);
    return { list, count };
  }

  async getClassroomById(id: string) {
    const classroom = await classroomRepository.findById(id);
    if (!classroom) {
      throw new NotFoundError('Classroom not found');
    }
    return classroom;
  }

  async validateClassroomCode(branchId: string, code: string, excludeId?: string): Promise<boolean> {
    return await classroomRepository.isCodeAvailable(branchId, code, excludeId);
  }

  private async validateBranchAssignment(branchId: string) {
    const branch = await branchRepository.findById(branchId);
    if (!branch) {
      throw new NotFoundError('Selected branch does not exist.');
    }
    if (branch.branchType === 'ONLINE') {
      throw new BusinessRuleError('Classrooms cannot be assigned to Virtual/ONLINE branches.');
    }
    if (!branch.isActive) {
      throw new BusinessRuleError('Classrooms cannot be assigned to an inactive branch.');
    }
    return branch;
  }

  async createClassroom(data: CreateClassroomDto, actor: any) {
    // Validate branch details on the server (never trust browser payload)
    const branch = await this.validateBranchAssignment(data.branchId);

    if (data.capacity === undefined || data.capacity <= 0) {
      throw new ValidationError('Seating capacity must be at least 1.');
    }

    const code = data.classroomCode.toUpperCase().trim();
    if (!(await this.validateClassroomCode(data.branchId, code))) {
      throw new ConflictError(`Classroom code '${code}' already exists within branch '${branch.branchName}'.`);
    }

    const newClassroom = await classroomRepository.create(data);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.CREATE_RECORD,
      module: 'classrooms',
      entityType: 'Classroom',
      entityId: newClassroom.id,
      entityLabel: `${branch.branchCode} - ${newClassroom.classroomName}`,
      newValue: newClassroom,
      success: true,
    });

    return newClassroom;
  }

  async updateClassroom(id: string, expectedVersion: number, data: UpdateClassroomDto, actor: any) {
    const existing = await classroomRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Classroom not found');
    }

    // Branch changed checks
    const targetBranchId = data.branchId || existing.branchId;
    const branch = await this.validateBranchAssignment(targetBranchId);

    if (data.capacity !== undefined && data.capacity <= 0) {
      throw new ValidationError('Seating capacity must be at least 1.');
    }

    if (data.classroomCode || data.branchId) {
      const code = data.classroomCode || existing.classroomCode;
      if (!(await this.validateClassroomCode(targetBranchId, code, id))) {
        throw new ConflictError(`Classroom code '${code}' already exists within branch '${branch.branchName}'.`);
      }
    }

    const updatedClassroom = await classroomRepository.update(id, expectedVersion, data);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.UPDATE_RECORD,
      module: 'classrooms',
      entityType: 'Classroom',
      entityId: updatedClassroom.id,
      entityLabel: `${branch.branchCode} - ${updatedClassroom.classroomName}`,
      previousValue: existing,
      newValue: updatedClassroom,
      success: true,
    });

    return updatedClassroom;
  }

  async archiveClassroom(id: string, expectedVersion: number, reason: string, actor: any) {
    const existing = await classroomRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Classroom not found');
    }

    // Verify dependencies: classroom must not be assigned to active or upcoming batches
    if (await classroomRepository.hasActiveOrUpcomingBatches(id)) {
      throw new BusinessRuleError('This classroom cannot be archived because it has active or upcoming training batches scheduled.');
    }

    const archivedClassroom = await classroomRepository.archive(id, expectedVersion, reason);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.UPDATE_RECORD,
      module: 'classrooms',
      entityType: 'Classroom',
      entityId: id,
      entityLabel: existing.classroomName,
      previousValue: existing,
      newValue: archivedClassroom,
      reason: `Classroom Archived: ${reason}`,
      success: true,
    });

    return archivedClassroom;
  }

  async restoreClassroom(id: string, expectedVersion: number, actor: any) {
    const classroom = await classroomRepository.findById(id);
    if (!classroom) {
      throw new NotFoundError('Classroom not found');
    }

    // Branch must be active to restore classroom
    await this.validateBranchAssignment(classroom.branchId);

    const restoredClassroom = await classroomRepository.restore(id, expectedVersion);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.UPDATE_RECORD,
      module: 'classrooms',
      entityType: 'Classroom',
      entityId: id,
      entityLabel: classroom.classroomName,
      previousValue: classroom,
      newValue: restoredClassroom,
      reason: 'Classroom Restored',
      success: true,
    });

    return restoredClassroom;
  }
}

export const classroomService = new ClassroomService();
