import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom, TimeTableListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { getPaginationDate, getPaginationTable } from '@/util';
import { useEffect, useState } from 'react';
import range from 'lodash/range';
import { IsMouseDownAtom } from '@/store/atoms/TimeBlock/isMouseDown';
interface TimeBlockGroupProps {
  page: number;
  onSetActiveDate: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export const TimeBlockGroup = ({
  page,
  onSetActiveDate,
}: TimeBlockGroupProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const timeList = useRecoilValue(TimeListAtom);
  const [timeTable, setTimeTable] = useRecoilState(TimeTableListAtom);
  const isMouseDown = useRecoilValue(IsMouseDownAtom);

  useEffect(() => {
    const newTimeTable = range(timeList.length)?.map(() =>
      new Array(dateList.length).fill(false)
    );
    setTimeTable(newTimeTable);
  }, [timeList, dateList]);

  const newDateList = getPaginationDate({ page, dateList });
  const nowTimeTable = getPaginationTable({ page, timeTable });

  const handleClick = (x: number, y: number) => {
    const updatedArray = timeTable.map((value) => [...value]);
    updatedArray[x][y + (page - 1) * 4] = !updatedArray[x][y + (page - 1) * 4];
    setTimeTable(updatedArray);
  };

  useEffect(() => {
    {
      const DateBooleanArray = new Array(dateList.length).fill(false);

      timeTable.map((row, rowIndex) => {
        row.map((_, columnIndex) => {
          timeTable[rowIndex][columnIndex] &&
            (DateBooleanArray[columnIndex] = true);
        });
      });
      onSetActiveDate(DateBooleanArray);
    }
  }, [timeTable]);

  const [previousTarget, setPreviousTarget] = useState<HTMLButtonElement>();
  const touchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const target = document.elementFromPoint(
      event.touches[0].clientX,
      event.touches[0].clientY
    ) as HTMLButtonElement;

    if (
      isMouseDown &&
      target?.nodeName === 'BUTTON' &&
      target !== previousTarget
    ) {
      target.click();
      setPreviousTarget(target);
    }
  };

  return (
    <TimeBlockGroupBlock
      columns={newDateList.length}
      onTouchMove={(e) => touchMove(e)}
    >
      {nowTimeTable.map((row, rowIndex) =>
        row.map((_, columnIndex) => (
          <TimeBlock
            key={columnIndex}
            active={nowTimeTable[rowIndex][columnIndex] ? true : false}
            onClick={() => handleClick(rowIndex, columnIndex)}
          />
        ))
      )}
    </TimeBlockGroupBlock>
  );
};

const TimeBlockGroupBlock = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 2px;
  padding-bottom: 10px;
`;
