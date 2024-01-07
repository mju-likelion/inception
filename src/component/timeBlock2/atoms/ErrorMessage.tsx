import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { theme } from '@/globalStyle';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <ErrorMessageBlock>
      <Body $color="red">{children}</Body>
    </ErrorMessageBlock>
  );
};

const ErrorMessageBlock = styled.div`
  display: flex;
  width: 220px;
  flex-direction: column;
  margin-top: 12px;
`;

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body3};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;
