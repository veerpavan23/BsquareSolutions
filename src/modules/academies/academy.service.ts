import { PublishStatus } from '@prisma/client';
import { AcademyRepository } from './academy.repository';
import { CreateAcademyInput, UpdateAcademyInput } from './academy.schemas';
import { AcademyFilter } from './academy.types';
import { BusinessRuleError } from '@/lib/errors/errors';
import { AuditService } from '@/modules/audit/audit.service';


const repository = new AcademyRepository();
const auditService = new AuditService();

export class AcademyService {
  private formatSlug(input: string): string {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  async getById(id: string) {
    const academy = await repository.findById(id);
    if (!academy) {
      throw new BusinessRuleError('Vertical not found', 'NOT_FOUND');
    }
    return academy;
  }

  async getBySlug(slug: string) {
    const academy = await repository.findBySlug(slug);
    if (!academy) {
      throw new BusinessRuleError('Vertical not found', 'NOT_FOUND');
    }
    return academy;
  }

  async list(filter?: AcademyFilter) {
    return repository.findMany(filter);
  }

  async create(data: CreateAcademyInput, actorId: string, actorEmail: string) {
    // Validation: Slug uniqueness
    const slug = this.formatSlug(data.slug || data.name);
    const existing = await repository.findBySlug(slug);
    if (existing) {
      throw new BusinessRuleError(`A Vertical with slug "${slug}" already exists.`, 'CONFLICT');
    }

    const academy = await repository.create({
      name: data.name,
      slug,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      icon: data.icon,
      thumbnail: data.thumbnail,
      banner: data.banner,
      displayOrder: data.displayOrder,
      isFeatured: data.isFeatured,
      isActive: data.isActive,
      publishStatus: PublishStatus.DRAFT,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      openGraphImage: data.openGraphImage,
    });

    await auditService.log({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'CREATE_RECORD',
      module: 'ACADEMIES',
      entityId: academy.id,
      entityLabel: academy.name,
    });

    return academy;
  }

  async update(id: string, data: UpdateAcademyInput, actorId: string, actorEmail: string) {
    const existing = await this.getById(id);

    // Validate slug uniqueness if slug changed
    if (data.slug && data.slug !== existing.slug) {
      const slug = this.formatSlug(data.slug);
      const duplicate = await repository.findBySlug(slug);
      if (duplicate && duplicate.id !== id) {
        throw new BusinessRuleError(`A Vertical with slug "${slug}" already exists.`, 'CONFLICT');
      }
      data.slug = slug;
    }

    const updated = await repository.update(id, data, data.recordVersion!);

    await auditService.log({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UPDATE_RECORD',
      module: 'ACADEMIES',
      entityId: updated.id,
      entityLabel: updated.name,
    });

    return updated;
  }

  async publish(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    const academy = await this.getById(id);

    // Publishing Rules
    if (!academy.name || !academy.slug || !academy.shortDescription || !academy.thumbnail) {
      throw new BusinessRuleError(
        'Vertical cannot be published. Missing required fields: Name, Slug, Short Description, or Thumbnail.',
        'VALIDATION_FAILED'
      );
    }

    const updated = await repository.update(
      id,
      { publishStatus: PublishStatus.PUBLISHED },
      recordVersion
    );

    await auditService.log({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UPDATE_RECORD',
      module: 'ACADEMIES',
      entityId: updated.id,
      entityLabel: updated.name,
      reason: 'Published Vertical',
    });

    return updated;
  }

  async unpublish(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    const updated = await repository.update(
      id,
      { publishStatus: PublishStatus.UNPUBLISHED },
      recordVersion
    );

    await auditService.log({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UPDATE_RECORD',
      module: 'ACADEMIES',
      entityId: updated.id,
      entityLabel: updated.name,
      reason: 'Unpublished Vertical',
    });

    return updated;
  }

  async archive(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    // Note: The user requested that if it has published courses, it shouldn't be archived. 
    // We can implement that check later or here if we have course repository.
    // For now, we update to ARCHIVED status.
    const updated = await repository.update(
      id,
      { publishStatus: PublishStatus.ARCHIVED },
      recordVersion
    );
    await repository.softDelete(id);

    await auditService.log({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'DELETE_RECORD',
      module: 'ACADEMIES',
      entityId: updated.id,
      entityLabel: updated.name,
      reason: 'Archived Vertical',
    });

    return updated;
  }

  async restore(id: string, recordVersion: number, actorId: string, actorEmail: string) {
    await repository.restore(id);
    const updated = await repository.update(
      id,
      { publishStatus: PublishStatus.DRAFT }, // Restore to draft
      recordVersion
    );

    await auditService.log({
      actorUserId: actorId,
      actorEmail: actorEmail,
      action: 'UPDATE_RECORD',
      module: 'ACADEMIES',
      entityId: updated.id,
      entityLabel: updated.name,
      reason: 'Restored Vertical',
    });

    return updated;
  }
}
