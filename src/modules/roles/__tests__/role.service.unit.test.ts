import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RoleService } from '../role.service';
import { roleRepository } from '../role.repository';
import { BusinessRuleError } from '@/lib/errors/errors';

vi.mock('../role.repository');
vi.mock('../../audit/audit.service');
vi.mock('@/lib/prisma');

const testActor = {
  id: 'admin-actor-id',
  email: 'admin@example.test',
  roleName: 'Super Administrator'
};

describe('Role Service Unit Tests', () => {
  let service: RoleService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new RoleService();
  });

  it('should reject archiving a role if it is system role', async () => {
    vi.mocked(roleRepository.findById).mockResolvedValue({
      id: 'system-role-id',
      name: 'System Admin',
      isSystemRole: true,
      isProtected: false,
    } as any);

    await expect(
      service.archiveRole('system-role-id', 'Obsolete system role', testActor)
    ).rejects.toThrow(BusinessRuleError);

    expect(roleRepository.archive).not.toHaveBeenCalled();
  });
});
