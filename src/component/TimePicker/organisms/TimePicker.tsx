import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Body } from '@/component/@share';
import { TimeSelectionBox, TitleCheck } from '@/component/TimePicker/molecules';
import { ReactComponent as Bar } from '@/assets/images/TimePickerBar.svg';
import { selectedStartTime, selectedEndTime, titleCheckState } from '@/store';

export const TimePicker = () => {
  const [startTime, setStartTime] = useRecoilState(selectedStartTime);
  const [endTime, setEndTime] = useRecoilState(selectedEndTime);
  const [openPicker, setOpenPicker] = useState<'' | 'start' | 'end'>('');
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useRecoilState(titleCheckState);
  const [isDisabled, setIsDisabled] = useState(false);

  const openSelectionBox = (type: 'start' | 'end') => {
    openPicker !== type ? setOpenPicker(type) : setOpenPicker('');
  };

  const selectTime = (time: string) => {
    openPicker === 'start' ? setStartTime(time) : setEndTime(time);
    setOpenPicker('');
    checkError(time);
  };

  const checkError = (time: string) => {
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
        />
        <Bar />
        <TimeSelectionBox
          selectedTime={endTime}
          isDisabled={isDisabled}
          isError={isError}
          isOpened={openPicker === 'end'}
          onClick={() => openSelectionBox('end')}
          selectTimeItem={selectTime}
        />
      </InnerContainer>
      {isError && !isDisabled && (
        <Body ag="Body3" color="red">
          종료 시간이 시작 시간보다 늦어야 합니다
        </Body>
      )}
      <TitleCheck isChecked={isChecked} onClick={handleCheck} />
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
