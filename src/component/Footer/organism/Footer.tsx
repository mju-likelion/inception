import { useState } from 'react';
import styled from 'styled-components';
import { Mail, Privacy, CopyRight } from '@/component/Footer/atoms';
import { OrganizationInfo } from '@/component/Footer/data';
import { Toast } from '@/component/@share';
import { devices } from '@/globalStyle';
import { useWindowResize } from '@/hooks';
import { ToastType } from '@/types/Toast';
import { useRecoilState } from 'recoil';
import { copyTypes } from '@/store';

export const Footer = () => {
  const windowSize = useWindowResize();
  const [toastType, setToastType] = useState<ToastType>('error');
  const [isToastOpened, setIsToastOpened] = useState(false);
  const [copyType, setCopyType] = useRecoilState(copyTypes);

  const copyEmail = (copyResult: ToastType) => {
    setIsToastOpened(true);
    setToastType(copyResult);
    setCopyType('email');
  };

  return (
    <Container>
      {windowSize.width < devices.web ? (
        <>
          <Mail email={OrganizationInfo.email} onClick={copyEmail} />
          <Privacy
            firstContent="개인정보 처리 방침"
            secondContent="서비스 이용약관"
          />
          <CopyRight content={OrganizationInfo.copyRight} />
        </>
      ) : (
        <WebContainer>
          <InnerContainer>
            <Mail email={OrganizationInfo.email} onClick={copyEmail} />
            <CopyRight content={OrganizationInfo.copyRight} />
          </InnerContainer>
          <Privacy
            firstContent="개인정보 처리 방침"
            secondContent="서비스 이용약관"
          />
        </WebContainer>
      )}
      {isToastOpened && copyType === 'email' && (
        <Toast
          type={toastType}
          message={
            toastType === 'success'
              ? '메일 주소가 복사되었습니다'
              : '메일 주소 복사에 실패하였습니다'
          }
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray5};
  width: 100%;
  height: 150px;
  padding: 0 150px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  gap: 12px;
  @media ${({ theme }) => theme.size.web} {
    padding: 0;
    align-items: center;
  }
`;

const WebContainer = styled.div`
  @media ${({ theme }) => theme.size.web} {
    display: flex;
    width: 1200px;
    height: 80px;
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
