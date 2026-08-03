import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClassroomService } from '../classroom.service';
import { classroomRepository } from '../classroom.repository';
import { branchRepository } from '../../branches/branch.repository';
import { NotFoundError } from '@/lib/errors/errors';

vi.mock('../classroom.repository');
vi.mock('../../branches/branch.repository');
vi.mock('../../audit/audit.service');
vi.mock('@/lib/prisma');

const testActor = {
  id: 'admin-actor-id',
  email: 'admin@example.test',
  roleName: 'Super Administrator'
};

describe('Classroom Service Unit Tests', () => {
  let service: ClassroomService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ClassroomService();
  });

  it('should reject creating classroom if parent branch does not exist', async () => {
    vi.mocked(branchRepository.findById).mockResolvedValue(null);

    await expect(
      service.createClassroom({
        branchId: 'non-existing-branch',
        classroomCode: 'CR-1',
        classroomName: 'Seminar room',
        capacity: 30,
        floor: 1,
        facilities: [],
      }, testActor)
    ).rejects.toThrow(NotFoundError);

    expect(classroomRepository.create).not.toHaveBeenCalled();
  });
});
