import { Dates } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';
import { useRecoilValue } from 'recoil';
import { DateListAtom } from '@/store/atoms';
import { styled } from 'styled-components';

interface DateListProps {
  page: number;
}

export const DateList = ({ page }: DateListProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const newDateList = usePaginationDate({ page: page, dateList: dateList });
  return (
    <DateListBlock>
      {newDateList.map((date, index) => (
        <Dates key={index} isActive={false}>
          {new Date(date).getMonth() + 1 + '/' + new Date(date).getDate()}
        </Dates>
      ))}
    </DateListBlock>
  );
};

const DateListBlock = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
`;
