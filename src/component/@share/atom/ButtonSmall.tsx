import { styled } from 'styled-components';

interface Props {
  text: string;
}

export const ButtonSmall = ({ text }: Props) => {
  return <Button>{text}</Button>;
};

const Button = styled.button`
  width: 92px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.gray4};
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.mint1};
    color: ${({ theme }) => theme.colors.mint1};
  }
`;