import { PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastStatus } from '@/types/Toast';

interface Props {
  copyContent?: string;
  onClick?: () => void;
  onCopy?: (copyResult: ToastStatus) => void;
  isDisabled?: boolean;
  //다른 디바이스에서 일정 수정을 누를 경우 로그인 페이지에서 기존 유저로 로그인이 되는 것이 아닌, 신규 유저로 등록되는 버그를 막기 위하여 임의의 props 하나를 추가하였습니다.
}

export const ButtonSmall = ({
  children,
  copyContent,
  onClick,
  onCopy,
  isDisabled,
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
    <Button onClick={onClick} disabled={isDisabled}>
      {children}
    </Button>
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray5};
    color: ${({ theme }) => theme.colors.gray3};
    border: none;
  }
`;
