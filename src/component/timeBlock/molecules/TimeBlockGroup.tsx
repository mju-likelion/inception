import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';
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
  const newDateList = usePaginationDate({ page, dateList });
  // const initialTable = Array.from(Array(timeList.length), () =>
  //   new Array(newDateList.length).fill(false)
  // );

  // const [tableRef, tableValue] = useTableDragSelect(initialTable);

  const [state, setState] = useState(
    Array.from(Array(timeList.length), () =>
      new Array(newDateList.length).fill(false)
    ) //datelist * timelist 개의 빈 배열 생성
  );

  const handleClick = (x: number, y: number) => {
    const updateArray = [...state];
    updateArray[x][y] = !updateArray[x][y];
    console.log(updateArray);
    setState(updateArray);
  };

  useEffect(() => {
    {
      const DateBooleanArray = new Array(dateList.length).fill(false);

      state.map((row, rowIndex) => {
        row.map((_, columnIndex) => {
          state[rowIndex][columnIndex] &&
            (DateBooleanArray[columnIndex] = true);
        });
      });
      onSetActiveDate(DateBooleanArray);
    }
  }, [state]);

  return (
    <TimeBlockGroupBlock columns={newDateList.length}>
      {state.map((row, rowIndex) =>
        row.map((_, columnIndex) => (
          <TimeBlock
            key={columnIndex}
            active={state[rowIndex][columnIndex] ? true : false}
            onClick={() => handleClick(rowIndex, columnIndex)}
          />
        ))
      )}
    </TimeBlockGroupBlock>
  );
};

// const TimeBlockGroupBlock = styled.table`
//   gap: 2px;
//   cursor: pointer;
// `;

const TimeBlockGroupBlock = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 2px;
`;
