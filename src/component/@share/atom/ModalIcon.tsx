import { ReactComponent as ModalIconUserSVG } from '@/assets/images/ModalIconUser.svg';
import { ReactComponent as ModalIconWarningSVG } from '@/assets/images/ModalIconWarning.svg';
import { ReactComponent as ModalIconRoomSVG } from '@/assets/images/ModalIconRoom.svg';
import { styled } from 'styled-components';

interface ModalIconProps {
  value: 'loginError' | 'codeError' | string;
}

export const ModalIcon = ({ value }: ModalIconProps) => {
  const ModalIconvalue = () => {
    switch (value) {
      case 'loginError':
        return <ModalIconUserSVG />;
      case 'codeError':
        return <ModalIconRoomSVG />;
      default:
        return <ModalIconWarningSVG />;
    }
  };

  return <Container>{ModalIconvalue()}</Container>;
};

const Container = styled.div``;
