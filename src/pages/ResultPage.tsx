import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Information, TitleBox } from '@/component/@share/molecules';
import { Calendar } from '@/component';
import { ButtonSmall, LoadingIcon, TabBar, Toast } from '@/component/@share';
import Time from '@/assets/images/Time.svg';
import People from '@/assets/images/People.svg';
import { TAB_ITEMS } from '@/pages/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastStatus } from '@/types/Toast';
import { toastState, currentToastType } from '@/store';
import { useRecoilState } from 'recoil';
import { resultRoom, resultRoomByDate } from '@/util/api';
import { appointmentResultData } from '@/store/atoms/Request';
import { useResultTimeTitle, useResultTitle } from '@/hooks';
import { Modal } from '@/component/@share/organisms/Modal';

export type FetchMostSelectedTimeForDate = (date: string) => Promise<void>;

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  const token = localStorage.getItem((code ?? '') + 'token');
  //disabled상태를 판단하기 위한 로컬스토로지 토큰을 가져옵니다.

  // 약속 정보
  const [appointmentData, setAppointmentData] = useRecoilState(
    appointmentResultData
  );
  const [mostSelectedTime, setMostSelectedTime] = useState<string[]>();
  const [isCalendarFetched, setIsCalendarFetched] = useState(false);
  const [isMostSelectedTimeFetched, setIsMostSelectedTimeFetched] =
    useState(true);

  const [isToastOpened, setIsToastOpened] = useRecoilState(toastState);
  const [urlToastStatus, setUrlToastStatus] = useState<ToastStatus>('error');
  const [codeToastStatus, setCodeToastStatus] = useState<ToastStatus>('error');
  const [toastType, setToastType] = useRecoilState(currentToastType);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { title, subTitle } = useResultTitle(appointmentData);

  const timeInformationTitle = useResultTimeTitle(
    appointmentData?.votingUsers,
    appointmentData?.dateOnly,
    appointmentData?.enableTimes,
    mostSelectedTime
  );

  const handleTabNavigate = (tab: string) => {
    tab === TAB_ITEMS[0].id && navigate('/');
  };

  const copyUrl = (copyResult: ToastStatus) => {
    setIsToastOpened(true);
    setUrlToastStatus(copyResult);
    setToastType('url');
  };

  const copyCode = (copyResult: ToastStatus) => {
    setIsToastOpened(true);
    setCodeToastStatus(copyResult);
    setToastType('code');
  };

  const navigateModifyPage = () => {
    navigate(`/appointment/${code}?step=1`);
  };

  const fetchMostSelectedTimeForDate: FetchMostSelectedTimeForDate = async (
    date: string
  ) => {
    setIsMostSelectedTimeFetched(false);
    if (code) {
      const mostSelectedTime = await resultRoomByDate({ date, id: code });
      setMostSelectedTime(mostSelectedTime?.everyoneSelectedTimes);
      setIsMostSelectedTimeFetched(true);
    }
  };

  const handleCodeModal = () => {
    setIsOpenModal(false);
    navigate('/submit-code');
  };

  useEffect(() => {
    (async () => {
      let data;
      code && (data = await resultRoom({ id: code }));

      if (data) {
        setAppointmentData(data);
        setIsCalendarFetched(true);
      } else {
        setIsOpenModal(true);
      }
    })();
  }, []);

  return (
    <>
      <TabBar onClick={handleTabNavigate} tabItems={TAB_ITEMS} />
      {isCalendarFetched ? (
        <ResultPageBlock>
          <ContentBlock>
            <TitleBoxBlock>
              <TitleBox title={title} content={subTitle} total={3} />
            </TitleBoxBlock>
            <Calendar
              viewType="result"
              fetchMostSelectedTimeForDate={fetchMostSelectedTimeForDate}
            />
            <GridFooter>
              <ButtonSmall onClick={navigateModifyPage} isDisabled={!token}>
                일정 수정
              </ButtonSmall>
            </GridFooter>
            <InformationBlock>
              <Information
                icon={Time}
                title={timeInformationTitle}
                content={mostSelectedTime?.join(', ')}
                isOnlyTitle={!mostSelectedTime ? true : false}
                isLoading={!isMostSelectedTimeFetched ? true : false}
              />
              <Information
                icon={People}
                title="제출한 사람"
                content={appointmentData.votingUsers.join(', ')}
              />
              <Information
                title="약속방 링크"
                content={`${window.location.origin}/appointment/${code}?step=1`} // url 전체를 가져오기 위해 window 사용
                enableCopy={true}
                clickButton={copyUrl}
              />
              <Information
                title="약속방 입장 코드"
                content={code ?? undefined}
                enableCopy={true}
                clickButton={copyCode}
              />
            </InformationBlock>
          </ContentBlock>
        </ResultPageBlock>
      ) : (
        <LoadingContent>
          <LoadingIcon spinnerType="mintSpinner" />
        </LoadingContent>
      )}
      {isToastOpened && toastType === 'url' && (
        <Toast
          status={urlToastStatus}
          toastType={toastType}
          descriptionActive="error"
        />
      )}
      {isToastOpened && toastType === 'code' && (
        <Toast
          status={codeToastStatus}
          toastType={toastType}
          descriptionActive="error"
        />
      )}
      {isToastOpened && toastType === 'schedule' && (
        <Toast status={'success'} toastType={toastType} />
      )}
      <Modal
        error="codeError"
        isOpen={isOpenModal}
        onCloseModal={handleCodeModal}
      />
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

const LoadingContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 274px);
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
