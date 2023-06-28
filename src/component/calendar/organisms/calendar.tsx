import { ButtonSmall } from '@/component/@share';
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

  /** @TODO GridFooter는 result === on 일때만 보여준다. GridHeader, GridFooter는 molecules로 관리해야될 것 같다. */
  return (
    <Grid>
      <GridHeader>
        <CalendarHeader
          currentDate={currentDate}
          handleChangeCalendar={handleChangeCalendar}
        />
      </GridHeader>
      <GridBody>
        <DateHeader />
        <DateComponent
          calendarData={calendar}
          currentDate={currentDate}
          handleClickDate={handleClickDate}
        />
      </GridBody>
      <GridFooter>
        <ButtonSmall>약속 수정</ButtonSmall>
      </GridFooter>
    </Grid>
  );
};

const Grid = styled.div`
  border: 1px solid red;
  width: 320px;
`;

const GridHeader = styled.div`
  height: 54px;
  display: flex;
  align-items: center;
`;

const GridBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: 50px auto;
  width: 320px;
  gap: 6px;
`;

const GridFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 71px;
  align-items: center;
`;
