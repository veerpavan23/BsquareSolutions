import { describe, it, expect, beforeEach } from 'vitest';
import { prisma } from '../../../../tests/helpers/test-database';
import { classroomService } from '../classroom.service';
import { createBranchHelper, createClassroomHelper } from '../../../../tests/helpers/factories';

const testActor = {
  id: '',
  email: 'admin@example.test',
  roleName: 'Super Administrator'
};

describe('Classroom Service Integration Tests', () => {
  beforeEach(async () => {
    const adminUser = await prisma.adminUser.findUnique({ where: { email: 'admin@example.test' } });
    if (adminUser) {
      testActor.id = adminUser.id;
    }
  });

  it('should create a classroom under physical branch locations', async () => {
    const branch = await createBranchHelper({ branchType: 'TRAINING_CENTER', isHeadOffice: false });
    
    const room = await classroomService.createClassroom({
      branchId: branch.id,
      classroomCode: 'CR-101',
      classroomName: 'Seminar Hall A',
      capacity: 50,
      floor: 1,
      facilities: ['AC', 'WiFi', 'Smart TV']
    }, testActor);

    expect(room).toBeDefined();
    expect(room.classroomCode).toBe('CR-101');
    expect(room.capacity).toBe(50);
    expect(room.recordVersion).toBe(1);
  });

  it('should reject classroom assignments to ONLINE branch types', async () => {
    const onlineBranch = await prisma.branch.findUnique({ where: { branchCode: 'TEST-ONLINE' } });
    expect(onlineBranch).toBeDefined();

    await expect(
      classroomService.createClassroom({
        branchId: onlineBranch!.id,
        classroomCode: 'CR-VIRT',
        classroomName: 'Virtual Room',
        capacity: 100,
        floor: null,
        facilities: []
      }, testActor)
    ).rejects.toThrow(/Virtual\/ONLINE branches/);
  });

  it('should enforce branch-scoped classroom code uniqueness', async () => {
    const branch = await createBranchHelper({ isHeadOffice: false });
    await createClassroomHelper(branch.id, { classroomCode: 'CR-DUP' });

    // Adding same code to the same branch should fail
    await expect(
      classroomService.createClassroom({
        branchId: branch.id,
        classroomCode: 'cr-dup', // case-insensitive check
        classroomName: 'Another classroom',
        capacity: 25,
        floor: 1,
        facilities: []
      }, testActor)
    ).rejects.toThrow(/already exists within branch/);
  });

  it('should allow identical classroom codes under different branches', async () => {
    const branchA = await createBranchHelper({ isHeadOffice: false });
    const branchB = await createBranchHelper({ isHeadOffice: false });

    const roomA = await classroomService.createClassroom({
      branchId: branchA.id,
      classroomCode: 'CR-SAME',
      classroomName: 'Room A',
      capacity: 20,
      floor: 1,
      facilities: []
    }, testActor);

    const roomB = await classroomService.createClassroom({
      branchId: branchB.id,
      classroomCode: 'CR-SAME',
      classroomName: 'Room B',
      capacity: 35,
      floor: 2,
      facilities: []
    }, testActor);

    expect(roomA).toBeDefined();
    expect(roomB).toBeDefined();
    expect(roomA.id).not.toBe(roomB.id);
  });

  it('should reject capacity less than or equal to 0', async () => {
    const branch = await createBranchHelper({ isHeadOffice: false });

    await expect(
      classroomService.createClassroom({
        branchId: branch.id,
        classroomCode: 'CR-ZERO',
        classroomName: 'Zero room',
        capacity: 0,
        floor: 1,
        facilities: []
      }, testActor)
    ).rejects.toThrow();

    await expect(
      classroomService.createClassroom({
        branchId: branch.id,
        classroomCode: 'CR-NEG',
        classroomName: 'Negative room',
        capacity: -5,
        floor: 1,
        facilities: []
      }, testActor)
    ).rejects.toThrow();
  });

  it('should reject updates with a stale recordVersion', async () => {
    const branch = await createBranchHelper({ isHeadOffice: false });
    const room = await createClassroomHelper(branch.id);

    // Update once to increment version to 2
    await classroomService.updateClassroom(room.id, room.recordVersion, {
      classroomName: 'Renamed CR V2'
    }, testActor);

    // Stale update using version 1 should fail
    await expect(
      classroomService.updateClassroom(room.id, room.recordVersion, {
        classroomName: 'Renamed Stale'
      }, testActor)
    ).rejects.toThrow(/STALE_RECORD/);
  });
});
