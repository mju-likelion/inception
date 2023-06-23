import { ReactComponent as CheckSVG } from '@/assets/images/Check.svg';
import styled from 'styled-components';

interface CheckProps {
  isActice?: boolean;
}

export const Check = ({ isActice }: CheckProps) => {
  return <>{isActice ? <MintCheckSVG /> : <Mint2CheckSVG />}</>;
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
