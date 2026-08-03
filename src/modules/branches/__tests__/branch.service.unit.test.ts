import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BranchService } from '../branch.service';
import { branchRepository } from '../branch.repository';
import { BusinessRuleError } from '@/lib/errors/errors';

vi.mock('../branch.repository');
vi.mock('../../audit/audit.service');
vi.mock('@/lib/prisma');

const testActor = {
  id: 'admin-actor-id',
  email: 'admin@example.test',
  roleName: 'Super Administrator'
};

describe('Branch Service Unit Tests', () => {
  let service: BranchService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new BranchService();
  });

  it('should validate and forward branch creation inputs to the repository', async () => {
    vi.mocked(branchRepository.findByCode).mockResolvedValue(null);
    vi.mocked(branchRepository.findBySlug).mockResolvedValue(null);
    vi.mocked(branchRepository.create).mockResolvedValue({ id: 'mock-id', branchCode: 'MOCK-1' } as any);

    const result = await service.createBranch({
      branchCode: 'MOCK-1',
      branchName: 'Mock Branch',
      slug: 'mock-1',
      branchType: 'TRAINING_CENTER',
      addressLine1: 'Road A',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      phone: '+91 99999 99999',
      email: 'mock@test.com',
    }, testActor);

    expect(result).toBeDefined();
    expect(result.id).toBe('mock-id');
    expect(branchRepository.create).toHaveBeenCalledOnce();
  });

  it('should throw BusinessRuleError on duplicate branchCode', async () => {
    vi.mocked(branchRepository.findByCode).mockResolvedValue({ id: 'exists-id', branchCode: 'MOCK-1' } as any);

    await expect(
      service.createBranch({
        branchCode: 'MOCK-1',
        branchName: 'Mock Branch',
        slug: 'mock-1',
        branchType: 'TRAINING_CENTER',
        addressLine1: 'Road A',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500081',
        phone: '+91 99999 99999',
        email: 'mock@test.com',
      }, testActor)
    ).rejects.toThrow(/already registered/);

    expect(branchRepository.create).not.toHaveBeenCalled();
  });
});
