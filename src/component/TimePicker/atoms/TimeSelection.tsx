import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface TimeSelectionProps {
  $isSelected?: boolean;
  onClick: () => void;
}

export const TimeSelection = ({
  $isSelected = false,
  onClick,
  children,
}: PropsWithChildren<TimeSelectionProps>) => {
  return (
    <Container onClick={onClick} $isSelected={$isSelected}>
      {children}
    </Container>
  );
};

const Container = styled.li<{ $isSelected: boolean }>`
  width: 116px;
  height: 44px;
  padding: 12px;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.gray5 : theme.colors.white};
  border-radius: 8px;
  ${({ theme }) => theme.typographies.body1.regular};
  color: ${({ theme }) => theme.colors.gray1};
  text-align: left;
  font-weight: ${({ $isSelected }) => $isSelected && 700};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`;
