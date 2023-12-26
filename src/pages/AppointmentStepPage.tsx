import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { TabBar } from '@/component/@share';
import {
  LoginMasterTemplate,
  PossibleDateTemplate,
  PossibleTimeTemplate,
} from '@/component/@share/template';
import { RedirectPage } from '@/pages';
import { TAB_ITEMS } from '@/pages/data';
import {
  GetRoomDataResponse,
  registerSchedule,
  modifySchedule,
  getRoomData,
} from '@/util/api';
import { useRecoilValue } from 'recoil';
import {
  calendarState,
  dateListState,
  timeListState,
  timeTableState,
} from '@/store';
import { signUpNickname, signUpPassword } from '@/store/atoms/Login';
import { getDatesAsc } from '@/util';
import { toastState, currentToastType } from '@/store';
import { useRecoilState } from 'recoil';
import { useGaApi } from '@/hooks/useGA';

export const AppointmentStepPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const navigate = useNavigate();
  const params = useParams();
  const [roomInfo, setRoomInfo] = useState<GetRoomDataResponse>();
  const token = localStorage.getItem((params.code ?? '') + 'token');
  const [, setIsToastOpened] = useRecoilState(toastState);
  const [, setToastType] = useRecoilState(currentToastType);

  // 이전에 선택한 값이 있는지 판별하기 위함.
  // appointment step에 이동이 발생했을 때만 선택한 값이 있다고 판별한다.
  const prevCalendarDataExist = useRef(false);
  const { gaApi } = useGaApi();

  const calendar = useRecoilValue(calendarState);
  const timeBlock = useRecoilValue(timeTableState);
  const dateList = useRecoilValue(dateListState);
  const timeList = useRecoilValue(timeListState);
  const nickname = useRecoilValue(signUpNickname);
  const password = useRecoilValue(signUpPassword);

  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    if (roomInfo?.dateOnly) {
      return setSelectedDates(
        calendar
          .filter((state) => state.activeStatus === 'active')
          .map((calendarState) => calendarState.date)
      );
    }
  }, [calendar]);

  useEffect(() => {
    // 시간도 선택할 수 있는 경우 (2023-08-29를 2023-08-29 09:00)과 같이 형태를 변경
    const dateWithTime: string[] = [];
    timeBlock.map((itemList, timeIndex) => {
      itemList.filter((item, dateIndex) => {
        const date = dateList[dateIndex] + ' ' + timeList[timeIndex];

        item && dateWithTime.push(date);
      });
      getDatesAsc(dateWithTime);
    });
    !roomInfo?.dateOnly && setSelectedDates(dateWithTime);
  }, [timeBlock]);

  const preventRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    (async () => {
      const res = await getRoomData({ id: params.code ?? '' });
      setRoomInfo(res);

      window.addEventListener('beforeunload', preventRefresh);
      if (!token && (step === '2' || step === '3')) {
        navigate(`/appointment/${params.code}?step=1`);
      }
    })();
    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, []);

  useEffect(() => {
    gaApi.sendEvent({
      eventName: 't_view',
      tEventId: 102,
      tPath: '/vote-room',
      tStep: step ? (+step as 1 | 2 | 3) : null,
    });
  }, [step]);

  const requestCreateUser = async () => {
    const res = await registerSchedule({
      roomCode: params.code ?? '',
      username: nickname,
      password: password,
      dateOnly: roomInfo?.dateOnly ?? !!roomInfo?.dateOnly,
      dates: selectedDates,
    });
    localStorage.setItem(
      (params.code ?? '') + 'token',
      res?.data.accessToken ?? ''
    );
    navigate(`/result?code=${params.code}`);
  };

  const modifySceduleByToken = async (token: string) => {
    const res = await modifySchedule(token, params.code ?? '', {
      dates: selectedDates,
    });

    if (res) {
      setIsToastOpened(true);
      setToastType('schedule');
      navigate(`/result?code=${params.code}`);
    } else {
      roomInfo?.dateOnly
        ? step && navigate(`/appointment/${params.code}?step=3`)
        : step && navigate(`/appointment/${params.code}?step=${+step + 1}`);
    }
  };

  const handleButtonClick = () => {
    const token = localStorage.getItem((params.code ?? '') + 'token');
    if (step === '3') {
      gaApi.sendEvent({
        eventName: 't_click',
        tEventId: 218,
        tPath: '/vote-room',
        tTarget: 'submit',
        tRoomCode: params.code ?? '',
        tType: token ? 'edit' : 'create',
      });

      prevCalendarDataExist.current = false;
      if (token) {
        modifySceduleByToken(token);
        //step 3에서 토큰이 이미 있다면, 이건 수정
      }
      requestCreateUser();
    } else {
      gaApi.sendEvent({
        eventName: 't_click',
        tEventId: 216,
        tPath: '/vote-room',
        tTarget: 'next',
        tStep: step ? (+step as 1 | 2) : null,
        tRoomCode: params.code ?? '',
        tType: token ? 'edit' : 'create',
      });

      prevCalendarDataExist.current = true;

      if (step === '2' && token) {
        modifySceduleByToken(token);
      } else {
        if (token && roomInfo?.dateOnly) {
          modifySceduleByToken(token);
          //이미 제출했고, 날짜만 지정한 상태에서 다시 1단계에 입장한다면 시간 수정도 로그인도 불필요하므로 바로 결과창으로 라우팅
        } else {
          roomInfo?.dateOnly
            ? step && navigate(`/appointment/${params.code}?step=3`)
            : step && navigate(`/appointment/${params.code}?step=${+step + 1}`);
        }
      }
    }
  };

  const handleTabBarClick = (tab: string) => {
    tab === TAB_ITEMS[0].id && navigate('/');
  };

  const renderPage = () => {
    switch (step) {
      case '1':
        return (
          <PossibleDateTemplate
            buttonClick={handleButtonClick}
            selectableDates={roomInfo?.dates}
            prevCalendarDataExist={prevCalendarDataExist.current}
            isDateOnly={roomInfo?.dateOnly}
            token={token ? token : ''}
          />
        );
      case '2':
        return (
          <PossibleTimeTemplate
            buttonClick={handleButtonClick}
            startTime={roomInfo?.startTime as string}
            endTime={roomInfo?.endTime as string}
            token={token ? token : ''}
          />
        );
      case '3':
        return (
          <LoginMasterTemplate
            buttonClick={handleButtonClick}
            isDateOnly={roomInfo?.dateOnly}
            token={token ? token : ''}
          />
        );
      default:
        return <RedirectPage />;
    }
  };

  return (
    <>
      {(step === '1' || step === '2' || step === '3') && (
        <TabBar tabItems={TAB_ITEMS} onClick={handleTabBarClick} />
      )}
      {renderPage()}
    </>
  );
};
