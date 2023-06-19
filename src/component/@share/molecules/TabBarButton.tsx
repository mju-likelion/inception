import styled from 'styled-components';
import { Title } from '../atom';
import { ActiveBar } from '../atom';

type TabBarButtonProps = {
  text: '약속 잡기' | '결과 보기';
  isActive: boolean;
  onClick: () => void;
};

export const TabBarButton = ({
  text,
  isActive,
  onClick,
}: TabBarButtonProps) => {
  return (
    <Container onClick={onClick}>
      <Title ag="Title2" text={text} color={isActive ? 'mint1' : 'gray3'} />
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
