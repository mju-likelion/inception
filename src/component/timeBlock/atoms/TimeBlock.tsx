import styled from 'styled-components';
import { useState } from 'react';
import { isatty } from 'tty';

interface TimeBlockProps {
  time: string;
  date: string;
}

export const TimeBlock = ({ time, date }: TimeBlockProps) => {
  const [data, setData] = useState({});
  const [isActive, setIsActive] = useState(false);

  const onClickEvent = () => {
    {
      isActive ? setData({}) : setData({ time: { time }, date: { date } });
    }
    setIsActive(!isActive);
  };

  return (
    <>
      <TimeBlockAtom $isActive={isActive} onClick={() => onClickEvent()} />
    </>
  );
};

const TimeBlockAtom = styled.div<{ $isActive: boolean }>`
  width: 52px;
  height: 46px;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.mint1 : theme.colors.gray5};
  &:hover {
    background-color: ${({ theme }) => theme.colors.mint2};
  }
`;
