import { atom } from 'recoil';
import { TimeListData } from '@/types';

export const selectedEndTime = atom<TimeListData>({
  key: 'selectedEndTime',
  default: '22:00',
});
