/* date = 일자 데이터, day = 요일 데이터 */
import { ActiveStatus, CalendarData, SelectedDate, ViewType } from '@/types';
import padStart from 'lodash/padStart';

/** 월별 캘린더 기본 정보를 반환한다. */
export const getCalendarData = (
  year: string,
  month: string,
  viewType: ViewType,
  appointmentResult?: SelectedDate[],
  calendarState?: CalendarData[], // select mode에서 기존에 선택한 값을 다시 적용시키기 위해 사용
  prevCalendarDataExist?: boolean // 이전 값이 존재하는지 판별
): CalendarData[] => {
  const days = calcDaysByYearMonth(year, month);

  // 가장 많이 선택된 횟수로 status 구하기 위해 사용
  const mostSelectedCount =
    appointmentResult && getCountOfMostSelectedDate(appointmentResult);

  // 이미 선택된 값이 있다면 해당 state를 사용
  if (
    viewType === 'select' &&
    prevCalendarDataExist &&
    calendarState &&
    calendarState?.length > 0
  ) {
    return calendarState;
  }

  const calendarDatas = days.map((day) => {
    const date = `${year}-${padStart(month, 2, '0')}-${day}`;
    let activeStatus: ActiveStatus = 'default';

    const dataOfSelectedDate = appointmentResult?.find(
      (result) => result.date === date
    );

    if (viewType === 'result') {
      // 가장 많이 선택된 값에 하이라이트
      if (
        dataOfSelectedDate &&
        mostSelectedCount === dataOfSelectedDate.count
      ) {
        activeStatus = 'active';
      }

      // 선택되었지만 1개 이하로 선택받았는지 확인
      if (
        dataOfSelectedDate?.count === undefined ||
        dataOfSelectedDate.count <= 1
      ) {
        activeStatus = 'disabled';
      }
    }

    // 현재 날짜의 이전 날짜는 disable 처리
    if (
      viewType !== 'result' &&
      new Date(date) < new Date(dateFormatToString(new Date()))
    ) {
      activeStatus = 'disabled';
    }

    if (appointmentResult && !dataOfSelectedDate) {
      activeStatus = 'disabled';
    }

    return {
      date: date,
      day: convertDayNumberToString(new Date(+year, +month - 1, +day).getDay()),
      activeStatus: activeStatus,
      count: dataOfSelectedDate?.count,
    } as CalendarData;
  });

  return calendarDatas;
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
export const resolvePromiseResult = (data?: SelectedDate[]) => {
  if (!data) {
    const date = dateFormatToString(new Date());
    return {
      minDate: date.split('-'),
      maxDate: date.split('-'),
    };
  }

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

const getCountOfMostSelectedDate = (dateOfResult: SelectedDate[]) => {
  let maxCount = 0;

  for (const date of dateOfResult) {
    if (!date.count) continue;
    date.count >= maxCount && (maxCount = date.count);
  }

  return maxCount;
};

export const mergeEnableTimesToDates = (
  dates: string[],
  enableTimes: { [key: string]: number }
): SelectedDate[] => {
  const resultData: SelectedDate[] = dates.map((date) => {
    return {
      date: date,
      status: 'default',
      count: enableTimes[date],
    };
  });

  return resultData;
};
