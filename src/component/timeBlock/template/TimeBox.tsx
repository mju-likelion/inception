import { styled } from 'styled-components';
import { ErrorMessage } from '@/component/timeBlock/atoms/ErrorMessage';
import {
  TimeBlockGroup,
  TimeList,
  SelectAllButton,
} from '@/component/timeBlock/molecules';
import { TimeBlockHeader } from '@/component/timeBlock/organisms';
import { useState } from 'react';

export const TimeBox = () => {
  const [nowPage, setNowPage] = useState(1);
  const [activeDate, setActiveDate] = useState<boolean[]>([]);

  return (
    <TimeBoxContainer>
      <TimeBlockHeader
        page={nowPage}
        setPage={setNowPage}
        activeDate={activeDate}
      />
      <TimeBoxBlock>
        <TimeBoxContent>
          <TimeList start="9:00" end="17:00" />
          <TimeBlockGroup page={nowPage} onSetActiveDate={setActiveDate} />
        </TimeBoxContent>
      </TimeBoxBlock>
      {activeDate.includes(false) ? (
        <ErrorMessage>시간이 선택되지 않은 날짜가 있습니다</ErrorMessage>
      ) : null}
      <SelectAllButton>모든 시간 선택하기</SelectAllButton>
    </TimeBoxContainer>
  );
};

const TimeBoxContainer = styled.div`
  margin: 0 20px;
`;

const TimeBoxBlock = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 0 0 16px 16px;
  min-width: 320px;
  max-width: 500px;
  min-height: 256px;
  max-height: 424px;
  border-left: 1px solid ${({ theme }) => theme.colors.gray5};
  border-right: 1px solid ${({ theme }) => theme.colors.gray5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* 스크롤바 막대 설정*/
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.white};
    max-height: 12px;
  }

  /* 스크롤바 뒷 배경 설정*/
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.gray4};
    border-radius: 16px;
  }
`;

const TimeBoxContent = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
  gap: 9px;
  width: 320px;
  background: ${({ theme }) => theme.colors.white};
  padding: 8px 53px 0px 2px;
`;
