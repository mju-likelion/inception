import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import padStart from 'lodash/padStart';
import {
  CalendarHeader,
  Date as DateComponent,
  DateHeader,
} from '@/component/Calendar/molecules';
import {
  ActiveStatus,
  CalendarData,
  DateRangeLimit,
  SelectedDate,
  ViewType,
} from '@/types';
import {
  calcDateFewMonth,
  dateFormatToString,
  getCalendarData,
  isDuplicatedDate,
  mergeEnableTimesToDates,
  resolvePromiseResult,
} from '@/util';
import { calendarState } from '@/store/atoms';
import { getDatesToCalendarData } from '@/util/getDatesToCalendarData';
import { appointmentResultData } from '@/store/atoms/Request';
import { FetchMostSelectedTimeForDate } from '@/pages';
import { timeTableState } from '@/store';
import { useGaApi } from '@/hooks/useGA';

interface CalendarProps {
  viewType: ViewType;
  /** @example '2023-06-20' */
  minDate?: string;
  maxDate?: string;
  selectableDates?: string[];
  fetchMostSelectedTimeForDate?: FetchMostSelectedTimeForDate;
  prevCalendarDataExist?: boolean;
}

type GetActiveStatus = (
  mode: ViewType,
  currentActiveStatus: ActiveStatus
) => ActiveStatus;

type CheckLimitDate = (
  currentDate: string[], // ['2023', '01', '20']
  minDate: string[],
  maxDate: string[]
) => {
  start: boolean;
  end: boolean;
};

type ChangeDateColor = (
  calendar: CalendarData[],
  date: string,
  viewType: ViewType
) => CalendarData[];

interface ICalendarTouchMoveDrag {
  event: React.TouchEvent<HTMLDivElement>;
  isMouseDown: boolean;
  previousTarget: string;
  setCurrentTouchTargetText: (target: string) => void;
}

export const Calendar = ({
  viewType,
  minDate,
  maxDate,
  selectableDates,
  fetchMostSelectedTimeForDate,
  prevCalendarDataExist,
}: CalendarProps) => {
  const minimumDate = minDate ?? dateFormatToString(new Date());
  const maximumDate =
    maxDate ?? dateFormatToString(calcDateFewMonth(new Date(), 5)); // 최대 180일

  const splitMinDate = minimumDate.split('-');
  const splitMaxDate = maximumDate.split('-');

  const getActiveStatus: GetActiveStatus = (mode, currentActiveStatus) => {
    if (mode === 'create' || mode === 'select') {
      switch (currentActiveStatus) {
        case 'default':
          return 'active';
        case 'active':
          return 'default';
      }
    } else if (mode === 'result') {
      return currentActiveStatus;
    }

    return 'disabled';
  };

  const changedDateColor = useCallback(
    (calendar: CalendarData[], date: string, viewType: ViewType) => {
      return calendar.map((value) =>
        value.date === date
          ? ({
              ...value,
              activeStatus: getActiveStatus(viewType, value.activeStatus),
            } as CalendarData)
          : value
      );
    },
    []
  );

  const checkLimitDate = (
    currentDate: string[],
    minDate: string[],
    maxDate: string[]
  ) => {
    if (currentDate.length >= 3) currentDate = currentDate.slice(0, 2);
    if (minDate.length >= 3) minDate = minDate.slice(0, 2);
    if (maxDate.length >= 3) maxDate = maxDate.slice(0, 2);

    // 주의! new Date('2023-06') !== new Date('2023-6')
    return {
      start: new Date(currentDate.join('-')) <= new Date(minDate.join('-')),
      end: new Date(currentDate.join('-')) >= new Date(maxDate.join('-')),
    };
  };

  const calendarTouchMoveDrag = ({
    event,
    isMouseDown,
    previousTarget,
    setCurrentTouchTargetText,
  }: ICalendarTouchMoveDrag) => {
    const targetEl = document.elementFromPoint(
      event.touches[0].clientX,
      event.touches[0].clientY
    );
    const targetElDayText = padStart(targetEl?.textContent ?? '', 2, '0');

    if (
      targetEl?.className === 'gridItemInner' &&
      isMouseDown &&
      targetElDayText !== previousTarget
    ) {
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      targetEl.parentElement?.dispatchEvent(event);
      setCurrentTouchTargetText(targetElDayText);
    }
  };

  switch (viewType) {
    case 'create':
      return (
        <CreateMode
          minDate={splitMinDate}
          maxDate={splitMaxDate}
          checkLimitDate={checkLimitDate}
          changedDateColor={changedDateColor}
          calendarTouchMoveDrag={calendarTouchMoveDrag}
        />
      );
    case 'result':
      return (
        <ResultMode
          checkLimitDate={checkLimitDate}
          changedDateColor={changedDateColor}
          fetchMostSelectedTimeForDate={fetchMostSelectedTimeForDate}
        />
      );
    case 'select':
      return (
        <SelectMode
          checkLimitDate={checkLimitDate}
          changedDateColor={changedDateColor}
          calendarTouchMoveDrag={calendarTouchMoveDrag}
          selectableDates={selectableDates || []}
          prevCalendarDataExist={prevCalendarDataExist ?? false}
        />
      );
    default:
      return <p>viewType: {viewType}은(는) 개발되지 않은 캘린더 모드입니다.</p>;
  }
};

interface BaseCalendarModeProps {
  checkLimitDate: CheckLimitDate;
  changedDateColor: ChangeDateColor;
}

interface CreateModeProps extends BaseCalendarModeProps {
  minDate: string[];
  maxDate: string[];
  calendarTouchMoveDrag: (param: ICalendarTouchMoveDrag) => void;
}

const CreateMode = ({
  minDate,
  maxDate,
  checkLimitDate,
  changedDateColor,
  calendarTouchMoveDrag,
}: CreateModeProps) => {
  /** 현재 날짜 */
  const [currentDate, setCurrentDate] = useState(minDate.slice(0, 2));

  /** 달력 정보 */
  const [calendar, setCalendar] = useRecoilState<CalendarData[]>(calendarState);

  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>(
    checkLimitDate(currentDate, minDate, maxDate)
  );

  const isMouseDown = useRef(false);
  const currentTouchTargetText = useRef<string>();
  // ga 전용 코드
  const currentSelectingDates = useRef<CalendarData[]>([]);

  const { gaApi } = useGaApi();

  const setCurrentTouchTargetText = (text: string) => {
    currentTouchTargetText.current = text;
  };

  const handleMouseDown = (date: string) => {
    isMouseDown.current = true;
    currentTouchTargetText.current = date.split('-')[2];
    const changedCalendar = changedDateColor(calendar, date, 'create');
    setCalendar(changedCalendar);

    // ga 전용 코드
    currentSelectingDates.current.push(
      changedCalendar.find((d) => d.date === date)!
    );
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    currentTouchTargetText.current = undefined;

    // ga 전용 코드
    // mouseUp 이 간헐적으로 한 번씩 더 터져서 if 문 처리
    if (currentSelectingDates.current.length) {
      gaApi.sendEvent({
        eventName: 't_click',
        tEventId: 208,
        tPath: '/create-room',
        tTarget: 'calendar_date',
        tDates: JSON.stringify(currentSelectingDates.current),
      });
      currentSelectingDates.current = [];
    }
  };

  const handleMouseEnter = (date: string) => {
    if (!isMouseDown.current) return;
    const changedCalendar = changedDateColor(calendar, date, 'create');
    setCalendar(changedCalendar);

    // ga 전용 코드
    currentSelectingDates.current.push(
      changedCalendar.find((d) => d.date === date)!
    );
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    calendarTouchMoveDrag({
      event,
      isMouseDown: isMouseDown.current,
      previousTarget: currentTouchTargetText.current ?? '',
      setCurrentTouchTargetText,
    });
  };

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const date = new Date(+currentDate[0], +currentDate[1] - 1); // Date 객체에선 month는 제로베이스임

    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 207,
      tPath: '/create-room',
      tTarget: 'move_month',
      tFrom: date.getMonth() + 1,
      tTo: type === 'prev' ? date.getMonth() : date.getMonth() + 2,
      tDirection: type,
    });

    date.setMonth(type === 'prev' ? date.getMonth() - 1 : date.getMonth() + 1);

    const changedYear = `${date.getFullYear()}`;
    const changedMonth = padStart(`${date.getMonth() + 1}`, 2, '0');
    const changedCalendar = getCalendarData(
      changedYear,
      changedMonth,
      'create'
    );

    setCurrentDate([changedYear, changedMonth]);
    setDateRangeLimit(
      checkLimitDate(
        [changedYear, changedMonth],
        minDate.slice(0, 2),
        maxDate.slice(0, 2)
      )
    );

    if (
      !isDuplicatedDate(calendar, { year: changedYear, month: changedMonth })
    ) {
      setCalendar((prev) => prev.concat(changedCalendar));
    }
  };

  useEffect(() => {
    setCalendar(getCalendarData(minDate[0], minDate[1], 'create'));
  }, []);

  /** @TODO GridFooter는 result === on 일때만 보여준다. GridHeader, GridFooter는 molecules로 관리해야될 것 같다. */
  return (
    <Grid
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <GridHeader>
        <CalendarHeader
          currentDate={currentDate}
          dateRangeLimit={dateRangeLimit}
          handleChangeCalendar={handleChangeCalendar}
        />
      </GridHeader>

      <>
        <DateHeader />
        <DateComponent
          calendarData={calendar}
          currentDate={currentDate}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          viewType={'create'}
        />
      </>
    </Grid>
  );
};

interface ResultModeProps extends BaseCalendarModeProps {
  fetchMostSelectedTimeForDate?: FetchMostSelectedTimeForDate;
}
const ResultMode = ({
  checkLimitDate,
  changedDateColor,
  fetchMostSelectedTimeForDate,
}: ResultModeProps) => {
  const promiseResultData = useRecoilValue(appointmentResultData);
  const [calendarData, setCalendarData] = useState<SelectedDate[]>();
  const [dateRange, setDateRange] = useState(resolvePromiseResult());

  const [currentDate, setCurrentDate] = useState(dateRange.minDate.slice(0, 2));
  const [calendar, setCalendar] = useRecoilState<CalendarData[]>(calendarState);

  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>(
    checkLimitDate(currentDate, dateRange.minDate, dateRange.maxDate)
  );

  const highestVotedCount = useMemo(() => {
    if (!calendarData) return 0;
    return Math.max(...calendarData.map((item) => item.count!));
  }, [calendarData]);

  const { gaApi } = useGaApi();

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const date = new Date(+currentDate[0], +currentDate[1] - 1); // Date 객체에선 month는 제로베이스임

    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 221,
      tPath: '/room-result',
      tTarget: 'move_month',
      tFrom: date.getMonth() + 1,
      tTo: type === 'prev' ? date.getMonth() : date.getMonth() + 2,
      tDirection: type,
    });

    date.setMonth(type === 'prev' ? date.getMonth() - 1 : date.getMonth() + 1);

    const changedYear = `${date.getFullYear()}`;
    const changedMonth = padStart(`${date.getMonth() + 1}`, 2, '0');
    const changedCalendar = getCalendarData(
      changedYear,
      changedMonth,
      'result',
      calendarData
    );

    setCurrentDate([changedYear, changedMonth]);
    setDateRangeLimit(
      checkLimitDate(
        [changedYear, changedMonth],
        dateRange.minDate.slice(0, 2),
        dateRange.maxDate.slice(0, 2)
      )
    );

    if (
      !isDuplicatedDate(calendar, { year: changedYear, month: changedMonth })
    ) {
      setCalendar((prev) => prev.concat(changedCalendar));
    }
  };

  const handleMouseDown = (date?: string) => {
    if (!date) return null;

    const changedCalendar = changedDateColor(calendar, date, 'result');
    setCalendar(changedCalendar);

    const clickedDateInfo = calendar.find((item) => item.date === date);
    const count = clickedDateInfo?.count;
    if (count && count >= 2) {
      fetchMostSelectedTimeForDate?.(date);
    }

    // ga 전용 코드
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 222,
      tPath: '/room-result',
      tTarget: 'calendar_date',
      tDate: JSON.stringify(clickedDateInfo!),
      tIsEveryoneSelecting: highestVotedCount === count,
    });
  };

  useEffect(() => {
    const calendar = getCalendarData(
      dateRange.minDate[0],
      dateRange.minDate[1],
      'result',
      calendarData
    );
    setCalendar(calendar);

    // currentMonth가 선택가능한 날짜의 월보다 작을 때 currentMonth 업데이트
    const currentMonth = currentDate.join('-');
    const calendarMonth = calendar.map((item) => item.date)[0].slice(0, 7);
    if (new Date(currentMonth) < new Date(calendarMonth)) {
      setCurrentDate(calendarMonth.split('-'));
    }
  }, [dateRange, calendarData]);

  useEffect(() => {
    if (promiseResultData) {
      setCalendarData(
        mergeEnableTimesToDates(
          promiseResultData.dates,
          promiseResultData.enableTimes
        )
      );
    }
  }, [promiseResultData]);

  useEffect(() => {
    const data = resolvePromiseResult(calendarData);
    setDateRange(data);

    const changeCheckLimitDate = checkLimitDate(
      currentDate,
      data.minDate,
      data.maxDate
    );
    setDateRangeLimit(changeCheckLimitDate);
  }, [calendarData]);

  return (
    <Grid>
      <GridHeader>
        <CalendarHeader
          currentDate={currentDate}
          dateRangeLimit={dateRangeLimit}
          handleChangeCalendar={handleChangeCalendar}
        />
      </GridHeader>

      <>
        <DateHeader />
        <DateComponent
          calendarData={calendar}
          currentDate={currentDate}
          handleMouseDown={handleMouseDown}
          viewType="result"
        />
      </>
    </Grid>
  );
};

interface SelectModeProps extends BaseCalendarModeProps {
  calendarTouchMoveDrag: (param: ICalendarTouchMoveDrag) => void;
  selectableDates: string[];
  prevCalendarDataExist: boolean;
}

const SelectMode = ({
  checkLimitDate,
  changedDateColor,
  calendarTouchMoveDrag,
  selectableDates,
  prevCalendarDataExist,
}: SelectModeProps) => {
  const [timeTable, setTimeTable] = useRecoilState(timeTableState);

  const resultData = getDatesToCalendarData(selectableDates);
  const { minDate, maxDate } = resolvePromiseResult(resultData);

  /** 현재 날짜 */
  const [currentDate, setCurrentDate] = useState(minDate.slice(0, 2));

  /** 달력 정보 */
  const [calendar, setCalendar] = useRecoilState<CalendarData[]>(calendarState);

  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>(
    checkLimitDate(currentDate, minDate, maxDate)
  );

  const isMouseDown = useRef(false);
  const currentTouchTargetText = useRef<string>();
  // ga 전용 코드
  const currentSelectingDates = useRef<CalendarData[]>([]);

  const { gaApi } = useGaApi();

  const setCurrentTouchTargetText = (text: string) => {
    currentTouchTargetText.current = text;
  };

  const handleMouseDown = (date: string) => {
    isMouseDown.current = true;
    currentTouchTargetText.current = date.split('-')[2];
    const changedCalendar = changedDateColor(calendar, date, 'create');
    setCalendar(changedCalendar);
    // 캘린더 날짜 변경에 따라 타임 테이블 초기화
    setTimeTable([]);

    // ga 전용 코드
    currentSelectingDates.current.push(
      changedCalendar.find((d) => d.date === date)!
    );
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    currentTouchTargetText.current = undefined;

    // ga 전용 코드
    // mouseUp 이 간헐적으로 한 번씩 더 터져서 if 문 처리
    if (currentSelectingDates.current.length) {
      gaApi.sendEvent({
        eventName: 't_click',
        tEventId: 213,
        tPath: '/vote-room',
        tTarget: 'calendar_date',
        tDates: JSON.stringify(currentSelectingDates.current),
      });
      currentSelectingDates.current = [];
    }
  };

  const handleMouseEnter = (date: string) => {
    if (!isMouseDown.current) return;
    const changedCalendar = changedDateColor(calendar, date, 'select');
    setCalendar(changedCalendar);
    // 캘린더 날짜 변경에 따라 타임 테이블 초기화
    setTimeTable([]);

    // ga 전용 코드
    currentSelectingDates.current.push(
      changedCalendar.find((d) => d.date === date)!
    );
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    calendarTouchMoveDrag({
      event,
      isMouseDown: isMouseDown.current,
      previousTarget: currentTouchTargetText.current ?? '',
      setCurrentTouchTargetText,
    });
  };

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const date = new Date(+currentDate[0], +currentDate[1] - 1); // Date 객체에선 month는 제로베이스임

    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 212,
      tPath: '/vote-room',
      tTarget: 'move_month',
      tFrom: date.getMonth() + 1,
      tTo: type === 'prev' ? date.getMonth() : date.getMonth() + 2,
      tDirection: type,
    });

    date.setMonth(type === 'prev' ? date.getMonth() - 1 : date.getMonth() + 1);

    const changedYear = `${date.getFullYear()}`;
    const changedMonth = padStart(`${date.getMonth() + 1}`, 2, '0');
    const changedCalendar = getCalendarData(
      changedYear,
      changedMonth,
      'select',
      resultData
    );

    setCurrentDate([changedYear, changedMonth]);
    setDateRangeLimit(
      checkLimitDate(
        [changedYear, changedMonth],
        minDate.slice(0, 2),
        maxDate.slice(0, 2)
      )
    );

    if (
      !isDuplicatedDate(calendar, { year: changedYear, month: changedMonth })
    ) {
      setCalendar((prev) => prev.concat(changedCalendar));
    }
  };

  useEffect(() => {
    const data = getCalendarData(
      minDate[0],
      minDate[1],
      'select',
      resultData,
      calendar,
      prevCalendarDataExist
    );
    setCalendar(data);
  }, []);

  /** @TODO GridFooter는 result === on 일때만 보여준다. GridHeader, GridFooter는 molecules로 관리해야될 것 같다. */
  return (
    <Grid
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <GridHeader>
        <CalendarHeader
          currentDate={currentDate}
          dateRangeLimit={dateRangeLimit}
          handleChangeCalendar={handleChangeCalendar}
        />
      </GridHeader>

      <>
        <DateHeader />
        <DateComponent
          calendarData={calendar}
          currentDate={currentDate}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
          viewType={'select'}
        />
      </>
    </Grid>
  );
};

const Grid = styled.div`
  display: flex;
  flex-direction: column;

  aspect-ratio: 1/1.15;

  min-width: 320px;
  max-width: 500px;

  min-height: 368px;
  max-height: 668px;
`;

const GridHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
`;
