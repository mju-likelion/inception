import styled from 'styled-components';
import { ReactComponent as LineSVG } from '@/assets/images/Line.svg';

interface LineProps {
  isActice?: boolean;
}

export const Line = ({ isActice }: LineProps) => {
  return <>{isActice ? <MintLineSVG /> : <LineSVG />}</>;
};

const MintLineSVG = styled(LineSVG)`
  rect {
    fill: ${({ theme }) => theme.colors.mint1};
  }
`;
