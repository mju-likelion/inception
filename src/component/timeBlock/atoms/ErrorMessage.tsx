import { Body } from '@/component/@share';
import styled from 'styled-components';
import { PropsWithChildren } from 'react';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <ErrorMessageBlock>
      <Body ag="Body3" color="red" align="left">
        {children}
      </Body>
    </ErrorMessageBlock>
  );
};

const ErrorMessageBlock = styled.div`
  display: flex;
  width: 220px;
  flex-direction: column;
  margin-top: 12px;
`;
