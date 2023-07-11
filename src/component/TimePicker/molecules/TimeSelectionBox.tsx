import { useState } from 'react';
import styled from 'styled-components';
import { DropDownButton } from '@/component/TimePicker/atoms';
import { SelectionList } from '@/component/TimePicker';

// props 추후 디테일 예정
interface TimeSelectionBoxProps {
  selectedTime: string;
  isError: boolean;
  isDisabled: boolean;
}

export const TimeSelectionBox = ({
  selectedTime,
  isError,
  isDisabled,
}: TimeSelectionBoxProps) => {
  // 아래 변수 및 함수 props로 상위 컴포넌트에서 관리 예정
  const [isOpened, setIsOpened] = useState(false);
  const [time, setTime] = useState(selectedTime);

  const handleClick = (time: string) => {
    setTime(time);
    setIsOpened(false);
  };

  return (
    <Container>
      <Select
        $isError={isError}
        $isOpened={isOpened}
        disabled={isDisabled}
        onClick={() => setIsOpened(!isOpened)}
      >
        {time}
        <DropDownButton />
      </Select>
      {isOpened && (
        <SelectionList selectedTime={time} selectTimeItem={handleClick} />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Select = styled.button<{ $isError: boolean; $isOpened: boolean }>`
  width: 120px;
  height: 48px;
  padding: 12px 8px 12px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-color: ${({ $isError, theme }) => $isError && theme.colors.red};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.typographies.body1.regular}
  color: ${({ theme }) => theme.colors.gray1};

  &:focus {
    border-color: ${({ $isError, theme }) =>
      $isError ? theme.colors.red : theme.colors.gray2};
    border-color: ${({ $isOpened, theme }) => !$isOpened && theme.colors.gray4};
  }

  &:hover {
    border-color: ${({ $isError, theme }) =>
      $isError ? theme.colors.red : theme.colors.gray2};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.gray4};
    cursor: default;

    &:hover {
      border-color: ${({ theme }) => theme.colors.gray4};
    }
  }

  &:disabled path {
    fill: ${({ theme }) => theme.colors.gray4};
  }

  svg {
    transform: rotate(${({ $isOpened }) => $isOpened && '180deg'});
  }
`;
