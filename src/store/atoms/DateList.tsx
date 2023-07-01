import { atom } from 'recoil';

export const DateListAtom = atom({
  key: 'dateState',
  default: [
    '2023-06-29',
    '2023-06-30',
    '2023-07-01',
    '2023-07-02',
    '2023-07-03',
    '2023-07-04',
  ],
});
