import { ReactComponent as DotSVG } from '@/assets/images/DotModal.svg';
import { ReactComponent as CheckSVG } from '@/assets/images/Check.svg';
import styled from 'styled-components';

interface DotModalProps {
  isActive: boolean;
  isPass: boolean;
}

export const DotModal = ({ isActive, isPass }: DotModalProps) => {
  return <>{isPass ? <MintCheckSVG isActive={isActive} /> : <DotSVG />}</>;
};

const MintCheckSVG = styled(CheckSVG)<{ isActive: boolean }>`
  path {
    fill: ${({ isActive }) =>
      isActive
        ? ({ theme }) => theme.colors.mint1
        : ({ theme }) => theme.colors.mint2};
  }
`;
