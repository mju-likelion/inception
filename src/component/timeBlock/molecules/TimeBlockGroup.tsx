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

  for (let i = 0; i < list.length; i++) {
    mouseMove(list[i] as HTMLElement, function (event: MouseEvent) {
      if (!(event.target instanceof HTMLButtonElement)) return;
      (event.target as HTMLButtonElement).style.backgroundColor = 'blue';
    });

    list[i].addEventListener('click', (event: Event) => {
      clickEvent(event as MouseEvent);
    });
  }

  function mouseMove(
    target: HTMLElement,
    whileMove: (event: MouseEvent) => void
  ) {
    const endMove = function () {
      window.removeEventListener('mousemove', whileMove);
      window.removeEventListener('mouseup', endMove);
    };

    target.addEventListener('mousedown', function (event: MouseEvent) {
      event.stopPropagation();
      window.addEventListener('mousemove', whileMove);
      window.addEventListener('mouseup', endMove);
    });
  }

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

    // nowTimeTable.map((row, rowIndex) =>
    //   row.map((_, columnIndex) =>
    //     mouseMove(
    //       nowTimeTable[rowIndex][columnIndex] as HTMLElement,
    //       function (event: MouseEvent) {
    //         if (!(event.target instanceof HTMLButtonElement)) return;
    //         (event.target as HTMLButtonElement).style.backgroundColor = 'blue';
    //       }
    //     )
    //   )
    // );
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
