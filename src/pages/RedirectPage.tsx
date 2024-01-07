import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ErrorAlert } from '@/pages/data';
import { ReactComponent as DoorSvgForTablet } from '@/assets/images/RedirectDoorInTablet.svg';
import { ReactComponent as DoorSvgForDesktop } from '@/assets/images/RedirectDoorInDesktop.svg';
import { ReactComponent as NotFound } from '@/assets/images/ErrorState404.svg';
import { ReactComponent as InternalServerError } from '@/assets/images/ErrorState500.svg';

import { ButtonLarge } from '@/component/@uikit';
import { devices } from '@/globalStyle';
import { useWindowResize } from '@/hooks';

interface RedirectPageProps {
  errorState?: 500;
}

export const RedirectPage = ({ errorState }: RedirectPageProps) => {
  const windowSize = useWindowResize();
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorContentBox>
        {errorState ? <InternalServerError /> : <NotFound />}
        <ErrorAlertText>{ErrorAlert.content}</ErrorAlertText>
      </ErrorContentBox>

      {windowSize.width >= devices.web ? (
        <DoorSvgForDesktop />
      ) : (
        <DoorSvgForTablet />
      )}

      <ButtonLarge isDisabled={false} onClick={() => navigate('/')}>
        메인으로
      </ButtonLarge>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  width: 100%;
  min-height: calc(100vh - 202px);
  padding: 50px 0;
  margin: auto;
  overflow-y: scroll;
`;

const ErrorContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ErrorAlertText = styled.p`
  color: ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.typographies.body3}
  text-align:center;
  white-space: pre-line;
`;
