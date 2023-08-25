import styled from 'styled-components';
import { Information, TitleBox } from '@/component/@share/molecules';
import { Calendar } from '@/component';
import { ButtonSmall, LoadingIcon, TabBar, Toast } from '@/component/@share';
import Time from '@/assets/images/Time.svg';
import People from '@/assets/images/People.svg';
import { TAB_ITEMS } from '@/pages/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ToastStatus } from '@/types/Toast';
import { toastState, currentToastType } from '@/store';
import { useRecoilState } from 'recoil';
import { resultRoom } from '@/util/api';
import { appointmentResultData } from '@/store/atoms/Request';

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const [isToastOpened, setIsToastOpened] = useRecoilState(toastState);
  const [urlToastType, setUrlToastType] = useState<ToastStatus>('error');
  const [codeToastType, setCodeToastType] = useState<ToastStatus>('error');
  const [copyType, setCopyType] = useRecoilState(currentToastType);
  const [isFetched, setIsFetched] = useState(false);

  // 약속 정보
  const [appointmentData, setAppointmentData] = useRecoilState(
    appointmentResultData
  );

  const onClick = (tab: string) => {
    tab === TAB_ITEMS[0].id && navigate('/');
  };

  const copyUrl = (copyResult: ToastStatus) => {
    setIsToastOpened(true);
    setUrlToastType(copyResult);
    setCopyType('url');
  };

  const copyCode = (copyResult: ToastStatus) => {
    setIsToastOpened(true);
    setCodeToastType(copyResult);
    setCopyType('code');
  };

  const routeModifyPage = () => {
    navigate(`/appointment/${code}?step=1`);
  };

  useEffect(() => {
    (async () => {
      let data;
      code && (data = await resultRoom({ id: code }));

      if (data) {
        setAppointmentData(data);
        setIsFetched(true);
      }
    })();
  }, []);

  return (
    <>
      <TabBar onClick={onClick} tabItems={TAB_ITEMS} />
      {isFetched ? (
        <ResultPageBlock>
          <ContentBlock>
            <TitleBoxBlock>
              <TitleBox
                title="일정들을 모아보니"
                content="링크를 공유한 사람들과 겹치는 가능 날짜에 인원수와 함께 표시됩니다"
              />
            </TitleBoxBlock>
            <Calendar viewType="result" />
            <GridFooter>
              <ButtonSmall onClick={routeModifyPage}>일정 수정</ButtonSmall>
            </GridFooter>
            <InformationBlock>
              <Information
                icon={Time}
                title="겹치는 시간을 확인하려면 날짜를 선택하세요"
                isNull={true}
                isEnabled={false}
              />
              <Information
                icon={People}
                title="제출한 사람"
                content="학수, 원유, 해빈"
              />
              <Information
                title="약속방 링크"
                content={`${window.location.origin}/appointment/${code}?step=1`} // url 전체를 가져오기 위해 window 사용
                isEnabled={true}
                clickButton={copyUrl}
              />
              <Information
                title="약속방 입장 코드"
                content={code ?? undefined}
                isEnabled={true}
                clickButton={copyCode}
              />
            </InformationBlock>
          </ContentBlock>
        </ResultPageBlock>
      ) : (
        <LoadingIcon spinnerType="mintSpinner" />
      )}
      {isToastOpened && copyType === 'url' && (
        <Toast
          status={urlToastType}
          toastType={copyType}
          descriptionActive="error"
        />
      )}
      {isToastOpened && copyType === 'code' && (
        <Toast
          status={codeToastType}
          toastType={copyType}
          descriptionActive="error"
        />
      )}
    </>
  );
};

const ResultPageBlock = styled.div`
  min-width: 320px;
  max-width: 540px;
  margin: auto;
`;

const ContentBlock = styled.div`
  text-align: center;
  margin: 0 20px;
`;

const TitleBoxBlock = styled.div`
  margin: 30px 0 12px 0;
  @media ${({ theme }) => theme.size.tablet} {
    margin: 60px 0 24px 0;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 80px;
  }
`;

const GridFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 28px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-bottom: 42px;
  }
`;

const InformationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 100px;
`;
