import styled from 'styled-components';

interface TimeBlockProps {
  active: boolean;
  onClick?: () => void;
}

export const TimeBlock = ({ active, onClick }: TimeBlockProps) => {
  return <TimeBlockAtom $isActive={active} onClick={onClick} />;
};

const TimeBlockAtom = styled.div<{ $isActive: boolean }>`
  width: 52px;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.mint1 : theme.colors.gray5};
  &:hover {
    background-color: ${({ theme }) => theme.colors.mint2};
  }
`;
