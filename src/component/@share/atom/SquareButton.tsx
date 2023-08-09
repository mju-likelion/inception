import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const SquareButton = ({ children }: PropsWithChildren) => {
  return <Button>{children}</Button>;
};

const Button = styled.button`
  padding: 8px 14px;
  width: 70px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.gray4};
  display: flex;
  align-items: center;
  border-radius: 8px;
  ${({ theme }) => theme.typographies.body4}
  color: ${({ theme }) => theme.colors.gray2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray3};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray3};
  }
`;
