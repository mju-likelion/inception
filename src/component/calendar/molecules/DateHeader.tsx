import { useRef } from 'react';
import { GridItem } from '@/component/calendar/atom';
import { Body } from '@/component/@share';
import { styled } from 'styled-components';

export const DateHeader = () => {
  const Dates = useRef(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);
  return (
    <Wrapper>
      {Dates.current.map((date) => {
        return (
          <GridItem key={date} disabled>
            <Body ag="Body4" color="gray3" align="center">
              {date}
            </Body>
          </GridItem>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(40px, 1fr));
  height: 20px;
  gap: 6px;
  margin: 15px 0;
`;
