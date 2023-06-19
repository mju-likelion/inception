import { useState } from 'react';
import styled from 'styled-components';
import { TabBarButton } from '../molecules';

export const TabBar = () => {
  const [barState, setBarState] = useState<'Default' | 'Result'>('Default');

  return (
    <Container>
      <TabBarButton
        text="약속 잡기"
        isActive={barState === 'Default' && true}
        onClick={() => {
          setBarState('Default');
        }}
      />
      <TabBarButton
        text="결과 보기"
        isActive={barState === 'Result' && true}
        onClick={() => {
          setBarState('Result');
        }}
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
