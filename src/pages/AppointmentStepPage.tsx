import { useEffect, useState, useMemo, useRef } from 'react';
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
  viewRoom,
  ViewRoomResponse,
  registerSchedule,
  modifySchedule,
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

export const AppointmentStepPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const navigate = useNavigate();
  const params = useParams();
  const [roomInfo, setRoomInfo] = useState<ViewRoomResponse>();
  const [isToastOpened, setIsToastOpened] = useRecoilState(toastState);
  const [toastType, setToastType] = useRecoilState(currentToastType);

  // 이전에 선택한 값이 있는지 판별하기 위함.
  // appointment step에 이동이 발생했을 때만 선택한 값이 있다고 판별한다.
  const prevCalendarDataExist = useRef(false);

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
      const res = await viewRoom({ id: params.code ?? '' });
      setRoomInfo(res);

      window.addEventListener('beforeunload', preventRefresh);
      if (step === '2' || step === '3') {
        navigate(`/appointment/${params.code}?step=1`);
      }
    })();
    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, []);

  const requestCreateUser = async () => {
    const res = await registerSchedule({
      roomCode: params.code ?? '',
      username: nickname,
      password: password,
      dateOnly: roomInfo?.dateOnly ?? !!roomInfo?.dateOnly,
      dates: selectedDates,
    });
    localStorage.setItem('token', res?.data.accessToken ?? '');
    navigate(`/result?code=${params.code}`);
  };

  const modifyUser = async (token: string) => {
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
    const token = localStorage.getItem('token');
    if (step === '3') {
      prevCalendarDataExist.current = false;
      requestCreateUser();
    } else {
      prevCalendarDataExist.current = true;

      if (step === '1' && roomInfo?.dateOnly && token) {
        modifyUser(token);
      } else if (step === '2' && token) {
        modifyUser(token);
      } else {
        roomInfo?.dateOnly
          ? step && navigate(`/appointment/${params.code}?step=3`)
          : step && navigate(`/appointment/${params.code}?step=${+step + 1}`);
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
          />
        );
      case '2':
        return (
          <PossibleTimeTemplate
            buttonClick={handleButtonClick}
            startTime={roomInfo?.startTime as string}
            endTime={roomInfo?.endTime as string}
          />
        );
      case '3':
        return (
          <LoginMasterTemplate
            buttonClick={handleButtonClick}
            isDateOnly={roomInfo?.dateOnly}
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
