import styled from 'styled-components';
import { PropsWithChildren, useEffect } from 'react';
import { CheckBox } from '@/component/@uikit';
import { useRecoilState, useRecoilValue } from 'recoil';
import { timeTableState, dateListState, timeListState } from '@/store';
import { useState } from 'react';
import range from 'lodash/range';
import { theme } from '@/globalStyle';
import { useGaApi } from '@/hooks/useGA';

export const SelectAllButton = ({ children }: PropsWithChildren) => {
  const [timeTable, setTimeTable] = useRecoilState(timeTableState);
  const dateList = useRecoilValue(dateListState);
  const timeList = useRecoilValue(timeListState);
  const [pastTime, setPastTime] = useState<number>(-1);
  const [checkAllDate, setCheckAllDate] = useState(false);

  const { gaApi } = useGaApi();

  const onClickAllDate = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 215,
      tPath: '/vote-room',
      tTarget: 'select_all',
      tValue: !checkAllDate,
    });

    const newTimeTable = range(timeList.length).map(() =>
      new Array(dateList.length).fill(!checkAllDate)
    );

    //지난 시간이 존재하는 경우 지난 시간 제외하고 타임 테이블 세팅
    if (pastTime + 1 > 0 && checkAllDate === false) {
      console.log('하뭐지');
      const updateTimeTable = newTimeTable.map((row, rowIndex) =>
        row.map((_, columnIndex) => {
          if (columnIndex === 0 && rowIndex <= pastTime) {
            return false;
          } else {
            return true;
          }
        })
      );
      setTimeTable(updateTimeTable);
    } else {
      setTimeTable(newTimeTable);
    }
    setCheckAllDate(!checkAllDate);
  };

  // 오늘 날짜에 지난 시간이 존재하는 경우 지난 시간의 타임블럭 갯수 카운트
  useEffect(() => {
    timeList.map((time, index) => {
      if (new Date() > new Date(dateList[0] + ' ' + time)) setPastTime(index);
    });
  }, []);

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

    // 지난 시간이 존재하는 경우 지난 시간의 갯수와 false의 갯수가 일치하지 않는 경우 setCheckAllDate 값 false
    if (pastTime + 1 > 0) {
      const PastTimecount = booleanArr.filter((date) => date === false).length;
      PastTimecount === pastTime + 1
        ? setCheckAllDate(true)
        : setCheckAllDate(false);
    } else {
      booleanArr.includes(false)
        ? setCheckAllDate(false)
        : setCheckAllDate(true);
    }
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
