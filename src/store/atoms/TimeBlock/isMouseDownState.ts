import { atom } from 'recoil';

export const isMouseDownState = atom<boolean>({
  key: 'isMouseDownState',
  default: false,
});
