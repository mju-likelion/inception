import styled from 'styled-components';
import { ReactComponent as SuccessIcon } from '@/assets/images/Success.svg';
import { ReactComponent as ErrorIcon } from '@/assets/images/Error.svg';
import { Body } from '@/component/@share/atom';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
}

export const Toast = ({ type, message }: ToastProps) => {
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
  margin: auto;
  gap: 12px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
