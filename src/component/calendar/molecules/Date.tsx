import { useMemo } from 'react';
import { Count, GridItem } from '@/component/calendar/atom';
import { theme } from '@/globalStyle';
import { ActiveStatus, CalendarData } from '@/types';

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
    <>
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
    </>
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
