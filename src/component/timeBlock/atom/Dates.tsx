import { Body } from '@/component/@share';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export const Dates = ({ children }: PropsWithChildren) => {
  return (
    <DatesBlock>
      <Body ag="Body3" color="gray3" align="center">
        {children}
      </Body>
    </DatesBlock>
  );
};

const DatesBlock = styled.div`
  display: flex;
  width: 52px;
  flex-direction: column;
  justify-content: center;
`;
