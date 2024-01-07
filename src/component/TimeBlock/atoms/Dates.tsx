import styled from 'styled-components';
import { PropsWithChildren } from 'react';

interface DateProps {
  isActive: boolean;
}

export const Dates = ({ children, isActive }: PropsWithChildren<DateProps>) => {
  return (
    <DatesBlock>
      <Date $isActive={isActive}>{children}</Date>
    </DatesBlock>
  );
};

const DatesBlock = styled.div`
  display: flex;
  width: 52px;
  flex-direction: column;
  justify-content: center;
`;

const Date = styled.div<{ $isActive: boolean }>`
  ${({ theme }) => theme.typographies.body3}
  text-align: center;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.mint1 : theme.colors.gray3};
`;
