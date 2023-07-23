import { theme } from '@/globalStyle';
import styled from 'styled-components';

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
      <Title $color={isActive ? 'mint1' : 'gray3'}>{children}</Title>
      {isActive && <Bar />}
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

const Title = styled.h1<{ $color: keyof typeof theme.colors }>`
  ${({ theme }) => theme.typographies.title2};
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;

const Bar = styled.div`
  background-color: ${({ theme }) => theme.colors.mint1};
  width: 100%;
  height: 2px;
`;
