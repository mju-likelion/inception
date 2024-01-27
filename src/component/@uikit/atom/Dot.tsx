import { styled } from 'styled-components';
import { ReactComponent as DotSVG } from '@/assets/images/Dot.svg';

interface DotProps {
  isActive: boolean;
}

export const Dot = ({ isActive }: DotProps) => {
  return <>{isActive ? <MintDotSVG /> : <DotSVG />}</>;
};

const MintDotSVG = styled(DotSVG)`
  circle {
    fill: ${({ theme }) => theme.colors.mint1};
  }
`;
