import styled from 'styled-components';

export const ActiveBar = () => {
  return <Bar />;
};

const Bar = styled.div`
  background-color: ${({ theme }) => theme.colors.mint1};
  width: 100%;
  height: 2px;
`;
