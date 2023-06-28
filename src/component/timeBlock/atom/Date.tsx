import { Body } from '@/component/@share';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export const Date = ({ children }: PropsWithChildren) => {
  return (
    <DateBlock>
      <Body ag="Body3" color="gray3" align="center">
        {children}
      </Body>
    </DateBlock>
  );
};

const DateBlock = styled.div`
  display: flex;
  width: 52px;
  flex-direction: column;
  justify-content: center;
`;
