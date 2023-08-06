import { useMemo, useState } from 'react';
import { Count, GridItem } from '@/component/calendar/atom';
import { CalendarData, ViewType } from '@/types';
import { styled } from 'styled-components';

interface DateProps {
  calendarData: CalendarData[];
  currentDate: string[];
  viewType: ViewType;
  handleMouseEnter?: (date: string) => void;
  handleMouseDown: (date: string) => void;
}

const DateComponent = ({
  calendarData,
  currentDate,
  viewType,
  handleMouseEnter,
  handleMouseDown,
}: DateProps) => {
  const showDates = useMemo(() => {
    const filterdCalendarData = calendarData.filter((data) => {
      const date = data.date.split('-');
      return +date[0] === +currentDate[0] && +date[1] === +currentDate[1];
    });
    return filterdCalendarData;
  }, [calendarData, currentDate]);

  const [currentFocusItem, setCurrentFocusItem] = useState<HTMLElement>();

  const onMouseDown = ({
    buttonEl,
    date,
  }: {
    buttonEl?: HTMLElement | null | undefined;
    date: string;
  }) => {
    buttonEl && setCurrentFocusItem(buttonEl);
    handleMouseDown(date);
  };
  const onMouseEnter = (date: string) => {
    handleMouseEnter && handleMouseEnter(date);
  };

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
          date: data.date,
          activeStatus: data.activeStatus,
          viewType: viewType,
        };

        return (
          <GridItem
            key={data.date}
            dateOptions={dateOptions}
            handleMouseDown={(buttonEl: HTMLElement | null | undefined) =>
              onMouseDown({ buttonEl, date: data.date })
            }
            handleMouseEnter={() => onMouseEnter(data.date)}
            currentFocusItem={currentFocusItem}
          >
            {/* elementFromPoint를 찾을 때 기준점을 class === 'gridInner로 한다. */}
            <div className="gridItemInner">
              <p>{removeZeroPadDate}</p>
              {viewType === 'result' && data.count && (
                <Count count={data.count} activeStatus={data.activeStatus} />
              )}
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

const Wrapper = styled.div`
  display: grid;
  width: inherit;
  height: 100%;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  grid-gap: 12px 6px;
  margin-bottom: 16px;
  grid-template-rows: auto;
`;
