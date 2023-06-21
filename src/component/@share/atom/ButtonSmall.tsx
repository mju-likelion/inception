import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

export const ButtonSmall = ({ children }: PropsWithChildren) => {
  return <Button>{children}</Button>;
};

const Button = styled.button`
  ${({ theme }) => theme.typographies.body3};
  width: 92px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.gray4};
  font-family: 'Pretendard';

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mint1};
    color: ${({ theme }) => theme.colors.mint1};
  }
`;
