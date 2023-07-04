import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';
import { useState } from 'react';
interface TimeBlockGroupProps {
  page: number;
}

export const TimeBlockGroup = ({ page }: TimeBlockGroupProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const timeList = useRecoilValue(TimeListAtom);
  const newDateList = usePaginationDate({ page: page, dateList: dateList });
  console.log(newDateList);

  const [state, setState] = useState(
    Array(newDateList.length * timeList.length).fill(false) //datelist * timelist 개의 빈 배열 생성
  );

  const handleClick = (i: number) => {
    const updateArray = [...state];
    updateArray[i] = !updateArray[i];
    setState(updateArray);
  };

  console.log(state);

  return (
    <TimeBlockGroupBlock columns={newDateList.length}>
      {state.map((data, index) => (
        <TimeBlock
          key={index + page * 1000}
          active={data}
          onClick={() => handleClick(index)}
        ></TimeBlock>
      ))}
    </TimeBlockGroupBlock>
  );
};

const TimeBlockGroupBlock = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 2px;
`;
