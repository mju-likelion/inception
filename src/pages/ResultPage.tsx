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
import { TITLE, useResultTimeTitle, useResultTitle } from '@/hooks';
import { Modal } from '@/component/@share/organisms/Modal';
import { useGaApi } from '@/hooks/useGA';

export type FetchMostSelectedTimeForDate = (date: string) => Promise<void>;

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');
  // disabled상태를 판단하기 위한 로컬스토로지 토큰을 가져옵니다.
  const token = localStorage.getItem((code ?? '') + 'token');
  const { gaApi } = useGaApi();

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
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 226,
      tPath: '/room-result',
      tTarget: 'copy_link',
      tRoomCode: code ?? '',
    });

    setIsToastOpened(true);
    setUrlToastStatus(copyResult);
    setToastType('url');
  };

  const copyCode = (copyResult: ToastStatus) => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 227,
      tPath: '/room-result',
      tTarget: 'copy_code',
      tRoomCode: code ?? '',
    });

    setIsToastOpened(true);
    setCodeToastStatus(copyResult);
    setToastType('code');
  };

  const navigateModifyPage = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 223,
      tPath: '/room-result',
      tTarget: 'edit',
    });

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

  const onInformationSectionClick =
    (section: 'available_time' | 'voted_people') => () => {
      type Type =
        | 'on_ready'
        | 'exist'
        | 'no_time'
        | 'no_date_and_time'
        | 'date_only'
        | 'not_enough_voter'
        | 'no_voter'
        | undefined;

      const getType = (): Type => {
        switch (timeInformationTitle) {
          case TITLE.notClick:
            return 'on_ready';
          case TITLE.click:
            return 'exist';
          case TITLE.notOverlapTime:
            return 'no_time';
          case TITLE.notOverlapDate:
            return 'no_date_and_time';
          case TITLE.onlyDate:
            return 'date_only';
          case TITLE.notEnoughVotes:
            return 'not_enough_voter';
          case TITLE.notVoted:
            return 'no_voter';
          default:
            return;
        }
      };

      if (section === 'available_time') {
        gaApi.sendEvent({
          eventName: 't_click',
          tEventId: 224,
          tPath: '/room-result',
          tTarget: section,
          tType: getType()!,
          tCount: mostSelectedTime?.length,
        });
      } else if (section === 'voted_people') {
        gaApi.sendEvent({
          eventName: 't_click',
          tEventId: 225,
          tPath: '/room-result',
          tTarget: section,
          tCount: appointmentData.votingUsers.length,
        });
      }
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

  useEffect(() => {
    if (appointmentData) {
      gaApi.sendEvent({
        eventName: 't_view',
        tEventId: 104,
        tPath: '/room-result',
        // TODO: 추후 code 가 없을 경우도 대비해야 함
        tRoomCode: code!,
        tCount: appointmentData.votingUsers.length,
      });
    }
  }, [appointmentData]);

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
                onSectionClick={onInformationSectionClick('available_time')}
              />
              <Information
                icon={People}
                title="제출한 사람"
                content={appointmentData.votingUsers.join(', ')}
                onSectionClick={onInformationSectionClick('voted_people')}
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
