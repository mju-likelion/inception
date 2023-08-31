import styled from 'styled-components';
import { PropsWithChildren, useEffect } from 'react';
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

  // 모든 시간 선택 후 하나라도 해제했을 때 체크박스 해제
  // 모든 시간 타임 블럭에서 자체 선택 후 체크박스 활성화 하기

  // 하나라도 false가 있으면 체크박스 해제, false 없으면 체크
  useEffect(() => {
    const booleanArr: boolean[] = [];
    timeTable.map((itemList) =>
      itemList.filter((item) => {
        booleanArr.push(item);
      })
    );
    booleanArr.includes(false) ? setCheckAllDate(false) : setCheckAllDate(true);
  }, [timeTable]);

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
