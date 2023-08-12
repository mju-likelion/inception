import { PromiseResultData } from '@/types';

export const getDatesToCalendarData = (dates: string[]) => {
  const result = dates.map(
    (data) =>
      ({
        date: data,
        status: 'default',
        count: 0,
        users: [],
      } as PromiseResultData)
  );

  return result as PromiseResultData[];
};
