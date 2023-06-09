import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Home } from './Home';

export * from '../App';
export * from './Home';

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
        path: 'about', // ex) localhost:3000/about
        element: <>나는 어바웃</>,
      },
    ],
  },
]);
