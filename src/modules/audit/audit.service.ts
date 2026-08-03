import { AuditAction } from '@prisma/client';
import { auditRepository } from './audit.repository';

export class AuditService {
  async logEvent(data: {
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
    return await auditRepository.log(data, tx);
  }

  async viewLogs(
    actorUser: any,
    filters: {
      actorUserId?: string;
      module?: string;
      action?: AuditAction;
      limit?: number;
      offset?: number;
    }
  ) {
    const permissions = (actorUser.permissions || []) as string[];
    if (!permissions.includes('sensitive_data.export') && !permissions.includes('activity.view')) {
      throw new Error('Access denied: insufficient permissions to view audit trails.');
    }
    return await auditRepository.getLogs(filters);
  }
}
export const auditService = new AuditService();
