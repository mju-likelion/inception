import {
  CalendarHeader,
  Date as DateComponent,
  DateHeader,
} from '@/component/calendar/molecules';
import {
  ActiveStatus,
  CalendarData,
  DateRangeLimit,
  PromiseResultData,
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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import padStart from 'lodash/padStart';
import { useRecoilState, useRecoilValue } from 'recoil';
import { calendarState } from '@/store/atoms';
import { getDatesToCalendarData } from '@/util/getDatesToCalendarData';
import { appointmentResultData } from '@/store/atoms/Request';

interface CalendarProps {
  viewType: ViewType;
  /** @example '2023-06-20' */
  minDate?: string;
  maxDate?: string;
  selectableDates?: string[];
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
        />
      );
    case 'select':
      /** @TODO Select Mode 개발하기 */
      return (
        <SelectMode
          checkLimitDate={checkLimitDate}
          changedDateColor={changedDateColor}
          calendarTouchMoveDrag={calendarTouchMoveDrag}
          selectableDates={selectableDates || []}
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
  const setCurrentTouchTargetText = (text: string) => {
    currentTouchTargetText.current = text;
  };

  const handleMouseDown = (date: string) => {
    isMouseDown.current = true;
    currentTouchTargetText.current = date.split('-')[2];
    const changedCalendar = changedDateColor(calendar, date, 'create');
    setCalendar(changedCalendar);
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    currentTouchTargetText.current = undefined;
  };

  const handleMouseEnter = (date: string) => {
    if (!isMouseDown.current) return;
    const changedCalendar = changedDateColor(calendar, date, 'create');
    setCalendar(changedCalendar);
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

type ResultModeProps = BaseCalendarModeProps;
const ResultMode = ({ checkLimitDate, changedDateColor }: ResultModeProps) => {
  const promiseResultData = useRecoilValue(appointmentResultData);
  const [calendarData, setCalendarData] = useState<PromiseResultData[]>();
  const [dateRange, setDateRange] = useState(resolvePromiseResult());

  const [currentDate, setCurrentDate] = useState(dateRange.minDate.slice(0, 2));
  const [calendar, setCalendar] = useRecoilState<CalendarData[]>(calendarState);

  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>(
    checkLimitDate(currentDate, dateRange.minDate, dateRange.maxDate)
  );

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const date = new Date(+currentDate[0], +currentDate[1] - 1); // Date 객체에선 month는 제로베이스임

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

    // @TODO 클릭한 날짜에서 선택된 날짜 정보를 가져오는 api 작성 필요
  };

  useEffect(() => {
    setCalendar(
      getCalendarData(
        dateRange.minDate[0],
        dateRange.minDate[1],
        'result',
        calendarData
      )
    );
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
    setDateRange(resolvePromiseResult(calendarData));
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
}

const SelectMode = ({
  checkLimitDate,
  changedDateColor,
  calendarTouchMoveDrag,
  selectableDates,
}: SelectModeProps) => {
  const resultData = getDatesToCalendarData(selectableDates);
  const { minDate, maxDate } = resolvePromiseResult(resultData);

  /** 현재 날짜 */
  const [currentDate, setCurrentDate] = useState(minDate.slice(0, 2));

  /** 달력 정보 */
  const [calendar, setCalendar] = useRecoilState<CalendarData[]>(calendarState);

  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>(
    checkLimitDate(currentDate, minDate, maxDate)
  );

  /** @TODO atom으로 관리해야할까? */
  const isMouseDown = useRef(false);
  const currentTouchTargetText = useRef<string>();
  const setCurrentTouchTargetText = (text: string) => {
    currentTouchTargetText.current = text;
  };

  const handleMouseDown = (date: string) => {
    isMouseDown.current = true;
    currentTouchTargetText.current = date.split('-')[2];
    const changedCalendar = changedDateColor(calendar, date, 'create');
    setCalendar(changedCalendar);
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    currentTouchTargetText.current = undefined;
  };

  const handleMouseEnter = (date: string) => {
    if (!isMouseDown.current) return;
    const changedCalendar = changedDateColor(calendar, date, 'select');
    setCalendar(changedCalendar);
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
    setCalendar(getCalendarData(minDate[0], minDate[1], 'select', resultData));
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
