import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface Props {
  isDisabled?: boolean;
}

export const ButtonLarge = ({
  children,
  isDisabled,
}: PropsWithChildren<Props>) => {
  return (
    <Button disabled={isDisabled}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

const Button = styled.button`
  width: 240px;
  height: 52px;
  padding: 14px 40px;
  border: none;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.mint1};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mint3};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const ButtonText = styled.p`
  ${({ theme }) => theme.typographies.subTitle};
  width: 160px;
  color: ${({ theme }) => theme.colors.white};
`;
