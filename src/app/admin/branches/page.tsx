import React from 'react';
import Link from 'next/link';
import { Plus, Building2, AlertCircle } from 'lucide-react';
import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { branchService } from '@/modules/branches/branch.service';
import { BranchFilters } from '@/components/admin/branches/branch-filters';
import { BranchTable } from '@/components/admin/branches/branch-table';
import { BranchType } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function BranchesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    type?: string;
    isActive?: string;
    isHeadOffice?: string;
    sortBy?: string;
    sortOrder?: string;
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

  const hasViewPermission = await checkPermission('branch.view');
  if (!hasViewPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to view branch locations.</p>
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
    type: params.type ? (params.type as BranchType) : undefined,
    isActive: params.isActive === 'true' ? true : params.isActive === 'false' ? false : undefined,
    isHeadOffice: params.isHeadOffice === 'true' ? true : params.isHeadOffice === 'false' ? false : undefined,
    sortBy: (params.sortBy || 'displayOrder') as any,
    sortOrder: (params.sortOrder || 'asc') as any,
    limit,
    offset,
    includeArchived: params.isActive === 'false' ? true : undefined,
  };

  const { list: branches, count } = await branchService.getBranchList(filterOptions);
  const totalPages = Math.ceil(count / limit);

  const canCreate = (session.user as any).permissions.includes('branch.create');

  return (
    <div className="space-y-6 p-6">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />
            <span>Branch Locations</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage training academy campus branches, virtual/online portals, and corporate offices.
          </p>
        </div>
        
        {canCreate && (
          <Link
            href="/admin/branches/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Branch</span>
          </Link>
        )}
      </div>

      {/* Filter panel */}
      <BranchFilters />

      {/* Main Table view */}
      <BranchTable
        branches={branches}
        userPermissions={(session.user as any).permissions}
        onRefresh={async () => {
          'use server';
          // refresh triggers dynamic re-render
        }}
      />

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-205 dark:border-slate-800 pt-4 mt-6">
          <div className="text-xs text-slate-500">
            Showing {offset + 1} to {Math.min(offset + limit, count)} of {count} branches
          </div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={{
                  pathname: '/admin/branches',
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
                  pathname: '/admin/branches',
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
