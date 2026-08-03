import { prisma } from '@/lib/prisma';
import { branchRepository } from './branch.repository';
import { auditService } from '../audit/audit.service';
import { Branch, AuditAction } from '@prisma/client';
import { BranchQueryOptions, CreateBranchDto, UpdateBranchDto } from './branch.types';
import { ValidationError, ConflictError, BusinessRuleError, NotFoundError } from '@/lib/errors/errors';

export class BranchService {
  async getBranchList(filters: BranchQueryOptions) {
    const list = await branchRepository.findMany(filters);
    const count = await branchRepository.count(filters);
    return { list, count };
  }

  async getBranchById(id: string): Promise<Branch> {
    const branch = await branchRepository.findById(id);
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }
    return branch;
  }

  private validateTimezone(timezone: string) {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: timezone });
    } catch (e) {
      throw new ValidationError(`Invalid IANA timezone identifier: ${timezone}`);
    }
  }

  async validateBranchCode(code: string, excludeId?: string): Promise<boolean> {
    const existing = await branchRepository.findByCode(code.toUpperCase().trim());
    if (existing && existing.id !== excludeId) {
      return false;
    }
    return true;
  }

  async validateBranchSlug(slug: string, excludeId?: string): Promise<boolean> {
    const existing = await branchRepository.findBySlug(slug.toLowerCase().trim());
    if (existing && existing.id !== excludeId) {
      return false;
    }
    return true;
  }

  async createBranch(data: CreateBranchDto, actor: any): Promise<Branch> {
    // Normalization & Checks
    const code = data.branchCode.toUpperCase().trim();
    const slug = data.slug.toLowerCase().trim();

    if (!(await this.validateBranchCode(code))) {
      throw new ConflictError(`Branch code '${code}' is already registered.`);
    }

    if (!(await this.validateBranchSlug(slug))) {
      throw new ConflictError(`Branch slug '${slug}' is already registered.`);
    }

    if (data.timezone) {
      this.validateTimezone(data.timezone);
    }

    // Execute in a transaction to handle Head Office auto-swap
    const newBranch = await prisma.$transaction(async (tx) => {
      if (data.isHeadOffice) {
        // Find existing head office and unset it
        const currentHeadOffice = await branchRepository.findCurrentHeadOffice(tx);
        if (currentHeadOffice) {
          await tx.branch.update({
            where: { id: currentHeadOffice.id },
            data: {
              isHeadOffice: false,
              recordVersion: { increment: 1 },
            },
          });

          // Log head office change
          await auditService.logEvent({
            actorUserId: actor.id,
            actorEmail: actor.email,
            actorRole: actor.roleName,
            action: AuditAction.UPDATE_RECORD,
            module: 'branches',
            entityType: 'Branch',
            entityId: currentHeadOffice.id,
            entityLabel: currentHeadOffice.branchName,
            previousValue: { isHeadOffice: true },
            newValue: { isHeadOffice: false },
            reason: `Head office reassigned to new branch code: ${code}`,
            success: true,
          }, tx);
        }
      }

      return await branchRepository.create(data, tx);
    });

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.CREATE_RECORD,
      module: 'branches',
      entityType: 'Branch',
      entityId: newBranch.id,
      entityLabel: newBranch.branchName,
      newValue: newBranch,
      success: true,
    });

    return newBranch;
  }

  async updateBranch(id: string, expectedVersion: number, data: UpdateBranchDto, actor: any): Promise<Branch> {
    const existing = await branchRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Branch not found');
    }

    // Unsaved Head Office change checks
    if (data.branchCode && !(await this.validateBranchCode(data.branchCode, id))) {
      throw new ConflictError(`Branch code '${data.branchCode}' is already registered.`);
    }
    if (data.slug && !(await this.validateBranchSlug(data.slug, id))) {
      throw new ConflictError(`Branch slug '${data.slug}' is already registered.`);
    }
    if (data.timezone) {
      this.validateTimezone(data.timezone);
    }

    // Head office deactivation rules
    if (existing.isHeadOffice) {
      if (data.isActive === false || data.isHeadOffice === false) {
        throw new BusinessRuleError('The active Head Office branch cannot be deactivated or unset unless another active physical branch is selected as its replacement first.');
      }
    }

    const updatedBranch = await prisma.$transaction(async (tx) => {
      if (data.isHeadOffice && !existing.isHeadOffice) {
        const currentHeadOffice = await branchRepository.findCurrentHeadOffice(tx);
        if (currentHeadOffice && currentHeadOffice.id !== id) {
          await tx.branch.update({
            where: { id: currentHeadOffice.id },
            data: {
              isHeadOffice: false,
              recordVersion: { increment: 1 },
            },
          });

          await auditService.logEvent({
            actorUserId: actor.id,
            actorEmail: actor.email,
            actorRole: actor.roleName,
            action: AuditAction.UPDATE_RECORD,
            module: 'branches',
            entityType: 'Branch',
            entityId: currentHeadOffice.id,
            entityLabel: currentHeadOffice.branchName,
            previousValue: { isHeadOffice: true },
            newValue: { isHeadOffice: false },
            reason: `Head office reassigned to branch code: ${data.branchCode || existing.branchCode}`,
            success: true,
          });
        }
      }

      return await branchRepository.update(id, expectedVersion, data, tx);
    });

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.UPDATE_RECORD,
      module: 'branches',
      entityType: 'Branch',
      entityId: updatedBranch.id,
      entityLabel: updatedBranch.branchName,
      previousValue: existing,
      newValue: updatedBranch,
      success: true,
    });

    return updatedBranch;
  }

  async archiveBranch(id: string, expectedVersion: number, reason: string, actor: any): Promise<Branch> {
    const existing = await branchRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Branch not found');
    }

    if (existing.isHeadOffice) {
      throw new BusinessRuleError('The active Head Office branch cannot be archived. Reassign the Head Office role to another active branch first.');
    }

    if (await branchRepository.hasActiveClassrooms(id)) {
      throw new BusinessRuleError('This branch cannot be archived because it has active classrooms assigned to it.');
    }

    if (await branchRepository.hasUpcomingBatches(id)) {
      throw new BusinessRuleError('This branch cannot be archived because it has active or upcoming training batches scheduled.');
    }

    const archivedBranch = await branchRepository.archive(id, expectedVersion, reason);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.UPDATE_RECORD,
      module: 'branches',
      entityType: 'Branch',
      entityId: id,
      entityLabel: existing.branchName,
      previousValue: existing,
      newValue: archivedBranch,
      reason: `Branch Archived: ${reason}`,
      success: true,
    });

    return archivedBranch;
  }

  async restoreBranch(id: string, expectedVersion: number, actor: any): Promise<Branch> {
    const branch = await prisma.branch.findFirst({
      where: { id },
    });
    if (!branch) {
      throw new NotFoundError('Branch not found');
    }

    const restoredBranch = await branchRepository.restore(id, expectedVersion);

    // Audit Log
    await auditService.logEvent({
      actorUserId: actor.id,
      actorEmail: actor.email,
      actorRole: actor.roleName,
      action: AuditAction.UPDATE_RECORD,
      module: 'branches',
      entityType: 'Branch',
      entityId: id,
      entityLabel: branch.branchName,
      previousValue: branch,
      newValue: restoredBranch,
      reason: 'Branch Restored',
      success: true,
    });

    return restoredBranch;
  }
}

export const branchService = new BranchService();
