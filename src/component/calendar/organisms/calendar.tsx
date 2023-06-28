import {
  CalendarHeader,
  Date as DateComponent,
  DateHeader,
} from '@/component/calendar/molecules';
import { CalendarData } from '@/types';
import { getCalendarData, isDuplicatedDate } from '@/util';
import { useState } from 'react';
import { styled } from 'styled-components';

export const Calendar = () => {
  // 방장이 신규 등록 시에는 항상 default, 약속시간을 선택할 때는 서버에서 내려온 데이터에 따라 default, disable 상태가 다르다.
  const [currentDate, setCurrentDate] = useState(['2023', '6']); // 항상 현재 년,월을 보여주는가??
  const [calendar, setCalendar] = useState<CalendarData[]>(() =>
    getCalendarData(currentDate[0], currentDate[1])
  );

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

    if (
      !isDuplicatedDate(calendar, { year: changedYear, month: changedMonth })
    ) {
      setCalendar((prev) => prev.concat(changedCalendar));
    }
  };

  return (
    <Grid>
      <CalendarHeader
        currentDate={currentDate}
        handleChangeCalendar={handleChangeCalendar}
      />
      <DateHeader />
      <DateComponent
        calendarData={calendar}
        currentDate={currentDate}
        handleClickDate={handleClickDate}
      />
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
