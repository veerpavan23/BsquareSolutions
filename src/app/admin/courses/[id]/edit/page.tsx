import { auth } from '@/auth';
import { checkPermission } from '@/modules/auth/permissions';
import { AlertCircle } from 'lucide-react';
import { CourseForm } from '@/components/admin/courses/course-form';
import { getCourseAction } from '@/modules/courses/course.actions';
import { getAcademiesAction } from '@/modules/academies/academy.actions';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
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

  const hasPermission = await checkPermission('course.edit');
  if (!hasPermission) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto mt-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Access Denied</h3>
        <p className="text-sm text-slate-500 mt-1">You do not have the required permissions to edit courses.</p>
      </div>
    );
  }

  const resolvedParams = await params;
  const result = await getCourseAction(resolvedParams.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const verticalsResponse = await getAcademiesAction({ pageSize: 100 });
  const verticals = verticalsResponse.success ? verticalsResponse.data.items.map(v => ({ id: v.id, name: v.name })) : [];

  return (
    <div className="p-6">
      <CourseForm initialData={result.data} verticals={verticals} />
    </div>
  );
}
