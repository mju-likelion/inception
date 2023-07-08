import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom, TimeTableListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';
import { usePaginationTable } from '@/hooks/usePaginationTable';
// import { useTableDragSelect } from '@/hooks/useTableDragSelect';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setTimeTable(
      Array.from(Array(timeList.length), () =>
        new Array(dateList.length).fill(false)
      )
    );
  }, []);

  const newDateList = usePaginationDate({ page, dateList });
  //여기에 timtTable로 customhook으로 page별로 자르는 함수 선언해야됨.
  const nowTimeTable = usePaginationTable({ page, timeTable });

  // const [state, setState] = useState(
  //   Array.from(Array(timeList.length), () =>
  //     new Array(newDateList.length).fill(false)
  //   ) //datelist * timelist 개의 빈 배열 생성
  // );

  const handleClick = (x: number, y: number) => {
    const updateArray = timeTable.map((value) => [...value]);
    updateArray[x][y + (page - 1) * 4] = !updateArray[x][y + (page - 1) * 4];
    setTimeTable(updateArray);
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
`;
