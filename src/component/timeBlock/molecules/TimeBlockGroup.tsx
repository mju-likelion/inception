import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom, TimeTableListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { getPaginationDate, getPaginationTable } from '@/util';
import { useEffect } from 'react';
import range from 'lodash/range';

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

  const list = document.querySelectorAll('.btn');

  let isMouseDown = false;

  list.forEach((button) => {
    button.addEventListener('mousedown', function (event) {
      event.stopPropagation();
      clickEvent(event as MouseEvent); // MouseEvent로 타입 단언
      isMouseDown = true;
    });

    button.addEventListener('mouseup', function (event) {
      event.stopPropagation();
      isMouseDown = false;
    });

    button.addEventListener('mouseenter', function (event) {
      if (isMouseDown) {
        clickEvent(event as MouseEvent);
      }
    });
  });

  function clickEvent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;

    if (button.style.backgroundColor === 'blue') {
      button.style.backgroundColor = 'gray';
    } else {
      button.style.backgroundColor = 'blue';
    }
  }

  useEffect(() => {
    const newTimeTable = range(timeList.length).map(() =>
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
    <TimeBlockGroupBlock columns={newDateList.length}>
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
