import { Title } from '@/component/@share';
import { styled } from 'styled-components';
import { NextButton, BackButton } from '@/component/@share/atom';
import { DateRangeError } from '@/types';

interface Props {
  currentDate: string[];
  isDateRangeError: DateRangeError;
  handleChangeCalendar: (param: 'prev' | 'next') => void;
}

export const CalendarHeader = ({
  currentDate,
  isDateRangeError,
  handleChangeCalendar,
}: Props) => {
  /** @TODO currentDate가 이동 가능한 범위 제한에 걸릴 시 prev, next 버튼 비활성화 하는 기능 추가하기 */
  return (
    <Wrapper>
      <Title ag="Title2" color="gray1">
        {`${currentDate[0]}년 ${currentDate[1]}월`}
      </Title>
      <ButtonWrapper>
        <BackButton
          isDisabled={isDateRangeError.start}
          onClick={() => handleChangeCalendar('prev')}
        />
        <NextButton
          isDisabled={isDateRangeError.end}
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
