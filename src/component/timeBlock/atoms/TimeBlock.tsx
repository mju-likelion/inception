import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { isatty } from 'tty';

interface TimeBlockProps {
  active: boolean;
}

export const TimeBlock = ({ active }: TimeBlockProps) => {
  return <TimeBlockAtom $isActive={active} />;
};

const TimeBlockAtom = styled.td<{ $isActive: boolean }>`
  width: 52px;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.mint1 : theme.colors.gray5};
  &:hover {
    background-color: ${({ theme }) => theme.colors.mint2};
  }
`;
