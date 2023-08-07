import { CalendarData } from '@/types';
import { RecoilState, atom } from 'recoil';

export const calendarState: RecoilState<CalendarData[]> = atom({
  key: 'calendarState',
  default: [] as CalendarData[],
});
