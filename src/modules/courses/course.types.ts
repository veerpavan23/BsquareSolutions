import { Course, CourseStatus, CourseLevel, DurationUnit, CourseModule, CourseTopic } from '@prisma/client';

export type AdminCourseDto = Course & {
  modules: (CourseModule & { topics: CourseTopic[] })[];
  academy: {
    id: string;
    name: string;
    slug: string;
  };
};

export type PublicCourseListDto = {
  id: string;
  code: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  level: CourseLevel;
  durationValue: number | null;
  durationUnit: DurationUnit | null;
  standardPrice: number | null;
  discountedPrice: number | null;
  currency: string;
  thumbnailUrl: string | null;
  academy: {
    name: string;
    slug: string;
  };
  brochureUrl?: string | null;
};

export type PublicCourseDetailDto = PublicCourseListDto & {
  description: string;
  learningHours: number | null;
  brochureUrl: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  modules: {
    id: string;
    title: string;
    description: string | null;
    position: number;
    topics: {
      id: string;
      title: string;
      description: string | null;
      position: number;
    }[];
  }[];
};

export interface CourseFilter {
  search?: string;
  academyId?: string;
  status?: CourseStatus;
  isFeatured?: boolean;
  page?: number;
  pageSize?: number;
}
