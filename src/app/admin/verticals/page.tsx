import React from 'react';
import Link from 'next/link';
import { Plus, LayoutGrid, AlertCircle } from 'lucide-react';
import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { getAcademiesAction } from '@/modules/academies/academy.actions';
import { VerticalFilters } from '@/components/admin/verticals/vertical-filters';
import { VerticalTable } from '@/components/admin/verticals/vertical-table';
import { PublishStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function VerticalsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    publishStatus?: string;
    isActive?: string;
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

  const hasViewPermission = await checkPermission('academy.view');
  if (!hasViewPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to view learning verticals.</p>
      </div>
    );
  }

  const params = await searchParams;
  const page = parseInt(params.page || '1') || 1;
  const limit = 10;

  // Build query filters options
  const filterOptions = {
    search: params.search || undefined,
    publishStatus: params.publishStatus ? (params.publishStatus as PublishStatus) : undefined,
    isActive: params.isActive === 'true' ? true : params.isActive === 'false' ? false : undefined,
    page,
    pageSize: limit,
  };

  const response = await getAcademiesAction(filterOptions);
  
  if (!response.success) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Error</h3>
        <p className="text-sm text-slate-500 mt-1">{response.error?.message || 'Failed to load verticals'}</p>
      </div>
    );
  }

  const { items: verticals, total, totalPages } = response.data;
  const offset = (page - 1) * limit;

  const canCreate = (session.user as any).permissions.includes('academy.create');

  return (
    <div className="space-y-6 p-6">
      {/* Title section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />
            <span>Learning Verticals</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your high-level training domains (e.g. Salesforce, Data Analytics) for the public website.
          </p>
        </div>
        
        {canCreate && (
          <Link
            href="/admin/verticals/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vertical</span>
          </Link>
        )}
      </div>

      {/* Filter panel */}
      <VerticalFilters />

      {/* Main Table view */}
      <VerticalTable
        verticals={verticals}
        userPermissions={(session.user as any).permissions}
        onRefresh={async () => {
          'use server';
          // server action will revalidate path
        }}
      />

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-205 dark:border-slate-800 pt-4 mt-6">
          <div className="text-xs text-slate-500">
            Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} verticals
          </div>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={{
                  pathname: '/admin/verticals',
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
                  pathname: '/admin/verticals',
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
