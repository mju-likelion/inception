import styled from 'styled-components';
import { Title } from '@/component/@share/atom';
import { ActiveBar } from '@/component/@share/atom';

type TabBarButtonProps = {
  children: string;
  isActive: boolean;
  onClick: () => void;
};

export const TabBarButton = ({
  children,
  isActive,
  onClick,
}: TabBarButtonProps) => {
  return (
    <Container onClick={onClick}>
      <Title ag="Title2" color={isActive ? 'mint1' : 'gray3'}>
        {children}
      </Title>
      {isActive && <ActiveBar />}
    </Container>
  );
};

const Container = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 41px;
`;
