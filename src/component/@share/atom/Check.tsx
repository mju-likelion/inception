import { ReactComponent as CheckSVG } from '@/assets/images/Check.svg';
import styled from 'styled-components';

interface CheckProps {
  isActive?: boolean;
}

export const Check = ({ isActive }: CheckProps) => {
  return <>{isActive ? <MintCheckSVG /> : <Mint2CheckSVG />}</>;
};

const MintCheckSVG = styled(CheckSVG)`
  path {
    fill: ${({ theme }) => theme.colors.mint1};
  }
`;

const Mint2CheckSVG = styled(CheckSVG)`
  path {
    fill: ${({ theme }) => theme.colors.mint2};
  }
`;
