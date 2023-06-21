import { CalendarData } from '@/types';
import { GridItem } from '@/component/calendar/atom';
import { theme } from '@/globalStyle';

interface DateProps {
  calendarData: CalendarData[];
}

export const Date = ({ calendarData }: DateProps) => {
  return (
    <>
      {calendarData.map((data) => {
        const date = data.date.split('-')[2];
        const removeZeroPadDate = +date < 10 ? date[1] : date;

        /** @Test 날짜 컴포넌트 상태 테스트용. disable, active, highlight */
        // const dateColor: keyof typeof theme.colors = 'mint1';
        const dateColor: keyof typeof theme.colors = 'gray1';
        // const dateColor: keyof typeof theme.colors = 'gray4';

        return (
          <GridItem key={data.date} isDate dateColor={dateColor}>
            <div>
              <p>{removeZeroPadDate}</p>
            </div>
          </GridItem>
        );
      })}
    </>
  );
};
