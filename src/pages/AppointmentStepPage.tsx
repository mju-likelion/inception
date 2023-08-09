import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { TabBar } from '@/component/@share';
import {
  LoginMasterTemplate,
  PossibleDateTemplate,
  PossibleTimeTemplate,
} from '@/component/@share/template';
import { RedirectPage } from '@/pages';
import { TAB_ITEMS } from '@/pages/data';
import { viewRoom } from '@/util/api';
import { ViewRoomResponse } from '@/util/api';

export const AppointmentStepPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const navigate = useNavigate();
  const params = useParams();
  const [roomInfo, setRoomInfo] = useState<ViewRoomResponse>();

  const preventRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    (async () => {
      const res = await viewRoom(params.code);
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

  const handleButtonClick = () => {
    if (step === '3') {
      navigate('/result');
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
