import { Dates } from '@/component/timeBlock/atoms';
import { useRecoilValue } from 'recoil';
import { DateListAtom } from '@/store/atoms';
import { styled } from 'styled-components';
import { getPaginationDate, getPaginationActiveDate } from '@/util';

interface DateListProps {
  page: number;
  activeDate: boolean[];
}

export const DateList = ({ page, activeDate }: DateListProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const newDateList = getPaginationDate({ page, dateList });
  const newActiveDateList = getPaginationActiveDate({
    page,
    activeDate,
  });

  return (
    <DateListBlock>
      {newDateList &&
        newDateList.map((date, index) => (
          <Dates key={index} isActive={newActiveDateList[index]}>
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
