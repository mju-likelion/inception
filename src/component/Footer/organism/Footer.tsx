import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { Mail, Privacy, CopyRight } from '@/component/Footer/atoms';
import { OrganizationInfo } from '@/component/Footer/data';
import { devices } from '@/globalStyle';
import { useWindowResize } from '@/hooks';
import { ToastStatus } from '@/types/Toast';
import { currentToastType, toastState } from '@/store';
import { SquareButton, Toast } from '@/component/@uikit';
import { useGaApi } from '@/hooks/useGA';

export const Footer = () => {
  const windowSize = useWindowResize();
  const [isToastOpened, setIsToastOpened] = useRecoilState(toastState);
  const [toastType, setToastType] = useRecoilState(currentToastType);
  const [toastStatus, setToastStatus] = useState<ToastStatus>('error');

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const stepParams = searchParams.get('step');
  const { changePathnameToTPath, gaApi } = useGaApi();
  const tStep = stepParams ? (+stepParams as 1 | 2 | 3) : null;

  const onContactClick = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 203,
      tPath: changePathnameToTPath(location.pathname),
      tTarget: 'contact',
      tStep,
    });
  };

  const copyEmail = (copyResult: ToastStatus) => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 204,
      tPath: changePathnameToTPath(location.pathname),
      tTarget: 'email',
      tStep,
    });

    setIsToastOpened(true);
    setToastStatus(copyResult);
    setToastType('email');
  };

  const onPrivacyPolicyClick = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 205,
      tPath: changePathnameToTPath(location.pathname),
      tTarget: 'privacy_policy',
      tStep,
    });
  };

  const onTermsOfServiceClick = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 206,
      tPath: changePathnameToTPath(location.pathname),
      tTarget: 'terms_of_service',
      tStep,
    });
  };

  return (
    <Container>
      {windowSize.width < devices.web ? (
        <>
          <SquareButton
            isAnchor
            href={OrganizationInfo.CHANNEL_TALK}
            onClick={onContactClick}
          >
            문의하기
          </SquareButton>
          <Mail email={OrganizationInfo.EMAIL} onClick={copyEmail} />
          <Privacy
            firstContent="개인정보 처리 방침"
            secondContent="서비스 이용약관"
            onFirstContentClick={onPrivacyPolicyClick}
            onSecondContentClick={onTermsOfServiceClick}
          />
          <CopyRight content={OrganizationInfo.COPYRIGHT} />
        </>
      ) : (
        <WebContainer>
          <InnerContainer>
            <SquareButton
              isAnchor
              href={OrganizationInfo.CHANNEL_TALK}
              onClick={onContactClick}
            >
              문의하기
            </SquareButton>
            <Mail email={OrganizationInfo.EMAIL} onClick={copyEmail} />
            <CopyRight content={OrganizationInfo.COPYRIGHT} />
          </InnerContainer>
          <Privacy
            firstContent="개인정보 처리 방침"
            secondContent="서비스 이용약관"
          />
        </WebContainer>
      )}
      {isToastOpened && toastType === 'email' && (
        <Toast
          status={toastStatus}
          toastType={toastType}
          descriptionActive="error"
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray5};
  width: 100%;
  height: 194px;
  padding: 0 150px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  gap: 12px;
  @media ${({ theme }) => theme.size.web} {
    padding: 0;
    height: 162px;
    align-items: center;
  }
`;

const WebContainer = styled.div`
  @media ${({ theme }) => theme.size.web} {
    display: flex;
    width: 1200px;
    height: 92px;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 10px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
