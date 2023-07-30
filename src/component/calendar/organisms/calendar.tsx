import { ButtonSmall } from '@/component/@share';
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
  resolvePromiseResult,
} from '@/util';
import padStart from 'lodash/padStart';
import { useState } from 'react';
import { styled } from 'styled-components';
import { promiseResultMockData } from '../data';

/**
 * 공통
 * min, max 날짜가 있다. 해당 정보는 서버에서 내려온다.
 * min이거나 max일 때 화살표는 disable 처리된다.
 * 특정 날짜에 선택한 사람들이 몇 명인지 표시하는 count가 있다.
 * count 중 가장 숫자가 큰 것은 하이라이트가 발생한다.
 * count 공동 1위 발생 시 공동 1위 전부 하이라이트 처리한다.
 *
 * 날짜 입력 화면
 * 날짜별 선택한 사람 count를 표시한다.
 * 하이라이트 로직은 위와 동일하다.
 * 클릭시 count 값은 변화 없이 하이라이트만 된다.
 *
 * 결과보기
 * 특정 날짜를 focus 시 컬러가 변하고 제출한 사람이 누구인지 표시된다.
 *
 * 방장이 신규 등록 시에는 항상 default, 약속시간을 선택할 때는 서버에서 내려온 데이터에 따라 default, disable 상태가 다르다.
 *
 * 캘린더를 mode에 따라 나눈 이유
 * mode에 따라 state 방식, 필요한 기능 등 다 다르기 때문에 분리
 * 중복 로직을 최대한 공통화 해야한다.
 */

interface CalendarProps {
  viewType: ViewType;
  /** @example '2023-06-20' */
  minDate?: string;
  maxDate?: string;
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

export const Calendar = ({ viewType, minDate, maxDate }: CalendarProps) => {
  const minimumDate = minDate ?? dateFormatToString(new Date());
  const maximumDate =
    maxDate ?? dateFormatToString(calcDateFewMonth(new Date(), 5)); // 최대 180일

  const splitMinDate = minimumDate.split('-');
  const splitMaxDate = maximumDate.split('-');

  const getActiveStatus: GetActiveStatus = (mode, currentActiveStatus) => {
    if (mode === 'create') {
      switch (currentActiveStatus) {
        case 'default':
          return 'active';
        case 'active':
          return 'default';
      }
    } else if (mode === 'result') {
      return currentActiveStatus;
    } else {
      // select 모드
      return 'disabled';
    }

    return 'disabled';
  };

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

  switch (viewType) {
    case 'create':
      return (
        <CreateMode
          minDate={splitMinDate}
          maxDate={splitMaxDate}
          getActiveStatus={getActiveStatus}
          checkLimitDate={checkLimitDate}
        />
      );
    case 'result':
      return (
        <ResultMode
          getActiveStatus={getActiveStatus}
          checkLimitDate={checkLimitDate}
        />
      );
    case 'select':
      /** @TODO Select Mode 개발하기 */
      return (
        <CreateMode
          minDate={splitMinDate}
          maxDate={splitMaxDate}
          getActiveStatus={getActiveStatus}
          checkLimitDate={checkLimitDate}
        />
      );
    default:
      return <p>viewType: {viewType}은(는) 개발되지 않은 캘린더 모드입니다.</p>;
  }
};

interface BaseCalendarModeProps {
  getActiveStatus: GetActiveStatus;
  checkLimitDate: CheckLimitDate;
}

interface CreateModeProps extends BaseCalendarModeProps {
  minDate: string[];
  maxDate: string[];
}
const CreateMode = ({
  minDate,
  maxDate,
  getActiveStatus,
  checkLimitDate,
}: CreateModeProps) => {
  /** 현재 날짜 */
  const [currentDate, setCurrentDate] = useState(minDate.slice(0, 2));

  // @TODO recoil로 관리되어야할 값
  /** 달력 정보 */
  const [calendar, setCalendar] = useState<CalendarData[]>(() =>
    getCalendarData(minDate[0], minDate[1])
  );

  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>(
    checkLimitDate(currentDate, minDate, maxDate)
  );

  const handleClickDate = (date?: string) => {
    if (!date) return null;

    const changedDateColor = calendar.map((value) =>
      value.date === date
        ? ({
            ...value,
            activeStatus: getActiveStatus('create', value.activeStatus),
          } as CalendarData)
        : value
    );

    setCalendar(changedDateColor);
  };

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const date = new Date(+currentDate[0], +currentDate[1] - 1); // Date 객체에선 month는 제로베이스임

    date.setMonth(type === 'prev' ? date.getMonth() - 1 : date.getMonth() + 1);

    const changedYear = `${date.getFullYear()}`;
    const changedMonth = padStart(`${date.getMonth() + 1}`, 2, '0');
    const changedCalendar = getCalendarData(changedYear, changedMonth);

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

  /** @TODO GridFooter는 result === on 일때만 보여준다. GridHeader, GridFooter는 molecules로 관리해야될 것 같다. */
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
          handleClickDate={handleClickDate}
          viewType={'create'}
        />
      </>
    </Grid>
  );
};

type ResultModeProps = BaseCalendarModeProps;
const ResultMode = ({ getActiveStatus, checkLimitDate }: ResultModeProps) => {
  /** @TODO 데이터 패치 로직으로 변경 필요 */
  const { minDate, maxDate } = resolvePromiseResult(promiseResultMockData);

  const [currentDate, setCurrentDate] = useState(minDate.slice(0, 2));
  const [calendar, setCalendar] = useState<CalendarData[]>(() =>
    getCalendarData(minDate[0], minDate[1], promiseResultMockData)
  );
  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>(
    checkLimitDate(currentDate, minDate, maxDate)
  );

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const date = new Date(+currentDate[0], +currentDate[1] - 1); // Date 객체에선 month는 제로베이스임

    date.setMonth(type === 'prev' ? date.getMonth() - 1 : date.getMonth() + 1);

    const changedYear = `${date.getFullYear()}`;
    const changedMonth = padStart(`${date.getMonth() + 1}`, 2, '0');
    const changedCalendar = getCalendarData(
      changedYear,
      changedMonth,
      promiseResultMockData
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

  const handleClickDate = (date?: string) => {
    if (!date) return null;

    const changedDateColor = calendar.map((value) =>
      value.date === date
        ? ({
            ...value,
            activeStatus: getActiveStatus('result', value.activeStatus),
          } as CalendarData)
        : value
    );

    // @TODO 클릭한 날짜에서 선택된 날짜 정보를 가져오는 api 작성 필요

    setCalendar(changedDateColor);
  };

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
          handleClickDate={handleClickDate}
          viewType="result"
        />
      </>

      <GridFooter>
        <FooterRightWrapper>
          <ButtonSmall>일정 수정</ButtonSmall>
        </FooterRightWrapper>
      </GridFooter>
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

const GridFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 71px;
  align-items: center;
`;

const FooterRightWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 16px;
`;
