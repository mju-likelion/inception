import { atom } from 'recoil';

export const IsMouseDownAtom = atom<boolean>({
  key: 'isMouseDownState',
  default: false,
});
