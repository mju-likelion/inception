import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { DateListAtom, TimeListAtom } from '@/store/atoms';
import { TimeBlock } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';

interface TimeBlockGroupProps {
  page: number;
}

export const TimeBlockGroup = ({ page }: TimeBlockGroupProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const timeList = useRecoilValue(TimeListAtom);
  const newDateList = usePaginationDate({ page: page, dateList: dateList });

  return (
    <TimeBlockGroupBlock columns={newDateList.length}>
      {newDateList.map((date) => (
        <>
          {timeList.map((time) => (
            <TimeBlock $isActive={false} key={time}></TimeBlock>
          ))}
        </>
      ))}
    </TimeBlockGroupBlock>
  );
};

const TimeBlockGroupBlock = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 2px;
`;
