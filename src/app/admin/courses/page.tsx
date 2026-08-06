import React from 'react';
import Link from 'next/link';
import { Plus, BookOpen, AlertCircle } from 'lucide-react';
import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { getCoursesAction } from '@/modules/courses/course.actions';
import { getAcademiesAction } from '@/modules/academies/academy.actions';
import { CourseFilters } from '@/components/admin/courses/course-filters';
import { CourseTable } from '@/components/admin/courses/course-table';
import { CourseStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    academyId?: string;
    status?: string;
    isFeatured?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Session Expired</h3>
        <p className="text-sm text-slate-500 mt-1">Please sign in to access this page.</p>
      </div>
    );
  }

  const hasViewPermission = await checkPermission('course.view');
  if (!hasViewPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to view courses.</p>
      </div>
    );
  }

  const params = await searchParams;
  const page = parseInt(params.page || '1') || 1;
  const limit = 10;

  // Build query filters options
  const filterOptions = {
    search: params.search || undefined,
    academyId: params.academyId || undefined,
    status: params.status ? (params.status as CourseStatus) : undefined,
    isFeatured: params.isFeatured === 'true' ? true : params.isFeatured === 'false' ? false : undefined,
    page,
    pageSize: limit,
  };

  const response = await getCoursesAction(filterOptions);
  
  if (!response.success) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Error</h3>
        <p className="text-sm text-slate-500 mt-1">{response.error?.message || 'Failed to load courses'}</p>
      </div>
    );
  }

  const { items: courses, total, totalPages } = response.data;
  const offset = (page - 1) * limit;

  const canCreate = (session.user as any).permissions.includes('course.create');

  // Fetch verticals for filter dropdown
  const verticalsResponse = await getAcademiesAction({ pageSize: 100 });
  const verticals = verticalsResponse.success ? verticalsResponse.data.items : [];

  return (
    <div className="space-y-6 p-6">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />
            <span>Course Catalog</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your individual training courses, pricing, and curriculum.
          </p>
        </div>
        
        {canCreate && (
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </Link>
        )}
      </div>

      {/* Filter panel */}
      <CourseFilters verticals={verticals} />

      {/* Main Table view */}
      <CourseTable
        courses={courses}
        userPermissions={(session.user as any).permissions}
        onRefresh={async () => {
          'use server';
        }}
      />

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-205 dark:border-slate-800 pt-4 mt-6">
          <div className="text-xs text-slate-500">
            Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} courses
          </div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={{
                  pathname: '/admin/courses',
                  query: { ...params, page: page - 1 },
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-55"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={{
                  pathname: '/admin/courses',
                  query: { ...params, page: page + 1 },
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-55"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
