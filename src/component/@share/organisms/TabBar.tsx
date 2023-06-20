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
        text="약속 잡기"
        isActive={barState === 'Default' && true}
        onClick={() => onClick('Default')}
      />
      <TabBarButton
        text="결과 보기"
        isActive={barState === 'Result' && true}
        onClick={() => onClick('Result')}
      />
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
