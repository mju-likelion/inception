import { styled } from 'styled-components';
import { DuringDate } from '../atom/DuringDate';
import { useRecoilValue } from 'recoil';
import { DateListAtom } from '@/store/atoms';

interface DateListProps {
  page: number;
  onClickBack: () => void;
  onClickNext: () => void;
  size?: number;
}

export const SelectDate = ({
  page,
  onClickBack,
  onClickNext,
  size = 4,
}: DateListProps) => {
  const dateList = useRecoilValue(DateListAtom);
  const start = dateList[0];
  const end = dateList[dateList.length - 1];

  return (
    <SelectDateBlock>
      <button onClick={() => onClickBack()} disabled={page === 1 && true}>
        이전
      </button>
      <DuringDate start={start} end={end} />
      <button
        onClick={() => onClickNext()}
        disabled={page === Math.trunc(dateList.length / size + 1) && true}
      >
        다음
      </button>
    </SelectDateBlock>
  );
};

const SelectDateBlock = styled.div`
  display: flex;
  width: 144px;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
