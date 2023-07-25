import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App';
import { CodeSubmitTemplate } from '@/component/@share/template/CodeSubmitTemplate';
import {
  Home,
  CalendarTest,
  Result,
  AppointmentStepPage,
  RedirectPage,
} from '@/pages';

export * from '@/App';
export * from './Home';
export * from './CalendarTest';
export * from './AppointmentStepPage';
export * from './Result';
export * from './RedirectPage';

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
        path: 'appointment', // ex) localhost:3000/appointment
        element: <AppointmentStepPage />,
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
