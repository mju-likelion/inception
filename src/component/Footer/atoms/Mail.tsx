import { styled } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { theme } from '@/globalStyle';
import { ToastStatus } from '@/types/Toast';

interface MailProps {
  email: string;
  onClick: (copyResult: ToastStatus) => void;
}

export const Mail = ({ email, onClick }: MailProps) => {
  return (
    <Container>
      <Body $color="gray2">이메일</Body>
      <CopyToClipboard
        text={email}
        onCopy={(text) =>
          text === email ? onClick('success') : onClick('error')
        }
      >
        <Email>{email}</Email>
      </CopyToClipboard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body4};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;

const Email = styled.button`
  ${({ theme }) => theme.typographies.body4};
  color: ${({ theme }) => theme.colors.gray2};
  text-decoration: underline;
  text-underline-offset: 3px;
  &:hover {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;
