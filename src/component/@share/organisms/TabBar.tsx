import styled from 'styled-components';
import { TabBarButton } from '@/component/@share/molecules';
import { useRecoilState } from 'recoil';
import { tabState } from '@/store/atoms';
import { TabItem } from '@/types';

interface TabBarProps {
  tabItems: TabItem[];
  onClick?: (tab: string) => void;
}

export const TabBar = ({ onClick, tabItems }: TabBarProps) => {
  const [selectedTab, setSelectedTab] = useRecoilState(tabState);

  const handleClick = (id: string) => {
    setSelectedTab(id);
    onClick?.(id);
  };

  return (
    <Container>
      <InnerContainer>
        {tabItems.map((tab) => (
          <TabBarButton
            key={tab.id}
            isActive={selectedTab === tab.id}
            onClick={() => handleClick(tab.id)}
          >
            {tab.title}
          </TabBarButton>
        ))}
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
