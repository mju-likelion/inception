import { Title } from '@/component/@share';
import { styled } from 'styled-components';
import { NextButton, BackButton } from '@/component/@share/atom';
import { DateRangeLimit } from '@/types';

interface Props {
  currentDate: string[];
  dateRangeLimit: DateRangeLimit;
  handleChangeCalendar: (param: 'prev' | 'next') => void;
}

export const CalendarHeader = ({
  currentDate,
  dateRangeLimit,
  handleChangeCalendar,
}: Props) => {
  return (
    <Wrapper>
      <Title ag="Title2" color="gray1">
        {`${currentDate[0]}년 ${+currentDate[1]}월`}
      </Title>
      <ButtonWrapper>
        <BackButton
          isDisabled={dateRangeLimit.start}
          onClick={() => handleChangeCalendar('prev')}
        />
        <NextButton
          isDisabled={dateRangeLimit.end}
          onClick={() => handleChangeCalendar('next')}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin-left: 8px;
    width: 180px;
    display: flex;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  justify-content: space-between;
  margin-right: 10px;
`;
