import { ToastStatus, ToastType, DescriptionActiveStatus } from '@/types/Toast';
import { TOAST_MESSAGE } from './data';

export const getToastDescription = (
  status: ToastStatus,
  toastType: ToastType,
  descriptionActive: DescriptionActiveStatus
): string => {
  if (status === descriptionActive) {
    return TOAST_MESSAGE[toastType].description;
  } else if (descriptionActive === 'both') {
    return TOAST_MESSAGE[toastType].description;
  } else {
    return '';
  }
};
