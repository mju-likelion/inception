import { useRef } from 'react';
import { GridItem } from '@/component/calendar/atom';
import { Body } from '@/component/@share';

export const DateHeader = () => {
  const Dates = useRef(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);
  return (
    <>
      {Dates.current.map((date) => {
        return (
          <GridItem key={date}>
            <Body ag="Body4" color="gray3">
              {date}
            </Body>
          </GridItem>
        );
      })}
    </>
  );
};
