import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Logo, Helper } from '@/component/@share/atom';
import { useEffect, useState } from 'react';
import { HelperModal } from './HelperModal';
import { useLocation } from 'react-router-dom';
import { useGaApi } from '@/hooks/useGA';

export const Header = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const stepParams = searchParams.get('step');
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(1);
  const { changePathnameToTPath, gaApi } = useGaApi();

  useEffect(() => {
    if (location.pathname === '/') setStep(1);
    else if (stepParams === '1' || stepParams === '2') setStep(2);
    else if (stepParams === '3') setStep(3);
    else setStep(0);
  }, [location]);

  const onLogoClick = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 201,
      tPath: changePathnameToTPath(location.pathname),
      tTarget: 'logo',
      tStep: stepParams ? (+stepParams as 1 | 2 | 3) : null,
    });

    navigate('/');
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <HeaderBox>
        <InnerBox>
          <Logo onClick={onLogoClick} />
          <Helper onClick={openModal} />
        </InnerBox>
      </HeaderBox>
      <HelperModal
        step={step}
        isOpen={modalOpen}
        onCloseModal={closeModal}
      ></HelperModal>
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
