import styled from 'styled-components';
import { Logo, Helper } from '@/component/@share/atom';

export const Header = () => {
  return (
    <HeaderBox>
      <InnerBox>
        <Logo />
        <Helper />
      </InnerBox>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 14px 20px;
`;

const InnerBox = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  @media ${({ theme }) => theme.size.web} {
    justify-content: unset;
    gap: 1052px;
  }
`;
