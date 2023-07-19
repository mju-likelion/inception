import { ActiveStatus } from '@/types';
import { useEffect } from 'react';
import { styled } from 'styled-components';

interface Props {
  count: number;
  activeStatus?: ActiveStatus;
  color?: string;
}

export const Count = ({ count, activeStatus = 'default' }: Props) => {
  return <Wrapper $activeStatus={activeStatus}>{count}</Wrapper>;
};

const Wrapper = styled.h1<{ $activeStatus: ActiveStatus }>`
  position: absolute;
  bottom: 2px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  font-size: 11px;
  background-color: ${({ $activeStatus, theme }) => {
    if ($activeStatus === 'default') {
      return theme.colors.gray1;
    } else if ($activeStatus === 'active') {
      return theme.colors.mint1;
    }
  }};
  color: ${({ $activeStatus, theme }) => {
    if ($activeStatus === 'default') {
      return theme.colors.white;
    } else if ($activeStatus === 'active') {
      return theme.colors.white;
    }
  }};
`;
