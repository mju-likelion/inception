import { styled } from 'styled-components';
import { ReactComponent as BackSVG } from '@/assets/images/Back.svg';

type BackProp = {
  isDisabled: boolean;
  onClick: () => void;
};

export const Back = ({ isDisabled, onClick }: BackProp) => {
  return (
    <Container onClick={onClick}>
      <BackArrow isDisabled={isDisabled} />
    </Container>
  );
};

const Container = styled.button`
  all: unset;
  width: 24px;
  height: 24px;
  top: 20px;
  left: 20px;
  svg {
    pointer-events: none;
  }
`;

const BackArrow = styled(BackSVG)<{ isDisabled: boolean }>`
  path {
    fill: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.gray2 : theme.colors.gray4};
  }
`;
