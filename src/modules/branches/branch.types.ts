import { Branch, BranchType } from '@prisma/client';

export interface BranchQueryOptions {
  search?: string;
  type?: BranchType;
  city?: string;
  state?: string;
  isActive?: boolean;
  isHeadOffice?: boolean;
  includeArchived?: boolean;
  sortBy?: 'branchCode' | 'branchName' | 'city' | 'displayOrder' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface CreateBranchDto {
  branchCode: string;
  branchName: string;
  slug: string;
  branchType: BranchType;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  district?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string;
  phone: string;
  alternatePhone?: string | null;
  email: string;
  timezone?: string;
  latitude?: number | null;
  longitude?: number | null;
  googleMapsUrl?: string | null;
  isHeadOffice?: boolean;
  isActive?: boolean;
  displayOrder?: number;
}

export interface UpdateBranchDto {
  branchCode?: string;
  branchName?: string;
  slug?: string;
  branchType?: BranchType;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  district?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string;
  phone?: string;
  alternatePhone?: string | null;
  email?: string;
  timezone?: string;
  latitude?: number | null;
  longitude?: number | null;
  googleMapsUrl?: string | null;
  isHeadOffice?: boolean;
  isActive?: boolean;
  displayOrder?: number;
}
