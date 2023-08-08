import styled from 'styled-components';

interface PrivacyProps {
  firstContent: string;
  secondContent: string;
}

const PrivacyLink =
  'https://www.notion.so/likelion-11th/9122afea432645408dafbc37e334d32a?pvs=4';

const TermsOfUseLink =
  'https://www.notion.so/likelion-11th/9122afea432645408dafbc37e334d32a?pvs=4';

export const Privacy = ({ firstContent, secondContent }: PrivacyProps) => {
  return (
    <Container>
      <PrivacyContent
        href={PrivacyLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {firstContent}
      </PrivacyContent>
      <PrivacyContent
        href={TermsOfUseLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {secondContent}
      </PrivacyContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 16px;
`;

const PrivacyContent = styled.a`
  ${({ theme }) => theme.typographies.body4};
  color: ${({ theme }) => theme.colors.gray2};
  &:hover {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;
