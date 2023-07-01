import { styled } from 'styled-components';
import { DuringDate } from '../atom/DuringDate';
import { useRecoilValue } from 'recoil';
import { DateListAtom } from '@/store/atoms';

export const SelectDate = () => {
  const dateList = useRecoilValue(DateListAtom);

  const start = dateList[0];
  const end = dateList[dateList.length - 1];
  return (
    <SelectDateBlock>
      <DuringDate start={start} end={end} />
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
