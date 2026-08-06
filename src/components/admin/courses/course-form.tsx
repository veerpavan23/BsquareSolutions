'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseLevel, DurationUnit } from '@prisma/client';
import { Save, ArrowLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

import { createCourseSchema, updateCourseSchema } from '@/modules/courses/course.schemas';
import { createCourseAction, updateCourseAction } from '@/modules/courses/course.actions';
import { AdminCourseDto } from '@/modules/courses/course.types';
import { CurriculumEditor } from './curriculum-editor';

interface CourseFormProps {
  initialData?: AdminCourseDto;
  verticals: { id: string; name: string }[];
}

export function CourseForm({ initialData, verticals }: CourseFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Tab Management
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'DESCRIPTION' | 'CURRICULUM' | 'MEDIA'>('GENERAL');

  const isEditing = !!initialData;
  const schema = isEditing ? updateCourseSchema : createCourseSchema;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: '',
      code: '',
      slug: '',
      academyId: '',
      level: CourseLevel.BEGINNER,
      durationValue: null,
      durationUnit: DurationUnit.WEEKS,
      learningHours: null,
      standardPrice: null,
      discountedPrice: null,
      shortDescription: '',
      description: '',
      thumbnailUrl: '',
      brochureUrl: '',
      metaTitle: '',
      metaDescription: '',
    },
  });

  const watchTitle = watch('title');
  const watchThumbnail = watch('thumbnailUrl');

  const handleTitleBlur = () => {
    if (!isEditing && watchTitle && !watch('slug')) {
      setValue(
        'slug',
        watchTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        { shouldValidate: true }
      );
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let res;
      if (isEditing) {
        const payload = { ...data, recordVersion: undefined, modules: undefined, academy: undefined, categoryId: undefined };
        res = await updateCourseAction(initialData.id, initialData.recordVersion, payload);
      } else {
        res = await createCourseAction(data);
      }

      if (res.success) {
        if (!isEditing) {
          // If created, go to edit mode to add curriculum
          router.push(`/admin/courses/${res.data.id}/edit`);
        } else {
          router.push('/admin/courses');
          router.refresh();
        }
      } else {
        setError(res.error?.message || 'Failed to save course.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'GENERAL', label: 'General' },
    { id: 'DESCRIPTION', label: 'Description' },
    { id: 'CURRICULUM', label: 'Curriculum', disabled: !isEditing },
    { id: 'MEDIA', label: 'Media & SEO' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/courses"
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isEditing ? `Edit: ${initialData.title}` : 'Create New Course'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
          >
            Cancel
          </Link>
          {activeTab !== 'CURRICULUM' && (
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isEditing ? 'Save Changes' : 'Create Course'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id as any)}
              disabled={tab.disabled}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
              } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        
        <form id="course-form" onSubmit={(e) => e.preventDefault()}>
          {/* GENERAL TAB */}
          <div className={activeTab === 'GENERAL' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Course Title *</label>
                <input
                  {...register('title')}
                  onBlur={handleTitleBlur}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="e.g. Salesforce Administrator"
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Slug *</label>
                <input
                  {...register('slug')}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Course Code *</label>
                <input
                  {...register('code')}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="e.g. SF-ADMIN-101"
                />
                {errors.code && <p className="text-sm text-red-500">{errors.code.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Vertical / Academy *</label>
                <select
                  {...register('academyId')}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                >
                  <option value="">Select Vertical</option>
                  {verticals.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
                {errors.academyId && <p className="text-sm text-red-500">{errors.academyId.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Level</label>
                <select
                  {...register('level')}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                >
                  {Object.values(CourseLevel).map(l => (
                    <option key={l} value={l}>{l.charAt(0) + l.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Duration</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    {...register('durationValue', { valueAsNumber: true })}
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    placeholder="e.g. 6"
                  />
                  <select
                    {...register('durationUnit')}
                    className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  >
                    {Object.values(DurationUnit).map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Standard Price (₹)</label>
                <input
                  type="number"
                  {...register('standardPrice', { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="e.g. 15000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Discounted Price (₹)</label>
                <input
                  type="number"
                  {...register('discountedPrice', { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="e.g. 12000"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION TAB */}
          <div className={activeTab === 'DESCRIPTION' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Short Description</label>
                <p className="text-xs text-slate-500">Appears on course cards in lists.</p>
                <textarea
                  {...register('shortDescription')}
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Full Description *</label>
                <p className="text-xs text-slate-500">Appears on the course details page.</p>
                <textarea
                  {...register('description')}
                  rows={8}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description.message as string}</p>}
              </div>
            </div>
          </div>

          {/* MEDIA & SEO TAB */}
          <div className={activeTab === 'MEDIA' ? 'block' : 'hidden'}>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Course Thumbnail *</label>
                  <p className="text-xs text-slate-500">Square or 4:3 image for course cards</p>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden shrink-0">
                      {watchThumbnail ? (
                        <img src={watchThumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        {...register('thumbnailUrl')}
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                        placeholder="Image URL"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Course Brochure (PDF)</label>
                  <p className="text-xs text-slate-500">Downloadable syllabus brochure link</p>
                  <input
                    {...register('brochureUrl')}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    placeholder="PDF URL"
                  />
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-800" />

              <h3 className="text-base font-semibold text-slate-900 dark:text-white">SEO Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Meta Title</label>
                  <input
                    {...register('metaTitle')}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Meta Description</label>
                  <textarea
                    {...register('metaDescription')}
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* CURRICULUM TAB (Rendered outside the main react-hook-form) */}
        {activeTab === 'CURRICULUM' && initialData && (
          <div className="pt-2">
            <CurriculumEditor 
              courseId={initialData.id} 
              expectedVersion={initialData.recordVersion} 
              initialModules={initialData.modules || []} 
            />
          </div>
        )}

      </div>
    </div>
  );
}
