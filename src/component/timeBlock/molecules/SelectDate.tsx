import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { DateListAtom } from '@/store/atoms';
import { DuringDate } from '@/component/timeBlock/atoms/DuringDate';
import { BackButton, NextButton } from '@/component/@share/atom';

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
  const totalPageLength = Math.trunc(dateList.length / size + 1);

  return (
    <SelectDateBlock>
      <BackButton
        onClick={() => onClickBack()}
        isDisabled={page === 1 && true}
      />
      <DuringDate start={start} end={end} />
      <NextButton
        onClick={() => onClickNext()}
        isDisabled={page === totalPageLength && true}
      />
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
