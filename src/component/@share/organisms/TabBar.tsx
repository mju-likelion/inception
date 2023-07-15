import styled from 'styled-components';
import { TabBarButton } from '@/component/@share/molecules';
import { useRecoilValue } from 'recoil';
import { tabState } from '@/store/atoms';

type TabBarProps = {
  /*
    onClick시 tab id가 무조건 default, result로 한정적임
    tab 또한 무조건 2개만 받는다고 되어있음
    차라리 tab items를 상위 컴포넌트에서 받는것으로 하고 id를 부여하는건 어떨지

    혹은 share에 위치한 것이 아니라 정해진 역할을 가진 컴포넌트로 만들어야 될 것 같다.
  */
  onClick: (tab: 'default' | 'result') => void;
  firstTabTitle: string;
  secondTabTitle: string;
};

export const TabBar = ({
  onClick,
  firstTabTitle,
  secondTabTitle,
}: TabBarProps) => {
  // 탭 클릭시 탭 하이라이트가 바뀌는 것은 tabBar의 역할인 것 같다 외부에서 tabState를 바꾸는 것은 tabBar 고유 동작을 외부에 맡기고 있는 것 같다.
  const selectedTab = useRecoilValue(tabState);
  return (
    <Container>
      <InnerContainer>
        <TabBarButton
          isActive={selectedTab === 'default'}
          onClick={() => onClick('default')}
        >
          {firstTabTitle}
        </TabBarButton>
        <TabBarButton
          isActive={selectedTab === 'result'}
          onClick={() => onClick('result')}
        >
          {secondTabTitle}
        </TabBarButton>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  padding-left: 20px;
  @media ${({ theme }) => theme.size.web} {
    justify-content: center;
    padding-right: 20px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 20px;
  @media ${({ theme }) => theme.size.web} {
    width: 1200px;
  }
`;
