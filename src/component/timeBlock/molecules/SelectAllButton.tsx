import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { CheckBox } from '@/component/@share';
import { useRecoilState, useRecoilValue } from 'recoil';
import { TimeTableListAtom, DateListAtom, TimeListAtom } from '@/store';
import { useState } from 'react';
import { Body } from '@/component/@share';

export const SelectAllButton = ({ children }: PropsWithChildren) => {
  const [timeTable, setTimeTable] = useRecoilState(TimeTableListAtom);
  const dateList = useRecoilValue(DateListAtom);
  const timeList = useRecoilValue(TimeListAtom);
  const [checkAllDate, setCheckAllDate] = useState(false);

  const onClickAllDate = () => {
    setCheckAllDate(!checkAllDate);
    setTimeTable(
      Array.from(Array(timeList.length), () =>
        new Array(dateList.length).fill(!checkAllDate)
      )
    );
  };

  return (
    <SelectAllButtonBlock>
      <CheckBox isChecked={checkAllDate} onClick={onClickAllDate} />
      <Body ag="Body3" color="gray2">
        {children}
      </Body>
    </SelectAllButtonBlock>
  );
};

const SelectAllButtonBlock = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;
