import { atom } from 'recoil';

export const dateListState = atom({
  key: 'dateState',
  default: ['2023-07-29', '2023-07-30', '2023-07-31', '2023-08-01'],
});

export const isMouseDownState = atom<boolean>({
  key: 'isMouseDownState',
  default: false,
});

export const timeListState = atom({
  key: 'timeState',
  default: [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
  ],
});

export const timeTableState = atom<boolean[][]>({
  key: 'timeTableState',
  default: [],
});
