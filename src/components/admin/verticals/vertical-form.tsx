'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Academy } from '@prisma/client';
import { Save, ArrowLeft, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

import { createAcademySchema, updateAcademySchema, CreateAcademyInput, UpdateAcademyInput } from '@/modules/academies/academy.schemas';
import { createAcademyAction, updateAcademyAction } from '@/modules/academies/academy.actions';
import { MediaPicker } from '@/components/admin/media/media-picker'; // Assuming there is one

interface VerticalFormProps {
  initialData?: Academy;
}

export function VerticalForm({ initialData }: VerticalFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Media pickers states
  const [showThumbnailPicker, setShowThumbnailPicker] = useState(false);
  const [showBannerPicker, setShowBannerPicker] = useState(false);

  const isEditing = !!initialData;
  const schema = isEditing ? updateAcademySchema : createAcademySchema;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      icon: '',
      thumbnail: '',
      banner: '',
      displayOrder: 0,
      isFeatured: false,
      isActive: true,
      metaTitle: '',
      metaDescription: '',
    },
  });

  const watchName = watch('name');
  const watchThumbnail = watch('thumbnail');
  const watchBanner = watch('banner');

  // Auto-generate slug from name if empty
  const handleNameBlur = () => {
    if (!isEditing && watchName && !watch('slug')) {
      setValue(
        'slug',
        watchName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
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
        // Strip out fields that shouldn't be here, ensuring recordVersion is present
        const payload = { ...data, recordVersion: undefined };
        res = await updateAcademyAction(initialData.id, initialData.recordVersion, payload);
      } else {
        res = await createAcademyAction(data);
      }

      if (res.success) {
        router.push('/admin/verticals');
        router.refresh();
      } else {
        setError(res.error?.message || 'Failed to save vertical.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/verticals"
            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {isEditing ? 'Edit Vertical' : 'Create New Vertical'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/verticals"
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Vertical
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Main Form Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">General Information</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Name *</label>
                <input
                  {...register('name')}
                  onBlur={handleNameBlur}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="e.g. Salesforce"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message as string}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Slug *</label>
                <input
                  {...register('slug')}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  placeholder="e.g. salesforce"
                />
                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message as string}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Short Description</label>
              <textarea
                {...register('shortDescription')}
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                placeholder="A brief summary for cards and lists..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Full Description</label>
              <textarea
                {...register('fullDescription')}
                rows={6}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                placeholder="Detailed description of this learning vertical..."
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Media</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Thumbnail Image *</label>
                <p className="text-xs text-slate-500">Used in cards (square or 4:3)</p>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                    {watchThumbnail ? (
                      <img src={watchThumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      {...register('thumbnail')}
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                      placeholder="Image URL"
                    />
                    <button type="button" onClick={() => alert('Media picker coming soon')} className="text-sm text-indigo-600 hover:text-indigo-500">
                      Browse Media Library
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Banner Image</label>
                <p className="text-xs text-slate-500">Used at the top of the details page (16:9)</p>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-16 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                    {watchBanner ? (
                      <img src={watchBanner} alt="Banner" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      {...register('banner')}
                      className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"
                      placeholder="Image URL"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Settings</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Active</span>
                  <span className="text-xs text-slate-500">Can be accessed internally</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <input
                  type="checkbox"
                  {...register('isFeatured')}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Featured</span>
                  <span className="text-xs text-slate-500">Show on the homepage</span>
                </div>
              </label>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-300">Display Order</label>
                <input
                  type="number"
                  {...register('displayOrder', { valueAsNumber: true })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">SEO</h2>
            
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
      </div>
    </form>
  );
}
