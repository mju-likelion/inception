import styled from 'styled-components';
import { TabBarButton } from '@/component/@share/molecules';

type TabBarProps = {
  selectedTab: 'default' | 'result';
  onClick: (tab: 'default' | 'result') => void;
};

export const TabBar = ({ selectedTab, onClick }: TabBarProps) => {
  return (
    <Container>
      <TabBarButton
        isActive={selectedTab === 'default'}
        onClick={() => onClick('default')}
      >
        약속 잡기
      </TabBarButton>
      <TabBarButton
        isActive={selectedTab === 'result'}
        onClick={() => onClick('result')}
      >
        결과 보기
      </TabBarButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  gap: 20px;
  align-items: flex-end;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  box-sizing: border-box;
  padding-left: 20px;
`;
