'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ModalType, modalRegistry, isValidModalType } from './modal-registry';

export type ModalParams = Record<string, string | undefined>;

export function useModalNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const openModal = (modalType: ModalType, params?: ModalParams) => {
    if (!isValidModalType(modalType)) return;

    const currentSearch = typeof window !== 'undefined' ? window.location.search : '';
    const newSearchParams = new URLSearchParams(currentSearch);
    const allowedParams = modalRegistry[modalType].allowedParams;

    // Remove any stale modal-specific params from a potentially different open modal
    const allAllowedParams = new Set(
      Object.values(modalRegistry).flatMap((m) => m.allowedParams)
    );
    for (const key of Array.from(allAllowedParams)) {
      newSearchParams.delete(key);
    }

    // Set the new modal
    newSearchParams.set('modal', modalType);

    // Set the specific allowed params for this new modal
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (allowedParams.includes(key) && value && value.trim() !== '') {
          newSearchParams.set(key, value.trim());
        }
      }
    }

    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    const currentSearch = typeof window !== 'undefined' ? window.location.search : '';
    const newSearchParams = new URLSearchParams(currentSearch);
    newSearchParams.delete('modal');

    // Remove all modal-specific parameters
    const allAllowedParams = new Set(
      Object.values(modalRegistry).flatMap((m) => m.allowedParams)
    );
    for (const key of Array.from(allAllowedParams)) {
      newSearchParams.delete(key);
    }

    const searchStr = newSearchParams.toString();
    const query = searchStr ? `?${searchStr}` : '';
    
    // Push state to ensure URL updates reliably
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return { openModal, closeModal };
}

export function useModalRoute(modalType: ModalType) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentModal = searchParams.get('modal');
  const isOpen = currentModal === modalType;
  const { openModal } = useModalNavigation();

  const getCloseUrl = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('modal');

    const allAllowedParams = new Set(
      Object.values(modalRegistry).flatMap((m) => m.allowedParams)
    );
    for (const key of Array.from(allAllowedParams)) {
      newSearchParams.delete(key);
    }

    const searchStr = newSearchParams.toString();
    return searchStr ? `${pathname}?${searchStr}` : pathname;
  };

  const closeModal = () => {
    router.push(getCloseUrl(), { scroll: false });
  };

  const getParam = (key: string) => {
    const allowedParams = modalRegistry[modalType].allowedParams;
    if (!allowedParams.includes(key)) return null;
    return searchParams.get(key);
  };

  return { isOpen, getParam, openModal, closeModal, getCloseUrl };
}
