import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { TabBar, TitleBox, Body, ButtonLarge } from '@/component/@share';
import { tabState } from '@/store';

export const Home = () => {
  const [tab, setTab] = useRecoilState(tabState);

  return (
    <Container>
      <TabBar
        onClick={(tab: 'default' | 'result') => setTab(tab)}
        firstTabTitle="약속 잡기"
        secondTabTitle="결과 보기"
      />
      {tab === 'default' && (
        <>
          <TitleBoxContainer>
            <TitleBox
              title="약속방 생성하기"
              content="일정 선택 가능 기간을 선택해주세요"
              $isActive
              $isPass={false}
            />
          </TitleBoxContainer>
          <CalendarBox>
            <TempCalendar />
            <HorizontalRule />
          </CalendarBox>
          <TimePickerBox>
            <Body ag="Body2Regular" color="gray1">
              약속 날짜의 선택 가능 시간대를 선택해주세요
            </Body>
            <TempTimePicker />
          </TimePickerBox>
          <ButtonBox>
            <ButtonLarge isDisabled>약속방 생성</ButtonLarge>
          </ButtonBox>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBoxContainer = styled.div`
  margin: 30px 0px 12px 20px;
`;

const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

// 캘린더 컴포넌트 merge전 임시 영역

const TempCalendar = styled.div`
  width: 100%;
  height: 368px;
  background-color: ${({ theme }) => theme.colors.mint2};
`;

const HorizontalRule = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray5};
  margin: 6px 0 24px;
`;

const TimePickerBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 8px;
  margin-bottom: 100px;
`;

// TimePicker 컴포넌트 merge전 임시 영역

const TempTimePicker = styled.div`
  width: 288px;
  height: 84px;
  background-color: ${({ theme }) => theme.colors.mint1};
`;

const ButtonBox = styled.div`
  margin-bottom: 100px;
  align-self: center;
`;
