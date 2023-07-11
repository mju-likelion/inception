import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { Body } from '@/component/@share';
import { TimeSelectionBox, TitleCheck } from '@/component/TimePicker/molecules';
import { ReactComponent as Bar } from '@/assets/images/TimePickerBar.svg';
import { titleCheckState } from '@/store';

export const TimePicker = () => {
  // 시작 및 종료 시간 전역 관리 예정
  const [isError, setIsError] = useState(false);
  const [isChecked, setIsChecked] = useRecoilState(titleCheckState);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
  };

  return (
    <Container>
      <InnerContainer>
        <TimeSelectionBox
          selectedTime="08:00"
          isDisabled={isDisabled}
          isError={isError}
        />
        <Bar />
        <TimeSelectionBox
          selectedTime="22:00"
          isDisabled={isDisabled}
          isError={isError}
        />
      </InnerContainer>
      {isError && (
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
