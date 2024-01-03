import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TabBar, TitleBox, ButtonLarge, LoadingIcon } from '@/component/uikit';
import { Calendar, TimePicker } from '@/component';
import { TAB_ITEMS } from '@/pages/data';
import { theme } from '@/globalStyle';
import { createRoom } from '@/util/api';
import { useEffect, useMemo, useState } from 'react';
import { calcDateFewMonth, dateFormatToString } from '@/util';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  selectedEndTime,
  selectedStartTime,
  timeErrorState,
  titleCheckState,
} from '@/store';
import { calendarState } from '@/store/atoms/Calendar';
import { useGaApi } from '@/hooks/useGA';

export const Home = () => {
  const navigate = useNavigate();
  const [isRoomCreate, setIsRoomCreate] = useState(true);

  const dateOnly = useRecoilValue(titleCheckState);
  const startTime = useRecoilValue(selectedStartTime);
  const endTime = useRecoilValue(selectedEndTime);
  const calendar = useRecoilValue(calendarState);
  const isTimeRangeError = useRecoilValue(timeErrorState);
  const resetStartTime = useResetRecoilState(selectedStartTime);
  const resetEndTime = useResetRecoilState(selectedEndTime);
  const resetDateOnly = useResetRecoilState(titleCheckState);

  const { gaApi } = useGaApi();

  useEffect(() => {
    gaApi.sendEvent({
      eventName: 't_view',
      tEventId: 101,
      tPath: '/create-room',
    });

    return () => {
      resetStartTime();
      resetEndTime();
      resetDateOnly();
    };
  }, []);

  const selectableDate = useMemo(() => {
    const date = new Date();
    return {
      minDate: dateFormatToString(date),
      maxDate: dateFormatToString(calcDateFewMonth(date, 5)),
    };
  }, []);

  const dates = useMemo(() => {
    return calendar
      .filter((state) => state.activeStatus === 'active')
      .map((calendarState) => calendarState.date);
  }, [calendar]);

  const handleTabBarClick = (tab: string) => {
    tab === TAB_ITEMS[1].id && navigate('/submit-code');
  };

  const handleButtonClick = async () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 211,
      tPath: '/create-room',
      tTarget: 'create_room',
    });

    setIsRoomCreate(false);
    const res = await createRoom({
      dates: dates,
      dateOnly,
      startTime: dateOnly ? undefined : startTime,
      endTime: dateOnly ? undefined : endTime,
    });
    setIsRoomCreate(true);
    navigate(`/appointment/${res?.data.code}?step=1`); // api 요청 후 응답이 정상적이라면 navigate 실행
  };

  return (
    <>
      <TabBar tabItems={TAB_ITEMS} onClick={handleTabBarClick} />
      <Container>
        <TitleBoxContainer>
          <TitleBox
            title="약속방 생성하기"
            content="일정 선택 가능 기간을 선택해주세요"
          />
        </TitleBoxContainer>
        <CalendarBox>
          <Calendar
            minDate={selectableDate.minDate}
            maxDate={selectableDate.maxDate}
            viewType="create"
          />
          <HorizontalRule />
        </CalendarBox>
        <TimePickerBox>
          <Body $color="gray1">
            약속 날짜의 선택 가능 시간대를 선택해주세요
          </Body>
          <TimePicker />
        </TimePickerBox>
        <ButtonBox>
          <ButtonLarge
            isDisabled={dates.length <= 0 || (!dateOnly && isTimeRangeError)}
            onClick={handleButtonClick}
          >
            {isRoomCreate ? (
              '약속방 생성'
            ) : (
              <LoadingIcon spinnerType="whiteSpinner" />
            )}
          </ButtonLarge>
        </ButtonBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBoxContainer = styled.div`
  margin: 30px 0 12px 20px;
  max-width: 500px;
  @media ${({ theme }) => theme.size.tablet} {
    align-self: center;
    margin: 60px 0px 24px 20px;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 80px;
  }
`;

const CalendarBox = styled.div`
  max-width: 500px;
  margin: 0 20px;
  @media ${({ theme }) => theme.size.tablet} {
    min-width: 490px;
    width: 100%;
    align-self: center;
  }
`;

const HorizontalRule = styled.div`
  width: 100%;
  max-width: 500px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray5};
  margin: 6px 0 24px;
  border-radius: 1px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-top: 8px;
  }
`;

const TimePickerBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  max-width: 500px;
  gap: 8px;
  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
    min-width: 490px;
    margin-right: 20px;
    align-self: center;
  }
`;

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body2.regular};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;

const ButtonBox = styled.div`
  margin: 100px 0;
  align-self: center;
`;
