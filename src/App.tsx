import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { InitStyle, theme, GlobalFont } from '@/globalStyle';
import { Header } from '@/component/@uikit';
import { Footer } from '@/component/Footer';
import { useScrollToTop } from '@/hooks';
import { useGAInitialize } from '@/hooks/useGA';

/**@Note 모든 페이지에 적용할 설정 및 컴포넌트를 지정한다. */
export function App() {
  useGAInitialize();
  useScrollToTop();

  return (
    <RecoilRoot>
      <InitStyle />
      <GlobalFont />
      <ThemeProvider theme={theme}>
        {/* 여기에 header, footer를 추가할 수 있다. */}
        <Header />
        {/* 라우터들이 Outlet에서 작동한다. */}
        <Outlet />
        <Footer />
      </ThemeProvider>
    </RecoilRoot>
  );
}
