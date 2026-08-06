import { Academy, PublishStatus } from '@prisma/client';

export type AdminAcademyDto = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  icon: string | null;
  thumbnail: string | null;
  banner: string | null;
  displayOrder: number;
  isFeatured: boolean;
  isActive: boolean;
  publishStatus: PublishStatus;
  metaTitle: string | null;
  metaDescription: string | null;
  openGraphImage: string | null;
  recordVersion: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicAcademyDto = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  icon: string | null;
  thumbnail: string | null;
  banner: string | null;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  openGraphImage: string | null;
};

export interface AcademyFilter {
  search?: string;
  publishStatus?: PublishStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  page?: number;
  pageSize?: number;
}
