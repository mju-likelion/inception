import { ReactComponent as ModalIconUserSVG } from '@/assets/images/ModalIconUser.svg';
import { ReactComponent as ModalIconWarningSVG } from '@/assets/images/ModalIconWarning.svg';
import { ReactComponent as ModalIconRoomSVG } from '@/assets/images/ModalIconRoom.svg';
import { styled } from 'styled-components';

interface ModalIconProps {
  value: 'user' | 'room' | 'warning';
}

export const ModalIcon = ({ value }: ModalIconProps) => {
  const ModalIconvalue = () => {
    switch (value) {
      case 'user':
        return <ModalIconUser />;
        break;
      case 'room':
        return <ModalIconRoom />;
        break;
      case 'warning':
        return <ModalIconWarning />;
        break;
    }
  };

  return <Container>{ModalIconvalue()}</Container>;
};

const Container = styled.div``;

const ModalIconUser = styled(ModalIconUserSVG)``;
const ModalIconRoom = styled(ModalIconRoomSVG)``;
const ModalIconWarning = styled(ModalIconWarningSVG)``;
