import { atom } from 'recoil';
import { CopyType } from '@/types/Toast';

export const currentCopyType = atom<CopyType>({
  key: 'currentCopyType',
  default: '',
});

export const toastState = atom({
  key: 'toastState',
  default: false,
});
