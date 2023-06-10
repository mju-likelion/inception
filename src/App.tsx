import { ThemeProvider } from 'styled-components';
import { InitStyle, theme } from '@/globalStyle';
import { Outlet } from 'react-router-dom';

/** @Note 모든 페이지에 적용할 설정 및 컴포넌트를 지정한다. */
export function App() {
  return (
    <>
      <InitStyle />
      <ThemeProvider theme={theme}>
        {/* 여기에 header, footer를 추가할 수 있다. */}
        {/* <Header /> */}

        {/* 라우터들이 Outlet에서 작동한다. */}
        <Outlet />
      </ThemeProvider>
    </>
  );
}
