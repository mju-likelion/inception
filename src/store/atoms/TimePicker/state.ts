import { atom } from 'recoil';
import { TimeListData } from '@/types';

export const selectedEndTime = atom<TimeListData>({
  key: 'selectedEndTime',
  default: '22:00',
});

export const selectedStartTime = atom<TimeListData>({
  key: 'selectedStartTime',
  default: '08:00',
});

export const timeErrorState = atom({
  key: 'timeErrorState',
  default: false,
});

export const titleCheckState = atom<boolean>({
  key: 'titleCheckState',
  default: false,
});
