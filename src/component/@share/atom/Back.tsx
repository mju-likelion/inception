import { ReactComponent as BackSVG } from '@/assets/images/Back.svg';
import styled from 'styled-components';

type BackProp = {
  isDisabled: boolean;
  onClick: () => void;
};

export const Back = ({ isDisabled, onClick }: BackProp) => {
  return (
    <Container onClick={onClick} disabled={isDisabled ? false : true}>
      <BackArrow isDisabled={isDisabled} />
    </Container>
  );
};

const Container = styled.button`
  width: 24px;
  height: 24px;
`;

const BackArrow = styled(BackSVG)<{ isDisabled: boolean }>`
  path {
    fill: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.gray2 : theme.colors.gray4};
  }
`;
