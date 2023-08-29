import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { TabBar } from '@/component/@share';
import {
  LoginMasterTemplate,
  PossibleDateTemplate,
  PossibleTimeTemplate,
} from '@/component/@share/template';
import { RedirectPage } from '@/pages';
import { TAB_ITEMS } from '@/pages/data';
import { viewRoom, ViewRoomResponse, registerSchedule } from '@/util/api';
import { useRecoilValue } from 'recoil';
import {
  calendarState,
  dateListState,
  timeListState,
  timeTableState,
} from '@/store';
import { signUpNickname, signUpPassword } from '@/store/atoms/Login';
import { getDatesAsc } from '@/util';

export const AppointmentStepPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const navigate = useNavigate();
  const params = useParams();
  const [roomInfo, setRoomInfo] = useState<ViewRoomResponse>();

  const calendar = useRecoilValue(calendarState);
  const timeBlock = useRecoilValue(timeTableState);
  const dateList = useRecoilValue(dateListState);
  const timeList = useRecoilValue(timeListState);
  const nickname = useRecoilValue(signUpNickname);
  const password = useRecoilValue(signUpPassword);

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  console.log('selectedDates >>', selectedDates);
  console.log('dateList >>', dateList);
  console.log('calendar >>', calendar);

  /**
   *  useMemo는 depts에 있는 내용이 같으면 연산 결과를 재실행 하지 않는다.
   *  useMemo는 결과를 반환하는 로직에 쓰임
   *  따라서 useMemo 내부 callback에서 set을 하여 sideEffect를 일으키는 것은 useMemo의 동작과 맞지 않음
   *  때문에 useMemo 동작을 useEffect로 변환
   * */
  useEffect(() => {
    if (roomInfo?.dateOnly) {
      return setSelectedDates(
        calendar
          .filter((state) => state.activeStatus === 'active')
          .map((calendarState) => calendarState.date)
      );
    }
  }, [calendar]);

  // 위 주석과 마찬가지로 useMemo는 결과를 반환하기 위해 사용함
  // 하지만 이전 코드에선 반환 값을 사용하고 있지 않고 sideEffect를 발생시키고 있었음.
  // 따라서 useEffect로 변경.
  useEffect(() => {
    // 시간도 선택할 수 있다면 (2023-08-29를 2023-08-29 09:00)과 같이 형태를 변경
    // splice는 원본 값을 변경시키는 매우 위험한 코드. 리렌더링을 발생시키지 않아 state 흐름을 파악하기 어렵게 만든다.
    // 아래와 같이 새로운 값을 만들어 덮어씌우는 형태로 만들기
    const dateWithTime: string[] = [];
    timeBlock.map((itemList, timeIndex) => {
      itemList.filter((item, dateIndex) => {
        const date = dateList[dateIndex] + ' ' + timeList[timeIndex];

        item && dateWithTime.push(date);
      });
      getDatesAsc(dateWithTime);
    });
    setSelectedDates(dateWithTime);
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

  const handleButtonClick = () => {
    if (step === '3') {
      requestCreateUser();
    } else {
      roomInfo?.dateOnly
        ? step && navigate(`/appointment/${params.code}?step=3`)
        : step && navigate(`/appointment/${params.code}?step=${+step + 1}`);
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
        return <LoginMasterTemplate buttonClick={handleButtonClick} />;
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
