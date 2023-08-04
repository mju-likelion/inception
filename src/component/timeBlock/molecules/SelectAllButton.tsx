import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { CheckBox } from '@/component/@share';
import { useRecoilState, useRecoilValue } from 'recoil';
import { timeTableState, dateListState, timeListState } from '@/store';
import { useState } from 'react';
import range from 'lodash/range';
import { theme } from '@/globalStyle';

export const SelectAllButton = ({ children }: PropsWithChildren) => {
  const [timeTable, setTimeTable] = useRecoilState(timeTableState);
  const dateList = useRecoilValue(dateListState);
  const timeList = useRecoilValue(timeListState);
  const [checkAllDate, setCheckAllDate] = useState(false);

  const onClickAllDate = () => {
    setCheckAllDate(!checkAllDate);
    const newTimeTable = range(timeList.length).map(() =>
      new Array(dateList.length).fill(!checkAllDate)
    );
    setTimeTable(newTimeTable);
  };

  return (
    <SelectAllButtonBlock>
      <CheckBox isChecked={checkAllDate} onClick={onClickAllDate} />
      <Body $color="gray2">{children}</Body>
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

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body3};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;
