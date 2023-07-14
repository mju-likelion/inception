import { ButtonSmall } from '@/component/@share';
import {
  CalendarHeader,
  Date as DateComponent,
  DateHeader,
} from '@/component/calendar/molecules';
import { CalendarData, DateRangeLimit } from '@/types';
import {
  calcDateFewMonth,
  dateFormatToString,
  getCalendarData,
  getWeekCount,
  isDuplicatedDate,
} from '@/util';
import { useState } from 'react';
import { styled } from 'styled-components';

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
 */

interface Props {
  viewType: 'result' | 'create' | 'select';
  /** @example '2023-06-20' */
  minDate?: string;
  maxDate?: string;
}

export const Calendar = ({
  viewType,
  minDate = dateFormatToString(new Date()),
  maxDate = dateFormatToString(calcDateFewMonth(new Date(), 5)), // 최대 180일
}: Props) => {
  const splitMinDate = minDate.split('-');
  const splitMaxDate = maxDate.split('-');

  /** 현재 날짜 */
  const [currentDate, setCurrentDate] = useState(splitMinDate.slice(0, 2));

  /** 달력 정보 */
  const [calendar, setCalendar] = useState<CalendarData[]>(() =>
    getCalendarData(splitMinDate[0], splitMinDate[1])
  );

  const [weekCount, setWeekCount] = useState(
    getWeekCount(splitMinDate[0], splitMinDate[1])
  );

  const [dateRangeLimit, setDateRangeLimit] = useState<DateRangeLimit>({
    start: new Date(currentDate.join('-')) <= new Date(splitMinDate.join('-')),
    end: new Date(currentDate.join('-')) >= new Date(splitMaxDate.join('-')),
  });

  const handleClickDate = (date?: string) => {
    if (!date) return null;

    const changedDateColor = calendar.map((value) =>
      value.date === date
        ? ({
            ...value,
            activeStatus:
              value.activeStatus === 'active' ? 'default' : 'active',
          } as CalendarData)
        : value
    );

    setCalendar(changedDateColor);
  };

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const date = new Date(+currentDate[0], +currentDate[1] - 1); // Date 객체에선 month는 제로베이스임

    date.setMonth(type === 'prev' ? date.getMonth() - 1 : date.getMonth() + 1);

    const changedYear = `${date.getFullYear()}`;
    const changedMonth = `${date.getMonth() + 1}`;
    const changedCalendar = getCalendarData(changedYear, changedMonth);

    setCurrentDate([changedYear, changedMonth]);
    setDateRangeLimit({
      start:
        new Date(`${changedYear}-${changedMonth}`) <=
        new Date(splitMinDate.slice(0, 2).join('-')),
      end:
        new Date(`${changedYear}-${changedMonth}`) >=
        new Date(splitMaxDate.slice(0, 2).join('-')),
    });

    if (
      !isDuplicatedDate(calendar, { year: changedYear, month: changedMonth })
    ) {
      setCalendar((prev) => prev.concat(changedCalendar));
    }

    setWeekCount(getWeekCount(changedYear, changedMonth));
  };

  /** @TODO GridFooter는 result === on 일때만 보여준다. GridHeader, GridFooter는 molecules로 관리해야될 것 같다. */
  return (
    <Grid $weekCount={weekCount}>
      <GridHeader>
        <CalendarHeader
          currentDate={currentDate}
          dateRangeLimit={dateRangeLimit}
          handleChangeCalendar={handleChangeCalendar}
        />
      </GridHeader>

      <DateHeader />
      <DateComponent
        calendarData={calendar}
        currentDate={currentDate}
        handleClickDate={handleClickDate}
      />

      {viewType === 'result' && (
        <GridFooter>
          <ButtonSmall>약속 수정</ButtonSmall>
        </GridFooter>
      )}
    </Grid>
  );
};

const Grid = styled.div<{ $weekCount: number }>`
  display: flex;
  flex-direction: column;
  border: 1px solid red;

  aspect-ratio: ${({ $weekCount }) => {
    if ($weekCount === 6) {
      return '1/1.3125';
      // return '1/1.484375';
    } else if ($weekCount === 5) {
      return '1/1.15';
    } else {
      return '1/0.9875';
    }
  }};

  min-width: 320px;
  max-width: 500px;

  min-height: 368px;
  max-height: 668px;

  margin-bottom: 500px;
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
