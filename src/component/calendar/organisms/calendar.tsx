import {
  CalendarHeader,
  Date as DateComponent,
  DateHeader,
} from '@/component/calendar/molecules';
import { CalendarData } from '@/types';
import { getCalendarData } from '@/util';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

export interface DateInfo extends CalendarData {
  activeStatus: ActiveStatus;
}

export type ActiveStatus = 'disabled' | 'default' | 'active';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(['2023', '6']);
  const [calendarData, setCalendarData] = useState(() =>
    getCalendarData(currentDate[0], currentDate[1])
  );
  const [dates, setDates] = useState<DateInfo[]>(
    calendarData.map((date) => {
      return { ...date, activeStatus: 'default' };
    })
  );

  const handleClickDate = (date?: string) => {
    if (!date) return null;

    const changedDateColor = dates.map((value) => {
      if (value.date === date) {
        return {
          ...value,
          activeStatus: value.activeStatus === 'active' ? 'default' : 'active',
        } as DateInfo;
      } else {
        return value;
      }
    });

    setDates(changedDateColor);
    console.log(changedDateColor);
  };

  const handleChangeCalendar = (type: 'prev' | 'next') => {
    const [year, month] = currentDate;
    const date = new Date(+year, +month - 1); // Date 객체에선 month는 제로베이스임
    if (type === 'prev') {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    setCurrentDate([`${date.getFullYear()}`, `${date.getMonth() + 1}`]);
  };

  useEffect(() => {
    const [year, month] = currentDate;
    const changedCalendar = getCalendarData(year, month);
    setCalendarData(changedCalendar);
    setDates(
      changedCalendar.map((date) => {
        return { ...date, activeStatus: 'default' } as DateInfo;
      })
    );
  }, [currentDate]);

  /** @TODO 현재 달력 옮길 시 기존에 선택한 정보가 없어지고 있다. 이를 유지할 수 있도록 방법 고안 필요 */
  return (
    <Grid>
      <CalendarHeader
        currentDate={currentDate}
        handleChangeCalendar={handleChangeCalendar}
      />
      <DateHeader />
      <DateComponent calendarData={dates} handleClickDate={handleClickDate} />
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: 54px 50px repeat(6, 40px);

  width: 320px;
  height: 370px;
  border: 1px solid red;
  gap: 6px;
  :nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 8;
  }
`;
