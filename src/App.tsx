import { ThemeProvider } from 'styled-components';
import { InitStyle, theme, GlobalFont } from '@/globalStyle';
import { Outlet } from 'react-router-dom';
import { Header } from '@/component/@share/organisms';
import { Footer } from '@/component/Footer';
import { TimeList, DateList } from './component/timeBlock/molecules';

/**@Note 모든 페이지에 적용할 설정 및 컴포넌트를 지정한다. */
export function App() {
  return (
    <>
      <InitStyle />
      <GlobalFont />
      <ThemeProvider theme={theme}>
        {/* 여기에 header, footer를 추가할 수 있다. */}
        <Header />
        <TimeList end="15:30" />
        <DateList
          page={1}
          dateList={[
            '2023-06-29',
            '2023-06-30',
            '2023-07-01',
            '2023-07-02',
            '2023-07-03',
            '2023-07-04',
          ]}
        />
        <DateList
          page={2}
          dateList={[
            '2023-06-29',
            '2023-06-30',
            '2023-07-01',
            '2023-07-02',
            '2023-07-03',
            '2023-07-04',
          ]}
        />
        {/* 라우터들이 Outlet에서 작동한다. */}
        <Outlet />
        <Footer />
      </ThemeProvider>
    </>
  );
}
