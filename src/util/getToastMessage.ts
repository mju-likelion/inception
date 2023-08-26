import { ToastStatus, ToastType } from '@/types/Toast';
import { TOAST_MESSAGE } from './data';

export const getToastMessage = (
  status: ToastStatus,
  toastType: ToastType
): string => {
  return status === 'success'
    ? TOAST_MESSAGE[toastType].success
    : TOAST_MESSAGE[toastType].error;
};
