import { useMemo } from 'react';
import { Count, GridItem } from '@/component/calendar/atom';
import { theme } from '@/globalStyle';
import { ActiveStatus, CalendarData } from '@/types';
import { styled } from 'styled-components';

interface DateProps {
  calendarData: CalendarData[];
  currentDate: string[];
  handleClickDate: (date?: string) => void;
}

const DateComponent = ({
  calendarData,
  currentDate,
  handleClickDate,
}: DateProps) => {
  const showDates = useMemo(() => {
    const filterdCalendarData = calendarData.filter((data) => {
      const date = data.date.split('-');
      return +date[0] === +currentDate[0] && +date[1] === +currentDate[1];
    });
    return filterdCalendarData;
  }, [calendarData, currentDate]);

  return (
    <Wrapper>
      {blankGrid(showDates).map((blank) => {
        return blank;
      })}

      {showDates.map((data) => {
        const date = data.date.split('-')[2];
        const removeZeroPadDate = +date < 10 ? date[1] : date;
        const dateOptions = {
          $isDate: true,
          dateColor: getGridColor(data.activeStatus),
          date: data.date,
        };

        return (
          <GridItem
            key={data.date}
            dateOptions={dateOptions}
            handleClickDate={handleClickDate}
          >
            <div>
              <p>{removeZeroPadDate}</p>
              {/* 결과 보기 화면에서만 Count 출력하기 */}
              <Count count={3} activeStatus={data.activeStatus} />
            </div>
          </GridItem>
        );
      })}
    </Wrapper>
  );
};
export { DateComponent as Date };

const blankGrid = (calendarData: CalendarData[]) => {
  const startDay = new Date(calendarData[0].date).getDay();
  const blankGrids = [];

  for (let i = 0; i < startDay; i++) {
    blankGrids.push(<GridItem key={i} disabled />);
  }

  return blankGrids;
};

const getGridColor = (
  activeStatus: ActiveStatus
): keyof typeof theme.colors => {
  switch (activeStatus) {
    case 'active':
      return 'mint1';
    case 'disabled':
      return 'gray4';
    default:
      return 'gray1';
  }
};

const Wrapper = styled.div`
  display: grid;
  width: inherit;

  /* height: calc(100% - 54px - 16px); */
  height: 100%;

  grid-template-columns: repeat(7, minmax(40px, 1fr));
  grid-gap: 12px 6px;

  margin-bottom: 16px;

  grid-template-rows: auto;
  @media ${({ theme }) => theme.size.mobile} {
    /* grid-template-rows: repeat(auto-fit, minmax(40px, 79px)); */
    grid-template-rows: repeat(auto-fit, minmax(40px, 1fr));
  }
  @media ${({ theme }) => theme.size.tablet} {
  }
  @media ${({ theme }) => theme.size.web} {
  }
`;
