import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App';
import { Home } from './Home';
import { CalendarTest } from './CalendarTest';
import { PossibleDatePage } from './PossibleDatePage';
import { RedirectPage } from '@/component/ErrorPage/atoms';
import { PossibleTimePage } from './PossibleTimePage';
import { Result } from './Result';
import { LoginMasterTemplate } from '@/component/@share/template/LoginMasterTemplate';
import { CodeSubmitTemplate } from '@/component/@share/template/CodeSubmitTemplate';

export * from '@/App';
export * from './Home';
export * from './CalendarTest';
export * from './PossibleDatePage';

/** @Note 라우팅 정보를 가지고있습니다. */
export const pages = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // 중첩 라우팅, App 컴포넌트를 기본으로 하고 그 위에 나머지 컴포넌트들을 라우팅한다.
    children: [
      {
        path: '', // ex) localhost:3000
        element: <Home />,
      },
      {
        path: 'submit-code', // ex) localhost:3000/submit-code
        element: <CodeSubmitTemplate />,
      },
      {
        path: 'calendar', // ex) localhost:3000/calendar
        element: <CalendarTest />,
      },
      {
        path: 'select-date', // ex) localhost:3000/select-date
        element: <PossibleDatePage />,
      },
      {
        path: 'select-time', // ex) localhost:3000/selectTime
        element: <PossibleTimePage />,
      },
      {
        path: 'login', // ex) localhost:3000/login
        element: <LoginMasterTemplate />,
      },
      {
        path: 'result', // ex) localhost:3000/result
        element: <Result />,
      },
      {
        path: '/*', // ex) not-found
        element: <RedirectPage />,
      },
    ],
  },
]);
