import { atom } from 'recoil';

export const TimeTableListAtom = atom<boolean[][]>({
  key: 'timeTableState',
  default: [],
});
