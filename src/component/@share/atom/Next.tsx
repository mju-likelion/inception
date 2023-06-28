import { ReactComponent as NextSVG } from '@/assets/images/Next.svg';
import styled from 'styled-components';

type NextProp = {
  isDisabled: boolean;
  onClick: () => void;
};

export const Next = ({ isDisabled, onClick }: NextProp) => {
  return (
    <Container onClick={onClick}>
      <NextArrow isDisabled={isDisabled} />
    </Container>
  );
};

const Container = styled.button`
  all: unset;
  width: 24px;
  height: 24px;
  svg {
    pointer-events: none;
  }
`;

const NextArrow = styled(NextSVG)<{ isDisabled: boolean }>`
  path {
    fill: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.gray2 : theme.colors.gray4};
  }
`;
