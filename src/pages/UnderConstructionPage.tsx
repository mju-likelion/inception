import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh - 52px - 194px);
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 0 24px;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typographies.title1};
  color: ${({ theme }) => theme.colors.mint1};
`;

const Subtitle = styled.h2`
  ${({ theme }) => theme.typographies.subTitle};
  color: ${({ theme }) => theme.colors.gray1};
  white-space: pre-line;
  text-align: center;
`;

export const UnderConstructionPage = () => {
  const subtitle =
    '불편을 끼쳐드려서 죄송합니다.\n시스템 안정화를 위해 잠시 서버 점검 중입니다.\n빠른 시간 내에 정상적인 서비스가 가능하도록 최선을 다하겠습니다.';

  return (
    <Container>
      <Title>🚧 서버 점검중입니다 🚧</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};
