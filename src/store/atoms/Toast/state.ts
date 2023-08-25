import { atom } from 'recoil';
import { ToastType } from '@/types/Toast';

export const currentToastType = atom<ToastType>({
  key: 'currentToastType',
  default: '',
});

export const toastState = atom({
  key: 'toastState',
  default: false,
});
