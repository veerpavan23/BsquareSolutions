'use client';

import React, { useState, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { Branch, BranchType } from '@prisma/client';
import { createBranchAction, updateBranchAction } from '@/modules/branches/branch.actions';

interface BranchFormProps {
  initialData?: Branch | null;
}

export function BranchForm({ initialData }: BranchFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  // Form State
  const [branchCode, setBranchCode] = useState(initialData?.branchCode || '');
  const [branchName, setBranchName] = useState(initialData?.branchName || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [branchType, setBranchType] = useState<BranchType>((initialData?.branchType as BranchType) || 'TRAINING_CENTER');
  
  const [addressLine1, setAddressLine1] = useState(initialData?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(initialData?.addressLine2 || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [district, setDistrict] = useState(initialData?.district || '');
  const [state, setState] = useState(initialData?.state || '');
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || '');
  const [country, setCountry] = useState(initialData?.country || 'India');

  const [phone, setPhone] = useState(initialData?.phone || '');
  const [alternatePhone, setAlternatePhone] = useState(initialData?.alternatePhone || '');
  const [email, setEmail] = useState(initialData?.email || '');

  const [timezone, setTimezone] = useState(initialData?.timezone || 'Asia/Kolkata');
  const [latitude, setLatitude] = useState<string>(initialData?.latitude ? String(initialData.latitude) : '');
  const [longitude, setLongitude] = useState<string>(initialData?.longitude ? String(initialData.longitude) : '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(initialData?.googleMapsUrl || '');
  
  const [isHeadOffice, setIsHeadOffice] = useState(initialData?.isHeadOffice || false);
  const [isActive, setIsActive] = useState(initialData?.isActive !== undefined ? initialData.isActive : true);
  const [displayOrder, setDisplayOrder] = useState<number>(initialData?.displayOrder || 0);

  // Status/Error States
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isDirty, setIsDirty] = useState(false);

  // Auto-generate slug from name (only on creation or if custom edit is not yet touched)
  useEffect(() => {
    if (!isEdit && branchName.trim()) {
      const generated = branchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generated);
    }
  }, [branchName, isEdit]);

  // Track dirty state to warn before closing/reloading
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Mark form as dirty when any field changes
  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent, closeAfterSave: boolean) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg('');
    setFieldErrors({});

    const payload = {
      branchCode: branchCode.trim(),
      branchName: branchName.trim(),
      slug: slug.trim(),
      branchType,
      addressLine1: branchType === 'ONLINE' ? 'Virtual' : addressLine1.trim(),
      addressLine2: addressLine2.trim() || null,
      city: branchType === 'ONLINE' ? 'Hyderabad' : city.trim(),
      district: district.trim() || null,
      state: branchType === 'ONLINE' ? 'Telangana' : state.trim(),
      postalCode: branchType === 'ONLINE' ? '500081' : postalCode.trim(),
      country,
      phone: phone.trim(),
      alternatePhone: alternatePhone.trim() || null,
      email: email.trim(),
      timezone,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      googleMapsUrl: googleMapsUrl.trim() || null,
      isHeadOffice,
      isActive,
      displayOrder,
    };

    try {
      let res;
      if (isEdit && initialData) {
        res = await updateBranchAction(initialData.id, initialData.recordVersion, payload);
      } else {
        res = await createBranchAction(payload);
      }

      if (res.success) {
        setIsDirty(false);
        if (closeAfterSave) {
          router.push('/admin/branches');
        } else {
          // If created, redirect to edit path
          if (!isEdit) {
            router.push(`/admin/branches/${res.data.id}/edit`);
          } else {
            router.refresh();
          }
        }
      } else {
        setErrorMsg(res.error.message);
        if (res.error.fieldErrors) {
          setFieldErrors(res.error.fieldErrors);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, true)} onChange={markDirty} className="space-y-6">
      {/* Top Banner Error */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div>
            <h5 className="font-semibold">Failed to Save Branch</h5>
            <p className="mt-0.5 text-xs">{errorMsg}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Basic Info */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="branchCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Branch Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="branchCode"
                  type="text"
                  required
                  placeholder="e.g. HQ-HYD"
                  value={branchCode}
                  onChange={(e) => {
                    setBranchCode(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
                {fieldErrors.branchCode && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.branchCode[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="branchType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Branch Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="branchType"
                  value={branchType}
                  onChange={(e) => {
                    setBranchType(e.target.value as BranchType);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm cursor-pointer"
                >
                  <option value="TRAINING_CENTER">Training Center</option>
                  <option value="HEAD_OFFICE">Head Office</option>
                  <option value="ONLINE">Online/Virtual Center</option>
                  <option value="CORPORATE_OFFICE">Corporate Office</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="branchName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Branch Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="branchName"
                  type="text"
                  required
                  placeholder="e.g. BSquare Head Office"
                  value={branchName}
                  onChange={(e) => {
                    setBranchName(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
                {fieldErrors.branchName && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.branchName[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  id="slug"
                  type="text"
                  required
                  placeholder="e.g. bsquare-head-office"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-955 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm font-mono"
                />
                {fieldErrors.slug && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.slug[0]}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Address (Only if NOT Online) */}
          {branchType !== 'ONLINE' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Physical Location Address
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="addressLine1"
                      type="text"
                      required
                      placeholder="e.g. 3rd Floor, Silicon Valley Towers"
                      value={addressLine1}
                      onChange={(e) => {
                        setAddressLine1(e.target.value);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                    {fieldErrors.addressLine1 && (
                      <p className="text-red-500 text-xs mt-1">{fieldErrors.addressLine1[0]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      id="addressLine2"
                      type="text"
                      placeholder="e.g. Madhapur Road"
                      value={addressLine2}
                      onChange={(e) => {
                        setAddressLine2(e.target.value);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      placeholder="Hyderabad"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-355 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      required
                      placeholder="Telangana"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-355 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      required
                      placeholder="500081"
                      value={postalCode}
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-355 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Contact */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Primary Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
                {fieldErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.phone[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Branch Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="hyderabad@bsquaresolutions.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-955/60 border border-slate-350 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email[0]}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Coordinates, Display Order */}
        <div className="space-y-6">
          {/* Section 4: Configuration */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Settings & Configurations
            </h3>

            {/* Head Office Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
              <div>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">Head Office HQ</span>
                <span className="block text-[11px] text-slate-500 mt-0.5">Designate as main headquarters</span>
              </div>
              <input
                type="checkbox"
                checked={isHeadOffice}
                disabled={branchType === 'ONLINE'} // Virtual cannot be HQ
                onChange={(e) => {
                  setIsHeadOffice(e.target.checked);
                  markDirty();
                }}
                className="w-4 h-4 text-indigo-650 border-slate-300 dark:border-slate-800 rounded cursor-pointer"
              />
            </div>

            {/* Active Switch */}
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
              <div>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">Active Status</span>
                <span className="block text-[11px] text-slate-500 mt-0.5">Visible to training systems</span>
              </div>
              <input
                type="checkbox"
                checked={isActive}
                disabled={isEdit && initialData?.isHeadOffice} // Head Office cannot be deactivated
                onChange={(e) => {
                  setIsActive(e.target.checked);
                  markDirty();
                }}
                className="w-4 h-4 text-indigo-650 border-slate-300 dark:border-slate-800 rounded cursor-pointer"
              />
            </div>

            {/* Display Order */}
            <div>
              <label htmlFor="displayOrder" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
                Display Order Weight
              </label>
              <input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => {
                  setDisplayOrder(parseInt(e.target.value) || 0);
                  markDirty();
                }}
                className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
              />
            </div>

            {/* Timezone */}
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
                IANA Timezone
              </label>
              <input
                id="timezone"
                type="text"
                required
                placeholder="Asia/Kolkata"
                value={timezone}
                onChange={(e) => {
                  setTimezone(e.target.value);
                  markDirty();
                }}
                className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm font-mono"
              />
            </div>
          </div>

          {/* Section 5: Maps & Coordinates */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Coordinates & Map
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
                  Latitude
                </label>
                <input
                  id="latitude"
                  type="text"
                  placeholder="17.448"
                  value={latitude}
                  onChange={(e) => {
                    setLatitude(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>

              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
                  Longitude
                </label>
                <input
                  id="longitude"
                  type="text"
                  placeholder="78.374"
                  value={longitude}
                  onChange={(e) => {
                    setLongitude(e.target.value);
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="googleMapsUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-350 mb-1">
                Google Maps Embed URL
              </label>
              <input
                id="googleMapsUrl"
                type="text"
                placeholder="https://maps.google.com/..."
                value={googleMapsUrl}
                onChange={(e) => {
                  setGoogleMapsUrl(e.target.value);
                  markDirty();
                }}
                className="w-full px-3 py-2 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-955 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm truncate"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Form Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
        <div>
          {isEdit && initialData && (
            <span className="text-xs text-slate-450 dark:text-slate-500">
              Last updated: {new Date(initialData.updatedAt).toLocaleString()} | Version: {initialData.recordVersion}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={() => router.push('/admin/branches')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          
          <button
            type="button"
            disabled={isPending}
            onClick={(e) => handleSubmit(e, false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-lg transition"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Save & Continue</span>
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md hover:shadow-lg transition"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Close</span>
          </button>
        </div>
      </div>
    </form>
  );
}
export default BranchForm;
