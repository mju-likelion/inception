import styled from 'styled-components';

interface LogoProps {
  onClick: () => void;
}

export const Logo = ({ onClick }: LogoProps) => {
  return <Title onClick={onClick}>SCHEDULE</Title>;
};

const Title = styled.button`
  all: unset;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mint1};
  cursor: pointer;
`;
