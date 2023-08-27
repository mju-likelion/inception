import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastStatus } from '@/types/Toast';

interface Props {
  copyContent?: string;
  onClick?: () => void;
  onCopy?: (copyResult: ToastStatus) => void;
}

export const ButtonSmall = ({
  children,
  copyContent,
  onClick,
  onCopy,
}: PropsWithChildren<Props>) => {
  const handleCopy = (copyResult: ToastStatus) => {
    onCopy && onCopy(copyResult);
  };
  return copyContent ? (
    <CopyToClipboard
      text={copyContent}
      onCopy={(text) =>
        text === copyContent ? handleCopy('success') : handleCopy('error')
      }
    >
      <Button>{children}</Button>
    </CopyToClipboard>
  ) : (
    <Button onClick={onClick}>{children}</Button>
  );
};

const Button = styled.button`
  ${({ theme }) => theme.typographies.body3};
  width: 92px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  border-radius: 50px;
  color: ${({ theme }) => theme.colors.gray1};

  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray4};
      color: ${({ theme }) => theme.colors.gray2};
      border: none;
    }
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.gray4};
    color: ${({ theme }) => theme.colors.gray2};
    border: none;
  }
`;
