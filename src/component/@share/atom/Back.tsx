import { ReactComponent as BackSVG } from '@/assets/images/Back.svg';
import styled from 'styled-components';

type BackProp = {
  isDisabled: boolean;
  onClick: () => void;
};

export const Back = ({ isDisabled, onClick }: BackProp) => {
  return (
    <Container onClick={onClick} disabled={isDisabled}>
      <BackArrow $isDisabled={isDisabled} />
    </Container>
  );
};

const Container = styled.button`
  width: 24px;
  height: 24px;

  &:disabled {
    cursor: default;
  }
`;

const BackArrow = styled(BackSVG)<{ $isDisabled: boolean }>`
  path {
    fill: ${({ theme, $isDisabled }) =>
      $isDisabled ? theme.colors.gray4 : theme.colors.gray2};
  }
`;
