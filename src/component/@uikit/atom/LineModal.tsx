import { styled } from 'styled-components';
import { ReactComponent as LineSVG } from '@/assets/images/LineModal.svg';

interface LineModalProps {
  isPass: boolean;
}

export const LineModal = ({ isPass }: LineModalProps) => {
  return <>{isPass ? <MintLineModalSVG /> : <LineSVG />}</>;
};

const MintLineModalSVG = styled(LineSVG)`
  rect {
    fill: ${({ theme }) => theme.colors.mint2};
  }
`;
