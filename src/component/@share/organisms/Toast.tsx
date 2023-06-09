import styled from 'styled-components';
import { ReactComponent as SuccessIcon } from '@/assets/images/Success.svg';
import { ReactComponent as ErrorIcon } from '@/assets/images/Error.svg';
import { Body } from '@/component/@share/atom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from '@/store';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
}

export const Toast = ({ type, message }: ToastProps) => {
  const setToast = useSetRecoilState(toastState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <Container>
      {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
      <MessageBox>
        <Body ag="Body1Regular" color="white">
          {message}
        </Body>
        {type === 'error' && (
          <Body ag="Body3" color="gray3">
            잠시 후 다시 시도해주세요
          </Body>
        )}
      </MessageBox>
    </Container>
  );
};

const Container = styled.div`
  width: 320px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 18px 12px;
  gap: 12px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;

  animation: slideUp 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) both,
    slideDown 400ms 2000ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;

  @keyframes slideUp {
    from {
      transform: translateY(70px);
    }
    to {
      transform: translateY(-70px);
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(-70px);
    }
    to {
      transform: translateY(69px);
    }
  }
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
