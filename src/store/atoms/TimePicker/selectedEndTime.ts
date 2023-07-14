import { TIME_LIST } from '@/component/TimePicker/data';
import { atom } from 'recoil';

export const selectedEndTime = atom<keyof typeof TIME_LIST>({
  key: 'selectedEndTime',
  default: '22:00',
});
