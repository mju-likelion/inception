import { Dates } from '@/component/timeBlock/atoms';
import { usePaginationDate } from '@/hooks/usePaginationDate';
import { useRecoilValue } from 'recoil';
import { DateListAtom } from '@/store/atoms';
import { styled } from 'styled-components';

interface DateListProps {
  page: number;
  activeDate: boolean[];
}

export const DateList = ({ page, activeDate }: DateListProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const newDateList = usePaginationDate({ page: page, dateList: dateList });

  return (
    <DateListBlock>
      {newDateList.map((date, index) => (
        <Dates key={index} isActive={activeDate[index % 4]}>
          {/* 현재 사이즈값 하드코딩으로 받고 배열도 index 사용하고 있음 개선 필요 */}
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
