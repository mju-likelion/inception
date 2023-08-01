import { theme } from '@/globalStyle';
import styled from 'styled-components';

interface MailProps {
  email: string;
}

export const Mail = ({ email }: MailProps) => {
  return (
    <Container>
      <Body $color="gray2">이메일</Body>
      <Email>{email}</Email>
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
