import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';
import { useState } from 'react';
import { useTableDragSelect } from '@/hooks/useTableDragSelect';
interface TimeBlockGroupProps {
  page: number;
}

export const TimeBlockGroup = ({ page }: TimeBlockGroupProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const timeList = useRecoilValue(TimeListAtom);
  const newDateList = usePaginationDate({ page: page, dateList: dateList });

  const initialTable = Array.from(Array(timeList.length), () =>
    new Array(newDateList.length).fill(false)
  );

  const [tableRef, tableValue] = useTableDragSelect(initialTable);

  console.log(tableValue);

  return (
    <TimeBlockGroupBlock ref={tableRef}>
      <tbody>
        {tableValue.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((_, columnIndex) => (
              <TimeBlock
                key={columnIndex}
                active={tableValue[rowIndex][columnIndex] ? true : false}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </TimeBlockGroupBlock>
  );
};

const TimeBlockGroupBlock = styled.table`
  gap: 2px;
  cursor: pointer;
`;
