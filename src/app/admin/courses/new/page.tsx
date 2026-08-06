import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { AlertCircle } from 'lucide-react';
import { CourseForm } from '@/components/admin/courses/course-form';
import { getAcademiesAction } from '@/modules/academies/academy.actions';

export const dynamic = 'force-dynamic';

export default async function NewCoursePage() {
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

  const hasPermission = await checkPermission('course.create');
  if (!hasPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to create courses.</p>
      </div>
    );
  }

  // We need to fetch verticals for the dropdown
  const verticalsResponse = await getAcademiesAction({ pageSize: 100 });
  const verticals = verticalsResponse.success ? verticalsResponse.data.items.map(v => ({ id: v.id, name: v.name })) : [];

  return (
    <div className="p-6">
      <CourseForm verticals={verticals} />
    </div>
  );
}
