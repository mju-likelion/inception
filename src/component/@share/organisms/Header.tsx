import styled from 'styled-components';
import { Logo, Helper } from '@/component/@share/atom';

export const Header = () => {
  return (
    <HeaderBox>
      <Logo />
      <Helper />
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 52px;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 15px;
  box-sizing: border-box;
`;
