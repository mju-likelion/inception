import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface TimeSelectionProps {
  isSelected?: boolean;
}

export const TimeSelection = ({
  isSelected = false,
  children,
}: PropsWithChildren<TimeSelectionProps>) => {
  return <Container isSelected={isSelected}>{children}</Container>;
};

const Container = styled.button<{ isSelected: boolean }>`
  width: 116px;
  height: 44px;
  padding: 12px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray5 : theme.colors.white};
  border-radius: 8px;
  ${({ theme }) => theme.typographies.body1.regular};
  color: ${({ theme }) => theme.colors.gray1};
  font-weight: ${({ isSelected }) => isSelected && 700};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`;
