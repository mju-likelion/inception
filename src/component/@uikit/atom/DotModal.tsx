import { styled } from 'styled-components';
import { ReactComponent as DotSVG } from '@/assets/images/DotModal.svg';
import { ReactComponent as CheckSVG } from '@/assets/images/Check.svg';

interface DotModalProps {
  isActive: boolean;
  isPass: boolean;
}

export const DotModal = ({ isActive, isPass }: DotModalProps) => {
  return <>{isPass ? <MintCheckSVG $isActive={isActive} /> : <DotSVG />}</>;
};

const MintCheckSVG = styled(CheckSVG)<{ $isActive: boolean }>`
  path {
    fill: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.mint1 : theme.colors.mint2};
  }
`;
