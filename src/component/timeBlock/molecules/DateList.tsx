import { Dates } from '@/component/timeBlock/atom';
import { usePaginationDate } from '@/hooks/usePaginationDate';
import { styled } from 'styled-components';

interface DateListProps {
  dateList: Array<string>;
  page: number;
}

export const DateList = ({ dateList, page }: DateListProps) => {
  const newDateList = usePaginationDate({ page: page, dateList: dateList });
  return (
    <DateListBlock>
      {newDateList.map((date, index) => (
        <Dates key={index}>
          {String(
            new Date(date).getMonth() + 1 + '/' + new Date(date).getDate()
          )}
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
