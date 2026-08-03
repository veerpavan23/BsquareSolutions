import React from 'react';
import Link from 'next/link';
import { Plus, LayoutGrid, AlertCircle } from 'lucide-react';
import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { classroomService } from '@/modules/classrooms/classroom.service';
import { branchService } from '@/modules/branches/branch.service';
import { ClassroomFilters } from '@/components/admin/classrooms/classroom-filters';
import { ClassroomTable } from '@/components/admin/classrooms/classroom-table';

export const dynamic = 'force-dynamic';

export default async function ClassroomsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    branchId?: string;
    isActive?: string;
    capacityMin?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Session Expired</h3>
        <p className="text-sm text-slate-500 mt-1">Please sign in to access this page.</p>
      </div>
    );
  }

  const hasViewPermission = await checkPermission('classroom.view');
  if (!hasViewPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to view classrooms.</p>
      </div>
    );
  }

  const params = await searchParams;
  const page = parseInt(params.page || '1') || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  // Build query filters options
  const filterOptions = {
    search: params.search || undefined,
    branchId: params.branchId || undefined,
    isActive: params.isActive === 'true' ? true : params.isActive === 'false' ? false : undefined,
    capacityMin: params.capacityMin ? parseInt(params.capacityMin) : undefined,
    sortBy: (params.sortBy || 'classroomCode') as any,
    sortOrder: (params.sortOrder || 'asc') as any,
    limit,
    offset,
    includeArchived: params.isActive === 'false' ? true : undefined,
  };

  const { list: classrooms, count } = await classroomService.getClassroomList(filterOptions);
  const totalPages = Math.ceil(count / limit);

  // Fetch only active physical branches for filters dropdown
  const { list: branches } = await branchService.getBranchList({ isActive: true });
  const physicalBranches = branches.filter((b) => b.branchType !== 'ONLINE');

  const canCreate = (session.user as any).permissions.includes('classroom.create');

  return (
    <div className="space-y-6 p-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />
            <span>Classroom Hub</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure classrooms, labs, seminar halls, seating capacities, and smart board facilities.
          </p>
        </div>

        {canCreate && (
          <Link
            href="/admin/classrooms/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Classroom</span>
          </Link>
        )}
      </div>

      {/* Filters */}
      <ClassroomFilters branches={physicalBranches} />

      {/* Main Table view */}
      <ClassroomTable
        classrooms={classrooms}
        userPermissions={(session.user as any).permissions}
        onRefresh={async () => {
          'use server';
        }}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-205 dark:border-slate-800 pt-4 mt-6">
          <div className="text-xs text-slate-505">
            Showing {offset + 1} to {Math.min(offset + limit, count)} of {count} classrooms
          </div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={{
                  pathname: '/admin/classrooms',
                  query: { ...params, page: page - 1 },
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 border border-slate-305 dark:border-slate-700 rounded hover:bg-slate-55"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={{
                  pathname: '/admin/classrooms',
                  query: { ...params, page: page + 1 },
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 border border-slate-305 dark:border-slate-700 rounded hover:bg-slate-55"
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
