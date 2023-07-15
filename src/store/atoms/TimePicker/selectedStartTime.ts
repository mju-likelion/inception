import { atom } from 'recoil';
import { TimeListData } from '@/types';

export const selectedStartTime = atom<TimeListData>({
  key: 'selectedStartTime',
  default: '08:00',
});
