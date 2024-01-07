import { useState } from 'react';
import { getWeekCount } from '@/util';

/**
 * @param dateArray: ['2023','01','30']
 */
export const useWeekCount = (
  dateArray: string[]
): [number, (dateArray: string[]) => void] => {
  const week = getWeekCount(dateArray[0], dateArray[1]);
  const [weekCount, setCount] = useState<number>(week);

  const setWeekCount = (dateArray: string[]) => {
    const week = getWeekCount(dateArray[0], dateArray[1]);
    setCount(week);
  };

  return [weekCount, setWeekCount];
};
