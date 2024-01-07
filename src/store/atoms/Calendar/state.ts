import { RecoilState, atom } from 'recoil';
import { CalendarData } from '@/types';

export const calendarState: RecoilState<CalendarData[]> = atom({
  key: 'calendarState',
  default: [] as CalendarData[],
});
