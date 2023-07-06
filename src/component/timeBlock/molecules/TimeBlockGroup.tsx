import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';
import { useTableDragSelect } from '@/hooks/useTableDragSelect';
import { useEffect } from 'react';
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
  const newDateList = usePaginationDate({ page: page, dateList: dateList });

  const initialTable = Array.from(Array(timeList.length), () =>
    new Array(newDateList.length).fill(false)
  );

  const [tableRef, tableValue] = useTableDragSelect(initialTable);

  useEffect(() => {
    {
      const DateBooleanArray = new Array(dateList.length).fill(false);

      tableValue.map((row, rowIndex) => {
        row.map((_, columnIndex) => {
          tableValue[rowIndex][columnIndex] &&
            (DateBooleanArray[columnIndex] = true);
        });
      });
      onSetActiveDate(DateBooleanArray);
    }
  }, [tableValue]);

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
