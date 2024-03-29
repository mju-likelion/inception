import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface Props {
  type?: React.HTMLInputTypeAttribute;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const ButtonLarge = ({
  children,
  isDisabled,
  onClick,
}: PropsWithChildren<Props>) => {
  return (
    <Button disabled={isDisabled} onClick={onClick}>
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
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mint3};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const ButtonText = styled.div`
  ${({ theme }) => theme.typographies.subTitle};
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
