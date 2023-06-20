import { CalendarHeader } from '@/component/calendar/molecules';
import { getCalendarData } from '@/util';
import { styled } from 'styled-components';

export const Calendar = () => {
  const date = getCalendarData('2023', '6');
  return (
    <Grid>
      <CalendarHeader />
      <GridItem>SUN</GridItem>
      <GridItem>MON</GridItem>
      <GridItem>TUE</GridItem>
      <GridItem>WED</GridItem>
      <GridItem>THU</GridItem>
      <GridItem>FRI</GridItem>
      <GridItem>SAT</GridItem>
      <GridItem>B</GridItem>
      <GridItem>C</GridItem>
      <GridItem>D</GridItem>
      <GridItem>E</GridItem>
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: 54px;

  width: 320px;
  height: 370px;
  border: 1px solid red;
  gap: 6px;
  :nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 8;
    height: 54px;
  }
`;

const GridItem = styled.div`
  width: 40px;
  border: 1px solid black;
`;
