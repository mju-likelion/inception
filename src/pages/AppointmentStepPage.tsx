import { useSearchParams, useNavigate } from 'react-router-dom';
import { TabBar } from '@/component/@share';
import { RedirectPage } from '@/component/ErrorPage/atoms';
import { LoginMasterTemplate } from '@/component/@share/template/LoginMasterTemplate';
import { PossibleDatePage } from '@/pages';
import { PossibleTimePage } from '@/pages/PossibleTimePage';
import { TabItem } from '@/types';

export const AppointmentStepPage = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get('step');
  const navigate = useNavigate();

  const tabItems: TabItem[] = [
    {
      id: 'default',
      title: '약속 잡기',
    },
    {
      id: 'result',
      title: '약속방',
    },
  ];

  const handleButtonClick = () => {
    if (step === '3') {
      navigate('/result');
    } else {
      step && navigate(`/appointment?step=${+step + 1}`);
    }
  };

  const renderPage = () => {
    switch (step) {
      case '1':
        return <PossibleDatePage buttonClick={handleButtonClick} />;
      case '2':
        return <PossibleTimePage buttonClick={handleButtonClick} />;
      case '3':
        return <LoginMasterTemplate buttonClick={handleButtonClick} />;
      default:
        return <RedirectPage />;
    }
  };

  return (
    <>
      <TabBar tabItems={tabItems} />
      {renderPage()}
    </>
  );
};
