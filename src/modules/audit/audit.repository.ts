import { prisma } from '@/lib/prisma';
import { AuditAction } from '@prisma/client';

export class AuditRepository {
  private serializeJson(val: any): string | null {
    if (val === undefined || val === null) return null;
    if (typeof val === 'string') return val;
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  }

  async log(data: {
    actorUserId?: string;
    actorEmail?: string;
    actorRole?: string;
    action: AuditAction;
    module: string;
    entityType?: string;
    entityId?: string;
    entityLabel?: string;
    previousValue?: any;
    newValue?: any;
    metadata?: any;
    reason?: string;
    ipAddress?: string;
    userAgent?: string;
    success?: boolean;
  }, tx?: any) {
    const client = tx || prisma;
    return await client.auditLog.create({
      data: {
        actorUserId: data.actorUserId,
        actorEmail: data.actorEmail,
        actorRole: data.actorRole,
        action: data.action,
        module: data.module,
        entityType: data.entityType,
        entityId: data.entityId,
        entityLabel: data.entityLabel,
        previousValue: this.serializeJson(data.previousValue),
        newValue: this.serializeJson(data.newValue),
        metadata: this.serializeJson(data.metadata),
        reason: data.reason,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        success: data.success ?? true,
      },
    });
  }

  async getLogs(filters: {
    actorUserId?: string;
    module?: string;
    action?: AuditAction;
    limit?: number;
    offset?: number;
  }) {
    return await prisma.auditLog.findMany({
      where: {
        actorUserId: filters.actorUserId,
        module: filters.module,
        action: filters.action,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: filters.limit ?? 50,
      skip: filters.offset ?? 0,
      include: {
        actor: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }
}
export const auditRepository = new AuditRepository();
