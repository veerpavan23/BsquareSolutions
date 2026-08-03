import { describe, it, expect, beforeEach } from 'vitest';
import { prisma } from '../../../../tests/helpers/test-database';
import { branchService } from '../branch.service';
import { createBranchHelper, createClassroomHelper } from '../../../../tests/helpers/factories';

const testActor = {
  id: '',
  email: 'admin@example.test',
  roleName: 'Super Administrator'
};

describe('Branch Service Integration Tests', () => {
  beforeEach(async () => {
    const adminUser = await prisma.adminUser.findUnique({ where: { email: 'admin@example.test' } });
    if (adminUser) {
      testActor.id = adminUser.id;
    }
  });

  it('should create a valid branch', async () => {
    const branch = await branchService.createBranch({
      branchCode: 'NEW-BR1',
      branchName: 'New Test Branch',
      slug: 'new-test-branch',
      branchType: 'TRAINING_CENTER',
      addressLine1: 'Test Address Line 1',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      phone: '+91 99999 88888',
      email: 'newbranch@test.com',
    }, testActor);

    expect(branch).toBeDefined();
    expect(branch.branchCode).toBe('NEW-BR1');
    expect(branch.isActive).toBe(true);
    expect(branch.recordVersion).toBe(1);
  });

  it('should reject creating a duplicate branchCode', async () => {
    await createBranchHelper({ branchCode: 'DUPLICATE-BR' });

    await expect(
      branchService.createBranch({
        branchCode: 'duplicate-br', // case-insensitive check
        branchName: 'Another Name',
        slug: 'another-slug-code',
        branchType: 'TRAINING_CENTER',
        addressLine1: 'Test Road',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500081',
        phone: '+91 99999 88888',
        email: 'another@test.com',
      }, testActor)
    ).rejects.toThrow(/already registered/);
  });

  it('should reject creating a duplicate slug', async () => {
    await createBranchHelper({ slug: 'duplicate-slug' });

    await expect(
      branchService.createBranch({
        branchCode: 'OTHER-CODE',
        branchName: 'Another Name',
        slug: 'DUPLICATE-SLUG', // case-insensitive check
        branchType: 'TRAINING_CENTER',
        addressLine1: 'Test Road',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500081',
        phone: '+91 99999 88888',
        email: 'another@test.com',
      }, testActor)
    ).rejects.toThrow(/already registered/);
  });

  it('should transfer Head Office status transactionally', async () => {
    // Current HQ (from baseline TEST-HQ)
    const oldHQ = await prisma.branch.findUnique({ where: { branchCode: 'TEST-HQ' } });
    expect(oldHQ?.isHeadOffice).toBe(true);

    // Create a new branch and set as HQ
    const newHQ = await branchService.createBranch({
      branchCode: 'NEW-HQ',
      branchName: 'New HQ Office',
      slug: 'new-hq-office',
      branchType: 'HEAD_OFFICE',
      addressLine1: '456 HQ St',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500081',
      phone: '+91 90000 11111',
      email: 'newhq@test.com',
      isHeadOffice: true,
    }, testActor);

    expect(newHQ.isHeadOffice).toBe(true);

    // Verify old HQ has been demoted
    const oldHQUpdated = await prisma.branch.findUnique({ where: { branchCode: 'TEST-HQ' } });
    expect(oldHQUpdated?.isHeadOffice).toBe(false);
  });

  it('should prevent archiving the active Head Office branch', async () => {
    const hq = await prisma.branch.findUnique({ where: { branchCode: 'TEST-HQ' } });
    expect(hq).toBeDefined();

    await expect(
      branchService.archiveBranch(hq!.id, hq!.recordVersion, 'Need to close HQ', testActor)
    ).rejects.toThrow(/Head Office branch/);
  });

  it('should prevent archiving a branch containing classroom dependencies', async () => {
    const branch = await createBranchHelper({ isHeadOffice: false });
    await createClassroomHelper(branch.id);

    await expect(
      branchService.archiveBranch(branch.id, branch.recordVersion, 'Renovation closure', testActor)
    ).rejects.toThrow(/has active classrooms/);
  });

  it('should reject updating with a stale recordVersion', async () => {
    const branch = await createBranchHelper();
    
    // Perform an update to increment version to 2
    await branchService.updateBranch(branch.id, branch.recordVersion, {
      branchName: 'Updated Name V2',
    }, testActor);

    // Attempting update with version 1 should fail with STALE_RECORD
    await expect(
      branchService.updateBranch(branch.id, branch.recordVersion, {
        branchName: 'Stale Update Attempt',
      }, testActor)
    ).rejects.toThrow(/STALE_RECORD/);
  });
});
