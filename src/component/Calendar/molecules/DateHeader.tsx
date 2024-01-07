import { useRef } from 'react';
import { GridItem } from '@/component/Calendar/atom';
import { styled } from 'styled-components';
import { theme } from '@/globalStyle';

export const DateHeader = () => {
  const Dates = useRef(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);
  return (
    <Wrapper>
      {Dates.current.map((date) => {
        return (
          <GridItem key={date} disabled>
            <Body $color="gray3">{date}</Body>
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

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  letter-spacing: 0;
  text-align: center;
  word-break: keep-all;
  ${({ theme }) => theme.typographies.body4};
  @media ${({ theme }) => theme.size.web} {
    ${({ theme }) => theme.typographies.body2.semiBold};
  }
`;
