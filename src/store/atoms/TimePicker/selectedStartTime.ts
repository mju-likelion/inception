import { atom } from 'recoil';

export const selectedStartTimes = atom({
  key: 'selectedStartTime',
  default: '08:00',
});
