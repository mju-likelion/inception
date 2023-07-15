import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Body, TitleCheck } from '@/component/@share';
import { TimeSelectionBox } from '@/component/TimePicker';

import {
  selectedStartTime,
  selectedEndTime,
  titleCheckState,
  timeErrorState,
} from '@/store';
import { TimeListData } from '@/types/TimePicker';

export const TimePicker = () => {
  const startBoxRef = useRef<HTMLDivElement>(null);
  const endBoxRef = useRef<HTMLDivElement>(null);

  const [startTime, setStartTime] = useRecoilState(selectedStartTime);
  const [endTime, setEndTime] = useRecoilState(selectedEndTime);
  const [openPicker, setOpenPicker] = useState<'' | 'start' | 'end'>('');
  const [isError, setIsError] = useRecoilState(timeErrorState);
  const [isChecked, setIsChecked] = useRecoilState(titleCheckState);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    window.addEventListener('mousedown', listOutSideClick);
    return () => window.removeEventListener('mousedown', listOutSideClick);
  }, [openPicker]);

  const openSelectionBox = (type: 'start' | 'end') => {
    openPicker !== type ? setOpenPicker(type) : setOpenPicker('');
  };

  const listOutSideClick = (e: MouseEvent) => {
    const ref = openPicker === 'start' ? startBoxRef : endBoxRef;
    if (openPicker && !ref.current?.contains(e.target as Node)) {
      setOpenPicker('');
    }
  };

  const selectTime = (time: TimeListData) => {
    openPicker === 'start' ? setStartTime(time) : setEndTime(time);
    setOpenPicker('');
    checkError(time);
  };

  const checkError = (time: TimeListData) => {
    const startHour =
      openPicker === 'start' ? time.substring(0, 2) : startTime.substring(0, 2);
    const startMinute =
      openPicker === 'start' ? time.substring(3, 6) : startTime.substring(3, 6);
    const endHour =
      openPicker === 'end' ? time.substring(0, 2) : endTime.substring(0, 2);
    const endMinute =
      openPicker === 'end' ? time.substring(3, 6) : endTime.substring(3, 6);

    if (startHour > endHour) {
      setIsError(true);
    } else if (startHour === endHour) {
      if (startMinute < endMinute) {
        setIsError(false);
      } else {
        setIsError(true);
      }
    } else {
      setIsError(false);
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
    openPicker && setOpenPicker('');
  };

  return (
    <Container>
      <InnerContainer>
        <TimeSelectionBox
          selectedTime={startTime}
          isDisabled={isDisabled}
          isError={false}
          isOpened={openPicker === 'start'}
          onClick={() => openSelectionBox('start')}
          selectTimeItem={selectTime}
          ref={startBoxRef}
        />
        <Bar />
        <TimeSelectionBox
          selectedTime={endTime}
          isDisabled={isDisabled}
          isError={isError}
          isOpened={openPicker === 'end'}
          onClick={() => openSelectionBox('end')}
          selectTimeItem={selectTime}
          ref={endBoxRef}
        />
      </InnerContainer>
      {isError && !isDisabled && (
        <Body ag="Body3" color="red">
          종료 시간이 시작 시간보다 늦어야 합니다
        </Body>
      )}
      <TitleCheck isChecked={isChecked} onClick={handleCheck}>
        날짜만 조율할래요
      </TitleCheck>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Bar = styled.div`
  width: 8px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray3};
  border-radius: 1px;
`;
