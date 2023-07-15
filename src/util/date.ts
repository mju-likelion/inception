/* date = 일자 데이터, day = 요일 데이터 */
import { CalendarData } from '@/types';
import { padStart } from 'lodash';

/** 월별 캘란더 기본 정보를 반환한다. */
export const getCalendarData = (
  year: string,
  month: string
): CalendarData[] => {
  const days = calcDaysByYearMonth(year, month);
  const paddingMonth = +month < 10 ? `0${+month}` : month;

  const datas = days.map((date) => {
    const day = new Date(+year, +month - 1, +date).getDay();
    return {
      date: `${year}-${paddingMonth}-${date}`,
      day: convertDayNumberToString(day),
      activeStatus: 'default',
    } as CalendarData;
  });

  return datas;
};

/** 캘린더 날짜가 겹치는지 판별 */
export const isDuplicatedDate = (
  calendarData: CalendarData[],
  changedDate: { year: string; month: string }
): boolean => {
  const isExist = calendarData.some((calendar) => {
    const splitDate = calendar.date.split('-');
    return (
      +splitDate[0] === +changedDate.year &&
      +splitDate[1] === +changedDate.month
    );
  });

  return isExist;
};

export const dateFormatToString = (date: Date): string => {
  const year = `${date.getFullYear()}`;
  const month = padStart(`${date.getMonth() + 1}`, 2, '0');
  const day = padStart(`${date.getDate()}`, 2, '0');
  return `${year}-${month}-${day}`; // yyyy-mm-dd
};

export const calcDateFewMonth = (date: Date, jumpMonth: number): Date => {
  return new Date(date.setMonth(date.getMonth() + jumpMonth));
};

export const getWeekCount = (year: string, month: string) => {
  const startDay = new Date(+year, +month - 1, 1).getDay();
  const totalDate = new Date(+year, +month, 0).getDate();
  return Math.ceil((startDay + totalDate) / 7);
};

const calcDaysByYearMonth = (year: string, month: string): string[] => {
  // date 파라미터에 0을 넣게 된다면 '이전달'을 참조하게된다.
  const getLastDay = new Date(+year, +month, 0).getDate();

  return Array.from({ length: getLastDay }, (value, index) => {
    const date = index + 1;
    return date < 10 ? `0${date}` : `${date}`;
  });
};

const convertDayNumberToString = (dayNumber: number): string => {
  switch (dayNumber) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      throw Error(`${dayNumber}는 올바른 요일 숫자가 아닙니다.`);
  }
};
