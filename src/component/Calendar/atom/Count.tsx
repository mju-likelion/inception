import { styled } from 'styled-components';
import { ActiveStatus } from '@/types';

interface Props {
  count: number;
  activeStatus?: ActiveStatus;
  color?: string;
}

export const Count = ({ count, activeStatus = 'default' }: Props) => {
  return <Wrapper $activeStatus={activeStatus}>{count}</Wrapper>;
};

const Wrapper = styled.h1<{ $activeStatus: ActiveStatus }>`
  width: 16px;
  height: 16px;
  ${({ theme }) => theme.typographies.body5};
  position: absolute;
  bottom: 2px;
  right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
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

  @media ${({ theme }) => theme.size.web} {
    width: 24px;
    height: 24px;
    ${({ theme }) => theme.typographies.body2.regular};
  }
`;
