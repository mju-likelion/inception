import { isMouseDownState } from '@/store/atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useWindowResize } from '@/hooks';
import { devices } from '@/globalStyle';
import { Toast } from '@/component/@share';
import { toastState, currentToastType } from '@/store/atoms';

interface TimeBlockProps {
  active: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const TimeBlock = ({ active, onClick, disabled }: TimeBlockProps) => {
  const [isToastOpened, setIsToastOpened] = useRecoilState(toastState);
  const [toastType, setToastType] = useRecoilState(currentToastType);
  const [isMouseDown, setIsMouseDown] = useRecoilState(isMouseDownState);

  const windowSize = useWindowResize();

  const handleDisabledBlock = () => {
    setIsToastOpened(true);
    setToastType('timeBlock');
  };

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
    <>
      {disabled ? (
        <>
          <DisabledTimeBlock onClick={handleDisabledBlock} />
          {isToastOpened && toastType === 'timeBlock' && (
            <Toast
              status={'error'}
              toastType={toastType}
              descriptionActive="error"
            />
          )}
        </>
      ) : (
        <TimeBlockAtom
          $isActive={active}
          onPointerDown={() => mouseDown()}
          onPointerEnter={() => mouseEnter()}
          onClick={() => windowSize.width < devices.web && onClick()}
        />
      )}
    </>
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

const DisabledTimeBlock = styled.button`
  touch-action: none;
  width: 52px;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray5};
`;
