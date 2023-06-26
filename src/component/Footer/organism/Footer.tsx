import styled from 'styled-components';
import { Mail, Privacy, CopyRight } from '@/component/Footer/atoms';
import { OrganizationInfo } from '@/component/Footer/data/OrganizationInfo';

export const Footer = () => {
  return (
    <Container>
      <Mail email={OrganizationInfo.email} />
      <Privacy
        firstContent="개인정보 처리 방침"
        secondContent="서비스 이용약관"
      />
      <CopyRight content={OrganizationInfo.copyRight} />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray5};
  height: 150px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  padding-right: 150px;
`;
