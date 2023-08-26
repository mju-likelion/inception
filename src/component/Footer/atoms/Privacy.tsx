import styled from 'styled-components';

interface PrivacyProps {
  firstContent: string;
  secondContent: string;
}

const PrivacyLink =
  'https://gatherplz.notion.site/d5d9382a071b4b7d93d2fd2931ce6d63';

const TermsOfUseLink =
  'https://gatherplz.notion.site/c04613ccc6cf418c8b008e924f7b4f17?pvs=4';

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
