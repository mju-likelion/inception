import styled from 'styled-components';
import { ErrorAlert } from '../data/ErrorAlertText';
import { ReactComponent as DoorSvgForTablet } from '@/assets/images/RedirectDoorInTablet.svg';
import { ReactComponent as DoorSvgForDesktop } from '@/assets/images/RedirectDoorInDesktop.svg';

import { ButtonLarge } from '@/component/@share';
import { devices } from '@/globalStyle';
import { useWindowResize } from '@/hooks';

interface RedirectPageProps {
  errorState?: 404 | 500;
  //404 or 500인데, 일단 500만 고려하겠습니다.
}

export const RedirectPage = ({ errorState = 404 }: RedirectPageProps) => {
  const windowSize = useWindowResize();
  return (
    <Container>
      <ErrorContentBox>
        <ErrorStateText>{errorState}</ErrorStateText>
        <ErrorAlertText>{ErrorAlert.content}</ErrorAlertText>
      </ErrorContentBox>
      {windowSize.width >= devices.web ? (
        <DoorSvgForDesktop />
      ) : (
        <DoorSvgForTablet />
      )}
      <ButtonLarge isDisabled={false}>메인으로</ButtonLarge>
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
  padding: 50px 0;
  margin: auto;
  overflow-y: scroll;
`;

const ErrorContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ErrorStateText = styled.p`
  color: ${({ theme }) => theme.colors.mint1};
  text-align: center;
  font-family: Poppins;
  //폰트 나중에 적용할게요 (디자이너님 응답 대기중)
  font-size: 86px;
  font-weight: 700;
  line-height: 90px;
`;

const ErrorAlertText = styled.p`
  color: ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.typographies.body3}
  text-align:center;
  white-space: pre-line;
`;
