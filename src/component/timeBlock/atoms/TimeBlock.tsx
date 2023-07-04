import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { isatty } from 'tty';

interface TimeBlockProps {
  // time: string;
  // date: string;
  active: boolean;
  onClick: () => void;
}

export const TimeBlock = ({ active, onClick }: TimeBlockProps) => {
  const [isActive, setIsActive] = useState(true);

  // const onClickEvent = () => {
  //   {
  //     isActive ? setData({}) : setData({ time: { time }, date: { date } });
  //   }
  //   setIsActive(!isActive);
  // };

  useEffect(() => {
    setIsActive(!isActive);
  }, [active]);

  return (
    <>
      <TimeBlockAtom
        $isActive={isActive}
        onClick={() => onClick()}
      ></TimeBlockAtom>
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
