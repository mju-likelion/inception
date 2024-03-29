import { forwardRef } from 'react';
import styled from 'styled-components';
import { DropDownButton } from '@/component/TimePicker/atoms';
import { SelectionList } from '@/component/TimePicker';
import { TimeListData } from '@/types';

interface TimeSelectionBoxProps {
  selectedTime: TimeListData;
  isError: boolean;
  isDisabled: boolean;
  isOpened: boolean;
  onClick: () => void;
  selectTimeItem: (time: TimeListData) => void;
}

export const TimeSelectionBox = forwardRef<
  HTMLDivElement,
  TimeSelectionBoxProps
>(
  (
    { selectedTime, isError, isDisabled, isOpened, onClick, selectTimeItem },
    ref
  ) => {
    return (
      <Container ref={ref}>
        <Select
          $isError={isError}
          $isOpened={isOpened}
          disabled={isDisabled}
          onClick={onClick}
        >
          {selectedTime}
          <DropDownButton />
        </Select>
        {isOpened && (
          <SelectionList
            selectedTime={selectedTime}
            selectTimeItem={selectTimeItem}
          />
        )}
      </Container>
    );
  }
);

// forwardRef 사용 시 Component definition is missing display name 에러 해결용
TimeSelectionBox.displayName = 'TimeSelectionBox';

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
    border-color: ${({ theme }) => theme.colors.gray4};

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
