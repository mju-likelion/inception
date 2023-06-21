import {
  CalendarHeader,
  Date,
  DateHeader,
} from '@/component/calendar/molecules';
import { getCalendarData } from '@/util';
import { styled } from 'styled-components';

export const Calendar = () => {
  const calendarData = getCalendarData('2023', '6');

  return (
    <Grid>
      <CalendarHeader />
      <DateHeader />
      <Date calendarData={calendarData} />
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: 54px 50px repeat(5, 40px);

  width: 320px;
  height: 370px;
  border: 1px solid red;
  gap: 6px;
  :nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 8;
  }
`;
