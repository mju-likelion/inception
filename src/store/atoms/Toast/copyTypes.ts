import { atom } from 'recoil';

export const copyTypes = atom<'email' | 'url' | 'code' | ''>({
  key: 'copyTypes',
  default: '',
});
