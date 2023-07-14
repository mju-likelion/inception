import { TIME_LIST } from '@/component/TimePicker/data';
import { atom } from 'recoil';

export const selectedStartTime = atom<keyof typeof TIME_LIST>({
  key: 'selectedStartTime',
  default: '08:00',
});
