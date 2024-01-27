import styled from 'styled-components';

interface PrivacyProps {
  firstContent: string;
  secondContent: string;
  onFirstContentClick?: () => void;
  onSecondContentClick?: () => void;
}

const PRIVACY_LINK =
  'https://gatherplz.notion.site/d5d9382a071b4b7d93d2fd2931ce6d63';

const TERMS_OF_USE_LINK =
  'https://gatherplz.notion.site/c04613ccc6cf418c8b008e924f7b4f17?pvs=4';

export const Privacy = ({
  firstContent,
  secondContent,
  onFirstContentClick,
  onSecondContentClick,
}: PrivacyProps) => {
  return (
    <Container>
      <PrivacyContent
        href={PRIVACY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onFirstContentClick}
      >
        {firstContent}
      </PrivacyContent>
      <PrivacyContent
        href={TERMS_OF_USE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onSecondContentClick}
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
