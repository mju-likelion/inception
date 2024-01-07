import styled from 'styled-components';
import { ButtonLarge } from '@/component/@uikit';
import { ModalTitleBox } from '../molecules/ModalTitleBox';
import { ModalIcon } from '../atom/ModalIcon';
import { ModalDimmed } from '../atom/ModalDimmed';
import { useGaApi } from '@/hooks/useGA';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface ModalProps {
  error: string;
  isOpen: boolean;
  onCloseModal: () => void;
}

export const Modal = ({ error, isOpen, onCloseModal }: ModalProps) => {
  const location = useLocation();
  const { changePathnameToTPath, gaApi } = useGaApi();

  const getErrorTypeForGa = () => {
    if (error === 'codeError') {
      return 'not_exist_room';
    }
    if (error === 'loginError') {
      return 'not_exist_user';
    }
    return 'unknown_error';
  };

  useEffect(() => {
    if (isOpen) {
      gaApi.sendEvent({
        eventName: 't_show',
        tEventId: 302,
        tPath: changePathnameToTPath(location.pathname),
        tTarget: 'info_modal',
        tCase: getErrorTypeForGa(),
      });
    }
  }, [isOpen]);

  const onSetModalText = () => {
    const filterArray = ERROR_TEXT.filter((checkParameter) => {
      return checkParameter.errorType === error
        ? checkParameter.errorType
        : checkParameter.errorType === 'theOtherError';
    });

    //에러타입을 키로, 맞는 객체를 찾아와서 배열을 만들어줘
    return (
      <ModalTitleBox
        title={filterArray[0].title}
        content={filterArray[0].content}
      />
    );
  };

  const handleClose = (target: 'ok' | 'background') => () => {
    if (target === 'ok') {
      gaApi.sendEvent({
        eventName: 't_click',
        tEventId: 230,
        tPath: changePathnameToTPath(location.pathname),
        tTarget: 'info_modal_ok',
        tCase: getErrorTypeForGa(),
      });
    } else if (target === 'background') {
      gaApi.sendEvent({
        eventName: 't_click',
        tEventId: 234,
        tPath: changePathnameToTPath(location.pathname),
        tTarget: 'info_modal_background',
        tCase: getErrorTypeForGa(),
      });
    }

    onCloseModal();
  };

  return (
    <>
      {isOpen && (
        <ModalDimmed onClick={handleClose('background')}>
          <WrapModal onClick={(e) => e.stopPropagation()}>
            <ModalIconBox>
              <ModalIcon value={error} />
            </ModalIconBox>
            <TitleBox>{onSetModalText()}</TitleBox>
            <ButtonBlock>
              <ButtonLarge onClick={handleClose('ok')}>확인</ButtonLarge>
            </ButtonBlock>
          </WrapModal>
        </ModalDimmed>
      )}
    </>
  );
};

const ERROR_TEXT = [
  {
    errorType: 'codeError',
    title: '존재하지 않는 약속방입니다',
    content: '입장코드를 다시 한번 확인해주세요',
  },
  {
    errorType: 'loginError',
    title: '존재하지 않는 정보입니다',
    content:
      '해당 약속방에서 사용된 닉네임과 비밀번호인지 다시 한번 확인해주세요',
  },
  {
    errorType: 'theOtherError',
    title: '알 수 없는 에러가 발생했어요',
    content: '잠시 후에 다시 시도해주세요',
  },
];

const WrapModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 278px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.white};
`;

const ModalIconBox = styled.div`
  margin: 24px 122px 20px 122px;
`;

const TitleBox = styled.div`
  display: flex;
  width: 240px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonBlock = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;
