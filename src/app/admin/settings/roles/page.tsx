import React from 'react';
import Link from 'next/link';
import { Plus, Shield, AlertCircle } from 'lucide-react';
import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { roleService } from '@/modules/roles/role.service';
import { RoleList } from '@/components/admin/roles/role-list';

export const dynamic = 'force-dynamic';

export default async function RolesPage() {
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

  const hasViewPermission = await checkPermission('role.view');
  if (!hasViewPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to view administrative roles.</p>
      </div>
    );
  }

  const roles = await roleService.getRoleList();
  const canCreate = (session.user as any).permissions.includes('role.create');

  return (
    <div className="space-y-6 p-6">
      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-indigo-650 dark:text-indigo-400" />
            <span>Administrative Roles</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure access control policies, system roles, and detailed permission matrix bounds.
          </p>
        </div>

        {canCreate && (
          <Link
            href="/admin/settings/roles/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </Link>
        )}
      </div>

      {/* Role list table */}
      <RoleList
        roles={roles}
        userPermissions={(session.user as any).permissions}
        onRefresh={async () => {
          'use server';
        }}
      />
    </div>
  );
}
