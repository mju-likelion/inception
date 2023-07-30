import { isMouseDownState } from '@/store/atoms/TimeBlock/isMouseDownState';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useWindowResize } from '@/hooks';
import { devices } from '@/globalStyle';

interface TimeBlockProps {
  active: boolean;
  onClick: () => void;
}

export const TimeBlock = ({ active, onClick }: TimeBlockProps) => {
  const windowSize = useWindowResize();

  const [isMouseDown, setIsMouseDown] = useRecoilState(isMouseDownState);
  const mouseDown = () => {
    if (!isMouseDown && windowSize.width >= devices.web) {
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
      onPointerDown={() => mouseDown()}
      onPointerEnter={() => mouseEnter()}
      onClick={() => windowSize.width < devices.web && onClick()}
    />
  );
};

const TimeBlockAtom = styled.button<{ $isActive: boolean }>`
  touch-action: none;
  width: 52px;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.mint1 : theme.colors.gray5};
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.mint2};
    }
  }
`;
