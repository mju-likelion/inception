import styled from 'styled-components';
import { Mail, Privacy, CopyRight } from '@/component/Footer/atoms';
import { OrganizationInfo } from '@/component/Footer/data/OrganizationInfo';
import { devices } from '@/globalStyle';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <Container>
      {innerWidth < devices.web ? (
        <>
          <Mail email={OrganizationInfo.email} />
          <Privacy
            firstContent="개인정보 처리 방침"
            secondContent="서비스 이용약관"
          />
          <CopyRight content={OrganizationInfo.copyRight} />
        </>
      ) : (
        <WebContainer>
          <InnerContainer>
            <Mail email={OrganizationInfo.email} />
            <CopyRight content={OrganizationInfo.copyRight} />
          </InnerContainer>
          <Privacy
            firstContent="개인정보 처리 방침"
            secondContent="서비스 이용약관"
          />
        </WebContainer>
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
