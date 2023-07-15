import { atom } from 'recoil';

export const titleCheckState = atom<boolean>({
  key: 'titleCheckState',
  default: false,
});
