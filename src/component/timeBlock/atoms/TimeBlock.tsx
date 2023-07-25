import { IsMouseDownAtom } from '@/store/atoms/TimeBlock/isMouseDown';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
interface TimeBlockProps {
  active: boolean;
  onClick: () => void;
}

export const TimeBlock = ({ active, onClick }: TimeBlockProps) => {
  const [isMouseDown, setIsMouseDown] = useRecoilState(IsMouseDownAtom);
  const mouseDown = () => {
    if (!isMouseDown) {
      onClick();
    }
    setIsMouseDown(true);
  };

  const mouseEnter = () => {
    if (isMouseDown) {
      onClick();
    }
  };

  return (
    <TimeBlockAtom
      $isActive={active}
      onMouseEnter={() => mouseEnter()}
      onMouseDown={() => mouseDown()}
      onTouchStart={() => mouseEnter()}
      onTouchEnd={() => mouseDown()}
    />
  );
};

const TimeBlockAtom = styled.button<{ $isActive: boolean }>`
  width: 52px;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.mint1 : theme.colors.gray5};
  &:hover {
    background-color: ${({ theme }) => theme.colors.mint2};
  }
`;
