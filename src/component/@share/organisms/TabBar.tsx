import styled from 'styled-components';
import { TabBarButton } from '@/component/@share/molecules';

type TabBarProps = {
  selectedTab: 'default' | 'result';
  onClick: (tab: 'default' | 'result') => void;
  firstTabTitle: string;
  secondTabTitle: string;
};

export const TabBar = ({
  selectedTab,
  onClick,
  firstTabTitle,
  secondTabTitle,
}: TabBarProps) => {
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
