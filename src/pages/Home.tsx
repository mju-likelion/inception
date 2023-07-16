import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { TabBar, TitleBox, Body, ButtonLarge } from '@/component/@share';
import { Calendar, TimePicker } from '@/component';
import { tabState } from '@/store';
import { TabItems } from '@/types';

export const Home = () => {
  const setSelectedTab = useSetRecoilState(tabState);
  const onClick = (tab: string) => {};

  const tabItems: TabItems[] = [
    {
      id: 'default',
      title: '약속 잡기',
    },
    {
      id: 'result',
      title: '결과 보기',
    },
  ];

  return (
    <>
      <TabBar onClick={setSelectedTab} tabItems={tabItems} />
      <Container>
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

const ButtonBox = styled.div`
  margin: 100px 0;
  align-self: center;
`;
