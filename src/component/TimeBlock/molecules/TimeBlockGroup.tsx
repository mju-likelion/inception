import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import range from 'lodash/range';
import {
  dateListState,
  timeListState,
  timeTableState,
  isMouseDownState,
} from '@/store/atoms';
import { TimeBlock } from '@/component/TimeBlock/atoms';
import { getPaginationDate, getPaginationTable, touchMoveDrag } from '@/util';

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
  const [pastTime, setPastTime] = useState<number>(-1);

  useEffect(() => {
    const newTimeTable = range(timeList.length)?.map(() =>
      new Array(dateList.length).fill(false)
    );

    //선택된 타임 테이블이 존재 하는 경우 기존에 있던 타임 테이블로 세팅
    timeTable.flat().every((selected) => {
      return selected === false;
    })
      ? setTimeTable(newTimeTable)
      : setTimeTable(timeTable);

    timeList.map((time, index) => {
      if (new Date() > new Date(dateList[0] + ' ' + time)) setPastTime(index);
    });
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
      {pastTime + 1 > 0 && page === 1
        ? nowTimeTable.map((row, rowIndex) =>
            row.map((_, columnIndex) => (
              <TimeBlock
                key={columnIndex}
                active={nowTimeTable[rowIndex][columnIndex] ? true : false}
                onClick={() => handleClick(rowIndex, columnIndex)}
                disabled={
                  columnIndex === 0 && rowIndex <= pastTime ? true : false
                }
              />
            ))
          )
        : nowTimeTable.map((row, rowIndex) =>
            row.map((_, columnIndex) => (
              <TimeBlock
                key={columnIndex}
                active={nowTimeTable[rowIndex][columnIndex] ? true : false}
                onClick={() => handleClick(rowIndex, columnIndex)}
                disabled={false}
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
