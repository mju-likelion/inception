import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { Dates } from '@/component/TimeBlock/atoms';
import { dateListState } from '@/store/atoms';
import {
  getPaginationDate,
  getPaginationActiveDate,
  getDateTypeToString,
} from '@/util';

interface DateListProps {
  page: number;
  activeDate: boolean[];
}

export const DateList = ({ page, activeDate }: DateListProps) => {
  const dateList = useRecoilValue(dateListState);
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
            {getDateTypeToString({ date })}
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
