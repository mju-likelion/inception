import { styled } from 'styled-components';
import { TabBar } from '@/component';

export const Home = () => {
  return (
    <Wrapper>
      <TabBar />
      메인페이지입니다
    </Wrapper>
  );
};

const Wrapper = styled.p`
  color: ${({ theme }) => theme.colors.black};
`;
