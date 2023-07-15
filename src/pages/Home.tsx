import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { TabBar, TitleBox, Body, ButtonLarge } from '@/component/@share';
import { Calendar, TimePicker } from '@/component';
import { tabState } from '@/store';

export const Home = () => {
  const [tab, setTab] = useRecoilState(tabState);

  return (
    <Container>
      <TabBar
        onClick={setTab}
        firstTabTitle="약속 잡기"
        secondTabTitle="결과 보기"
      />
      {tab === 'default' && (
        <>
          <TitleBoxContainer>
            <TitleBox
              title="약속방 생성하기"
              content="일정 선택 가능 기간을 선택해주세요"
            />
          </TitleBoxContainer>
          <CalendarBox>
            <Calendar viewType="create" />
            <HorizontalRule />
          </CalendarBox>
          <TimePickerBox>
            <Body ag="Body2Regular" color="gray1">
              약속 날짜의 선택 가능 시간대를 선택해주세요
            </Body>
            <TimePicker />
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
  @media ${({ theme }) => theme.size.tablet} {
    width: 500px;
    align-self: center;
    margin: 60px 0px 24px 20px;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 80px;
  }
`;

const CalendarBox = styled.div`
  padding: 0 20px;
  @media ${({ theme }) => theme.size.tablet} {
    width: 500px;
    align-self: center;
    padding: 0;
  }
`;

const HorizontalRule = styled.div`
  width: 100%;
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
  gap: 8px;
  @media ${({ theme }) => theme.size.tablet} {
    width: 500px;
    align-self: center;
    margin-left: 0;
  }
`;

const ButtonBox = styled.div`
  margin: 100px 0;
  align-self: center;
`;
