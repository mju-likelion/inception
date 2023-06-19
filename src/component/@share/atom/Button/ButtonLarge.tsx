import { styled } from 'styled-components';

export interface ButtonLargeProps {
  text: string;
  isDisabled: boolean;
}

export const ButtonLarge = ({ text, isDisabled }: ButtonLargeProps) => {
  return (
    <Button disabled={isDisabled}>
      <p>{text}</p>
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

  p {
    width: 160px;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.mint3};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
