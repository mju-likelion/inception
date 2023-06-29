import { ReactComponent as NextSVG } from '@/assets/images/Next.svg';
import styled from 'styled-components';

type NextProp = {
  isDisabled: boolean;
  onClick: () => void;
};

export const Next = ({ isDisabled, onClick }: NextProp) => {
  return (
    <Container onClick={onClick} disabled={isDisabled}>
      <NextArrow $isDisabled={isDisabled} />
    </Container>
  );
};

const Container = styled.button`
  width: 24px;
  height: 24px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const NextArrow = styled(NextSVG)<{ $isDisabled: boolean }>`
  path {
    fill: ${({ theme, $isDisabled }) =>
      $isDisabled ? theme.colors.gray4 : theme.colors.gray2};
  }
`;
