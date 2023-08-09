import { useState } from 'react';
import styled from 'styled-components';
import { Mail, Privacy, CopyRight } from '@/component/Footer/atoms';
import { OrganizationInfo } from '@/component/Footer/data';
import { Toast } from '@/component/@share';
import { devices } from '@/globalStyle';
import { useWindowResize } from '@/hooks';
import { ToastType } from '@/types/Toast';
import { useRecoilState } from 'recoil';
import { currentCopyType, toastState } from '@/store';
import { SquareButton } from '@/component/@share/atom/SquareButton';

export const Footer = () => {
  const windowSize = useWindowResize();
  const [isToastOpened, setIsToastOpened] = useRecoilState(toastState);
  const [copyType, setCopyType] = useRecoilState(currentCopyType);
  const [toastType, setToastType] = useState<ToastType>('error');

  const copyEmail = (copyResult: ToastType) => {
    setIsToastOpened(true);
    setToastType(copyResult);
    setCopyType('email');
  };

  return (
    <Container>
      {windowSize.width < devices.web ? (
        <>
          <SquareButton isAnchor href={OrganizationInfo.CHANNEL_TALK}>
            문의하기
          </SquareButton>
          <Mail email={OrganizationInfo.EMAIL} onClick={copyEmail} />
          <Privacy
            firstContent="개인정보 처리 방침"
            secondContent="서비스 이용약관"
          />
          <CopyRight content={OrganizationInfo.COPYRIGHT} />
        </>
      ) : (
        <WebContainer>
          <InnerContainer>
            <SquareButton isAnchor href={OrganizationInfo.CHANNEL_TALK}>
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
      {isToastOpened && copyType === 'email' && (
        <Toast type={toastType} copyType={copyType} />
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
