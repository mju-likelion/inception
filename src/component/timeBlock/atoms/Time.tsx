import { Body } from '@/component/@share';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export const Time = ({ children }: PropsWithChildren) => {
  return (
    <TimeBlock>
      <Body ag="Body3" color="gray3" align="right">
        {children}
      </Body>
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
