import { ThemeProvider } from 'styled-components';
import { InitStyle, theme, GlobalFont } from '@/globalStyle';
import { Outlet } from 'react-router-dom';
import { Header } from '@/component/@share/organisms';
import { Footer } from '@/component/Footer';
import { RecoilRoot } from 'recoil';

import {
  TimeList,
  DateList,
  SelectDate,
} from './component/timeBlock/molecules';

/**@Note 모든 페이지에 적용할 설정 및 컴포넌트를 지정한다. */
export function App() {
  return (
    <>
      <RecoilRoot>
        <InitStyle />
        <GlobalFont />
        <ThemeProvider theme={theme}>
          {/* 여기에 header, footer를 추가할 수 있다. */}
          <Header />
          <TimeList start="12:00" end="15:30" />
          <DateList page={1} />
          <DateList page={2} />
          <SelectDate />
          {/* 라우터들이 Outlet에서 작동한다. */}
          <Outlet />
          <Footer />
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}
