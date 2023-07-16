import { atom } from 'recoil';

export const tabState = atom<string>({
  key: 'tabState',
  default: 'default',
});
