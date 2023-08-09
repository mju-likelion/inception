/* date = 일자 데이터, day = 요일 데이터 */
import {
  ActiveStatus,
  CalendarData,
  PromiseResultData,
  ViewType,
} from '@/types';
import padStart from 'lodash/padStart';

/** 월별 캘린더 기본 정보를 반환한다. */
export const getCalendarData = (
  year: string,
  month: string,
  viewType: ViewType,
  promiseResult?: PromiseResultData[]
): CalendarData[] => {
  const days = calcDaysByYearMonth(year, month);

  // 가장 많이 선택된 횟수로 status 구하기 위해 사용
  const mostSelectedCount =
    promiseResult && getCountOfMostSelectedDate(promiseResult);

  const datas = days.map((date) => {
    const day = new Date(+year, +month - 1, +date).getDay();
    const dateString = `${year}-${padStart(month, 2, '0')}-${date}`;
    let activeStatus: ActiveStatus = 'default';

    const resultData = promiseResult?.find(
      (result) => result.date === dateString
    );

    if (resultData && mostSelectedCount === resultData.count) {
      activeStatus = 'active';
    }

    // 현재 날짜의 이전 날짜는 disable 처리
    if (
      viewType !== 'result' &&
      new Date(dateString) < new Date(dateFormatToString(new Date()))
    ) {
      activeStatus = 'disabled';
    }

    if (promiseResult && !resultData) {
      activeStatus = 'disabled';
    }

    return {
      date: dateString,
      day: convertDayNumberToString(day),
      activeStatus: activeStatus,
      count: resultData?.count,
      selectUsers: resultData?.users,
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

/** Date 객체를 yyyy-mm-dd 형식으로 변환 */
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

/** ['2023-01-01', '2023-05-01'] 형식의 string으로 된 날짜 중 가장 큰 날짜를 구함 */
export const getMaxDate = (dates: string[]) => {
  const times = dates.map((date) => new Date(date).getTime());
  const max = Math.max(...times);
  return dateFormatToString(new Date(max));
};

/** ['2023-01-01', '2023-05-01'] 형식의 string으로 된 날짜 중 가장 작은 날짜를 구함 */
export const getMinDate = (dates: string[]) => {
  const times = dates.map((date) => new Date(date).getTime());
  const max = Math.min(...times);
  return dateFormatToString(new Date(max));
};

/** 서버 결과를 UI 정보에 맞게 맵핑 */
export const resolvePromiseResult = (data: PromiseResultData[]) => {
  const selectedDate = data.map((item) => item.date);

  let minTime = Infinity;
  let maxTime = 0;

  selectedDate.forEach((date) => {
    const time = new Date(date).getTime();
    if (minTime > time) {
      minTime = time;
    }
    if (maxTime < time) {
      maxTime = time;
    }
  });

  const result = {
    minDate: dateFormatToString(new Date(minTime)).split('-'),
    maxDate: dateFormatToString(new Date(maxTime)).split('-'),
  };
  return result;
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

const getCountOfMostSelectedDate = (dateOfResult: PromiseResultData[]) => {
  let maxCount = 0;

  for (const date of dateOfResult) {
    if (!date.count) continue;
    date.count >= maxCount && (maxCount = date.count);
  }

  // const mostSelectedDates =
  //   dateOfResult.filter((item) => item.count === maxCount) ?? [];

  // return mostSelectedDates;
  return maxCount;
};
