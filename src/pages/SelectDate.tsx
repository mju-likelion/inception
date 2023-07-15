import { Calendar } from '@/component';
import { Body, ButtonLarge, TabBar } from '@/component/@share';
import { Information, ProgressBar } from '@/component/@share/molecules';
import { tabState } from '@/store';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';

export const SelectDate = () => {
  const selectableMonths = [6, 7, 8]; // @TODO 더미데이터. 서버에서 선택 가능한 시간들 가져와 보여주기
  const [selectTab, setSelectTab] = useRecoilState(tabState);

  const onClick = (tab: 'default' | 'result') => {
    setSelectTab(tab);
    // @TODO tab에 따라 라우팅하기
  };

  return (
    <>
      <TabBar
        firstTabTitle="약속잡기"
        secondTabTitle="결과보기"
        onClick={onClick}
      />
      <Wrapper>
        <Header>
          <ProgressBar total={3} step={1} />
          <Body ag="Body2Regular" color="gray1">
            가용한 날짜들을 선택해주세요.
          </Body>
        </Header>
        <Content>
          <Calendar
            viewType="select"
            // @TODO 선택 가능 기간이 어떻게 들어오는지 판단 필요
            // minDate={`${Math.min(...selectableMonths)}`}
            // maxDate={`${Math.max(...selectableMonths)}`}
          />
          <Information
            icon={'@/assets/images/Calendar.svg'}
            title="선택 가능 시간"
            content={selectableMonths.map((month) => `${month}월`).join(', ')}
          />
        </Content>
        <Bottom>
          <ButtonLarge>다음으로</ButtonLarge>
        </Bottom>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  min-width: 350px;
  max-width: 500px;
  margin: 30px 20px 0 20px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Content = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px auto;
`;
