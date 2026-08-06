import { prisma } from '@/lib/prisma';
import { PublishStatus } from '@prisma/client';
import { PublicAcademyDto } from '../academies/academy.types';

export class AcademyReadService {
  async getFeaturedVerticals(): Promise<PublicAcademyDto[]> {
    const academies = await prisma.academy.findMany({
      where: {
        publishStatus: PublishStatus.PUBLISHED,
        isActive: true,
        deletedAt: null,
        isFeatured: true,
      },
      orderBy: { displayOrder: 'asc' },
    });
    
    return academies.map(this.mapToPublicDto);
  }

  async getAllActiveVerticals(): Promise<PublicAcademyDto[]> {
    const academies = await prisma.academy.findMany({
      where: {
        publishStatus: PublishStatus.PUBLISHED,
        isActive: true,
        deletedAt: null,
      },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });

    return academies.map(this.mapToPublicDto);
  }

  async getVerticalBySlug(slug: string): Promise<PublicAcademyDto | null> {
    const academy = await prisma.academy.findFirst({
      where: {
        slug,
        publishStatus: PublishStatus.PUBLISHED,
        isActive: true,
        deletedAt: null,
      },
    });

    return academy ? this.mapToPublicDto(academy) : null;
  }

  private mapToPublicDto(academy: any): PublicAcademyDto {
    return {
      id: academy.id,
      name: academy.name,
      slug: academy.slug,
      shortDescription: academy.shortDescription,
      fullDescription: academy.fullDescription,
      icon: academy.icon,
      thumbnail: academy.thumbnail,
      banner: academy.banner,
      isFeatured: academy.isFeatured,
      metaTitle: academy.metaTitle,
      metaDescription: academy.metaDescription,
      openGraphImage: academy.openGraphImage,
    };
  }
}

export const academyReadService = new AcademyReadService();
