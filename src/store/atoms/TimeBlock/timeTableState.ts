import { atom } from 'recoil';

export const timeTableState = atom<boolean[][]>({
  key: 'timeTableState',
  default: [],
});
