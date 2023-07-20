import { Body } from '@/component/@share';
import styled from 'styled-components';

interface MailProps {
  email: string;
}

export const Mail = ({ email }: MailProps) => {
  return (
    <Container>
      <Body ag="Body4" color="gray2">
        이메일
      </Body>
      <Email>{email}</Email>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const Email = styled.button`
  ${({ theme }) => theme.typographies.body4};
  color: ${({ theme }) => theme.colors.gray2};
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;
