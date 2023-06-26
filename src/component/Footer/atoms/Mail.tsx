import { Body } from '@/component/@share';
import styled from 'styled-components';

type MailProps = {
  email: string;
};

export const Mail = ({ email }: MailProps) => {
  return (
    <Container>
      <Body ag="Body4" color="gray1">
        이메일
      </Body>
      <Email>{email}</Email>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Email = styled.button`
  ${({ theme }) => theme.typographies.body4};
  color: ${({ theme }) => theme.colors.gray2};
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;