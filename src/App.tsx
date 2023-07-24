import { ThemeProvider } from 'styled-components';
import { InitStyle, theme, GlobalFont } from '@/globalStyle';
import { Outlet } from 'react-router-dom';
import { Header } from '@/component/@share';
import { Footer } from '@/component/Footer';
import { RecoilRoot } from 'recoil';
import { useState } from 'react';
import { Modal } from './component/@share/organisms/Modal';
import { ButtonLarge } from '@/component/@share';

/**@Note 모든 페이지에 적용할 설정 및 컴포넌트를 지정한다. */
export function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
  };
  return (
    <RecoilRoot>
      <InitStyle />
      <GlobalFont />
      <ThemeProvider theme={theme}>
        {/* 여기에 header, footer를 추가할 수 있다. */}
        <Header />
        <ButtonLarge click={openModal}>모달테스트</ButtonLarge>
        <Modal
          isOpen={modalOpen}
          error={'loginError'}
          onCloseModal={closeModal}
        />
        {/* 라우터들이 Outlet에서 작동한다. */}
        <Outlet />
        <Footer />
      </ThemeProvider>
    </RecoilRoot>
  );
}
