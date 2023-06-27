import { ReactComponent as BackSVG } from '@/assets/images/Back.svg';
import styled from 'styled-components';

export const Back = () => {
  return (
    <Container>
      <BackButton />
    </Container>
  );
};

const Container = styled.button``;

const BackButton = styled(BackSVG)`
  path {
    fill: ${({ theme }) => theme.colors.gray2};
  }
`;
