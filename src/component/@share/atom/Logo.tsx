import styled from 'styled-components';

export const Logo = () => {
  return <Text>SCHEDULE</Text>;
};

const Text = styled.button`
  all: unset;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mint1};
`;
