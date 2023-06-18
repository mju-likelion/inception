import { styled, css } from 'styled-components';

interface Props {
  text: string;
  isDisabled: boolean;
}

/** @Note Figma 기준 Typography가 Title인 컴포넌트를 다룹니다.  */
export const ButtonLarge = ({ text, isDisabled }: Props) => {
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
    background-color: #32d3ad;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray3};
  }
`;
