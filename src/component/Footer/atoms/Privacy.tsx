import styled from 'styled-components';

interface PrivacyProps {
  firstContent: string;
  secondContent: string;
}

export const Privacy = ({ firstContent, secondContent }: PrivacyProps) => {
  return (
    <Container>
      <PrivacyContent>{firstContent}</PrivacyContent>
      <PrivacyContent>{secondContent}</PrivacyContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 16px;
`;

const PrivacyContent = styled.button`
  ${({ theme }) => theme.typographies.body4};
  color: ${({ theme }) => theme.colors.gray2};
  &:hover {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;
