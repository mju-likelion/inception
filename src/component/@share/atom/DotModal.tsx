import { ReactComponent as DotSVG } from '@/assets/images/DotModal.svg';
import { ReactComponent as CheckSVG } from '@/assets/images/Check.svg';
import styled from 'styled-components';

interface DotModalProps {
  isActice?: boolean;
  isPass?: boolean;
}

export const DotModal = ({ isActice, isPass }: DotModalProps) => {
  return <>{isPass ? <MintCheckSVG isActice={isActice} /> : <DotSVG />}</>;
};

const MintCheckSVG = styled(CheckSVG)<{ isActice?: boolean }>`
  path {
    fill: ${({ isActice }) =>
      isActice
        ? ({ theme }) => theme.colors.mint1
        : ({ theme }) => theme.colors.mint2};
  }
`;
