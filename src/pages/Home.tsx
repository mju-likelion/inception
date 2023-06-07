import { styled } from 'styled-components';

export const Home = () => {
  return <Wrapper>메인 페이지입니다</Wrapper>;
};

const Wrapper = styled.p`
  color: ${({ theme }) => theme.colors.black};
`;
