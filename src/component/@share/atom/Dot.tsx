import { ReactComponent as DotSVG } from '@/assets/images/Dot.svg';
import styled from 'styled-components';

interface DotProps {
  isActice?: boolean;
}

export const Dot = ({ isActice }: DotProps) => {
  return <>{isActice ? <MintDotSVG /> : <DotSVG />}</>;
};

const MintDotSVG = styled(DotSVG)`
  circle {
    fill: ${({ theme }) => theme.colors.mint1};
  }
`;
