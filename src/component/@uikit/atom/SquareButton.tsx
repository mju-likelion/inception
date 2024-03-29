import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';

interface ButtonProps {
  isAnchor?: boolean;
  href?: string;
  onClick?: () => void;
}

export const SquareButton = ({
  isAnchor,
  href,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => {
  return isAnchor ? (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      <Button>{children}</Button>
    </a>
  ) : (
    <Button onClick={onClick}>{children}</Button>
  );
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

  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray3};
    }
  }
`;
