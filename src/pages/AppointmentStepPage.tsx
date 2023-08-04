import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TabBar } from '@/component/@share';
import {
  LoginMasterTemplate,
  PossibleDateTemplate,
  PossibleTimeTemplate,
} from '@/component/@share/template';
import { RedirectPage } from '@/pages';
import { TAB_ITEMS } from '@/pages/data';

export const AppointmentStepPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const navigate = useNavigate();

  const preventRefresh = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventRefresh);
      if (step === '2' || step === '3') {
        navigate('/appointment?step=1');
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
      step && navigate(`/appointment?step=${+step + 1}`);
    }
  };

  const handleTabBarClick = (tab: string) => {
    tab === TAB_ITEMS[0].id && navigate('/');
  };

  const renderPage = () => {
    switch (step) {
      case '1':
        return <PossibleDateTemplate buttonClick={handleButtonClick} />;
      case '2':
        return <PossibleTimeTemplate buttonClick={handleButtonClick} />;
      case '3':
        return <LoginMasterTemplate />;
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
