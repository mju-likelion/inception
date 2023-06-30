import { atom } from 'recoil';

export const tabState = atom<'default' | 'result'>({
  key: 'tabState',
  default: 'default',
});
