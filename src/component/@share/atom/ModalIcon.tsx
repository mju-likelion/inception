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
        return <ModalIconUser />;
      case 'codeError':
        return <ModalIconRoom />;

      default:
        return <ModalIconWarning />;
    }
  };

  return <Container>{ModalIconvalue()}</Container>;
};

const Container = styled.div``;

const ModalIconUser = styled(ModalIconUserSVG)``;
const ModalIconRoom = styled(ModalIconRoomSVG)``;
const ModalIconWarning = styled(ModalIconWarningSVG)``;
