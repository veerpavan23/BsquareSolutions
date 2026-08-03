import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Building2, AlertCircle } from 'lucide-react';
import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { branchService } from '@/modules/branches/branch.service';
import { BranchForm } from '@/components/admin/branches/branch-form';

export const dynamic = 'force-dynamic';

export default async function EditBranchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Session Expired</h3>
        <p className="text-sm text-slate-500 mt-1">Please sign in to access this page.</p>
      </div>
    );
  }

  const hasEditPermission = await checkPermission('branch.edit');
  if (!hasEditPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to modify branch locations.</p>
      </div>
    );
  }

  const { id } = await params;
  let branch;
  try {
    branch = await branchService.getBranchById(id);
  } catch (error) {
    return notFound();
  }

  return (
    <div className="space-y-6 p-6">
      {/* Back link */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/branches"
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Branch Settings
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
            <Building2 className="w-5 h-5 text-indigo-650" />
            <span>Edit Branch: {branch.branchName}</span>
          </h1>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-955 p-4 rounded-2xl border border-slate-105 dark:border-slate-900/60">
        <BranchForm initialData={branch} />
      </div>
    </div>
  );
}
