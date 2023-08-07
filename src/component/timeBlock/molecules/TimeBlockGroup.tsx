import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  dateListState,
  timeListState,
  timeTableState,
  isMouseDownState,
} from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { getPaginationDate, getPaginationTable } from '@/util';
import { useEffect, useState } from 'react';
import range from 'lodash/range';
import { touchMoveDrag } from '@/util';

interface TimeBlockGroupProps {
  page: number;
  onSetActiveDate: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export const TimeBlockGroup = ({
  page,
  onSetActiveDate,
}: TimeBlockGroupProps) => {
  const dateList = useRecoilValue(dateListState);
  const timeList = useRecoilValue(timeListState);
  const [timeTable, setTimeTable] = useRecoilState(timeTableState);
  const isMouseDown = useRecoilValue(isMouseDownState);
  const [previousTarget, setPreviousTarget] = useState<HTMLButtonElement>();

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

  return (
    <TimeBlockGroupBlock
      columns={newDateList.length}
      onTouchMove={(event) =>
        touchMoveDrag({ event, isMouseDown, previousTarget, setPreviousTarget })
      }
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
