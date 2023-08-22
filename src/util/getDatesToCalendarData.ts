import { SelectedDate } from '@/types';

export const getDatesToCalendarData = (dates: string[]): SelectedDate[] => {
  const result = dates.map(
    (data) =>
      ({
        date: data,
        status: 'default',
        count: 0,
        users: [],
      } as SelectedDate)
  );

  return result;
};
