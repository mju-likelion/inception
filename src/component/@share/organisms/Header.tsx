import styled from 'styled-components';
import { Logo, Helper } from '@/component/@share/atom';
import { useState } from 'react';
import { HelperModal } from './HelperModal';

export const Header = () => {
  const [clicked, setClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setClicked(false);
  };
  return (
    <>
      <HeaderBox>
        <InnerBox>
          <Logo />
          <Helper onClick={openModal} />
        </InnerBox>
      </HeaderBox>
      <HelperModal step={1} open={modalOpen} close={closeModal}></HelperModal>
    </>
  );
};

const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 14px 20px;
`;

const InnerBox = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  @media ${({ theme }) => theme.size.web} {
    justify-content: unset;
    gap: 1052px;
  }
`;
