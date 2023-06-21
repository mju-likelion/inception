import styled from 'styled-components';
import { TabBarButton } from '@/component/@share/molecules';

type TabBarProps = {
  barState: 'Default' | 'Result';
  onClick: (state: 'Default' | 'Result') => void;
};

export const TabBar = ({ barState, onClick }: TabBarProps) => {
  return (
    <Container>
      <TabBarButton
        isActive={barState === 'Default' && true}
        onClick={() => onClick('Default')}
      >
        약속 잡기
      </TabBarButton>
      <TabBarButton
        isActive={barState === 'Result' && true}
        onClick={() => onClick('Result')}
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
