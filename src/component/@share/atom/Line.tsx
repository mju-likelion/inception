import styled from 'styled-components';
import { ReactComponent as LineSVG } from '@/assets/images/Line.svg';

interface LineProps {
  isActive?: boolean;
}

export const Line = ({ isActive }: LineProps) => {
  return <>{isActive ? <MintLineSVG /> : <LineSVG />}</>;
};

const MintLineSVG = styled(LineSVG)`
  rect {
    fill: ${({ theme }) => theme.colors.mint1};
  }
`;
