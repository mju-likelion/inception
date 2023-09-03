import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { theme } from '@/globalStyle';

export const Time = ({ children }: PropsWithChildren) => {
  return (
    <TimeBlock>
      <Body $color="gray3">{children}</Body>
    </TimeBlock>
  );
};

const TimeBlock = styled.div`
  display: flex;
  width: 42px;
  height: 46px;
  flex-direction: column;
  justify-content: center;
`;

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body3};
  letter-spacing: 0;
  text-align: right;
  word-break: keep-all;
`;
