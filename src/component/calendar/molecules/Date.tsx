import { GridItem } from '@/component/calendar/atom';
import { theme } from '@/globalStyle';
import { ActiveStatus, DateInfo } from '@/component/calendar/organisms';

interface DateProps {
  calendarData: DateInfo[];
  handleClickDate: (date?: string) => void;
}

const DateComponent = ({ calendarData, handleClickDate }: DateProps) => {
  return (
    <>
      {blankGrid(calendarData).map((blank) => {
        return blank;
      })}

      {calendarData.map((data) => {
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
            </div>
          </GridItem>
        );
      })}
    </>
  );
};
export { DateComponent as Date };

const blankGrid = (calendarData: DateInfo[]) => {
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
