import { ToastType, CopyType } from '@/types/Toast';
import { COPY_TYPE_MESSAGE } from './data';

export const getToastMessage = (
  toastType: ToastType,
  copyType: CopyType
): string => {
  return toastType === 'success'
    ? COPY_TYPE_MESSAGE[copyType].success
    : COPY_TYPE_MESSAGE[copyType].error;
};
