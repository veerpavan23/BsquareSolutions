import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { AlertCircle } from 'lucide-react';
import { VerticalForm } from '@/components/admin/verticals/vertical-form';

export const dynamic = 'force-dynamic';

export default async function NewVerticalPage() {
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

  const hasPermission = await checkPermission('academy.create');
  if (!hasPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to create verticals.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <VerticalForm />
    </div>
  );
}
