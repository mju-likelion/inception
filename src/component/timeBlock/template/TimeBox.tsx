import { styled } from 'styled-components';
import { ErrorMessage } from '@/component/timeBlock/atoms/ErrorMessage';
import {
  TimeBlockGroup,
  TimeList,
  SelectAllButton,
} from '@/component/timeBlock/molecules';
import { TimeBlockHeader } from '@/component/timeBlock/organisms';
import { useEffect, useState } from 'react';

interface TimeBoxProps {
  onSetActiveButton: React.Dispatch<React.SetStateAction<boolean>>;
  startTime: string;
  endTime: string;
}

export const TimeBox = ({
  onSetActiveButton,
  startTime,
  endTime,
}: TimeBoxProps) => {
  const [nowPage, setNowPage] = useState(1);
  const [activeDate, setActiveDate] = useState<boolean[]>([]);

  useEffect(() => {
    activeDate.every(function (x) {
      return x === true;
    })
      ? onSetActiveButton(false)
      : onSetActiveButton(true);
  }, [activeDate]);

  return (
    <>
      <TimeBlockHeader
        page={nowPage}
        setPage={setNowPage}
        activeDate={activeDate}
      />
      <TimeBoxBlock>
        <TimeBoxContent>
          <TimeList start={startTime} end={endTime} />
          <TimeBlockGroup page={nowPage} onSetActiveDate={setActiveDate} />
        </TimeBoxContent>
      </TimeBoxBlock>
      {activeDate.includes(false) ? (
        <ErrorMessage>시간이 선택되지 않은 날짜가 있습니다</ErrorMessage>
      ) : null}
      <SelectAllButton>모든 시간 선택하기</SelectAllButton>
    </>
  );
};

const TimeBoxBlock = styled.div`
  aspect-ratio: 1 / 0.8;
  display: flex;
  justify-content: center;
  border-radius: 0 0 16px 16px;
  min-width: 320px;
  max-width: 500px;
  min-height: 256px;
  max-height: 424px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-top: 0;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TimeBoxContent = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 9px;
  width: 320px;
  background: ${({ theme }) => theme.colors.white};
  padding: 8px 53px 0 2px;
`;
