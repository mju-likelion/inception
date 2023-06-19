import styled from 'styled-components';

export const HeaderTitle = () => {
  return <Text>SCHEDULE</Text>;
};

const Text = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mint1};
`;
