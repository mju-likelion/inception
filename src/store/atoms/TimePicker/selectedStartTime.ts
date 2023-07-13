import { atom } from 'recoil';

export const selectedStartTime = atom({
  key: 'selectedStartTime',
  default: '08:00',
});
