import { Calendar } from '@/component';
import { ButtonLarge, LoadingIcon } from '@/component/@share';
import { Information, ProgressBar } from '@/component/@share/molecules';
import { styled } from 'styled-components';
import CalendarIcon from '@/assets/images/Calendar.svg';
import { getMaxDate, getMinDate } from '@/util';
import { theme } from '@/globalStyle';
import { calendarState } from '@/store';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dateListState, timeTableState } from '@/store';
import { CalendarData } from '@/types';
interface Props {
  buttonClick: () => void;
  prevCalendarDataExist: boolean;
  selectableDates?: string[];
}

export const PossibleDateTemplate = ({
  buttonClick,
  prevCalendarDataExist,
  selectableDates,
}: Props) => {
  const [isActiveButton, setIsActiveButton] = useState(true);
  const calendarData = useRecoilValue(calendarState);
  const [dateList, setDateList] = useRecoilState(dateListState);
  const [timeTable, setTimeTable] = useRecoilState(timeTableState);

  useEffect(() => {
    calendarData.every(function (date) {
      return date.activeStatus !== 'active';
    })
      ? setIsActiveButton(true)
      : setIsActiveButton(false);
  }, [calendarData]);

  const setActiveDatesList = () => {
    const activeList: string[] = [];
    calendarData.map(
      (data) => data.activeStatus === 'active' && activeList.push(data.date)
    );
    setDateList(activeList);
  };

  const getPossibleMonth = (selectableDates: string[]) => {
    const startMonth = `${+getMinDate(selectableDates).split('-')[1]}월`;
    const endMonth = `${+getMaxDate(selectableDates).split('-')[1]}월`;

    return startMonth !== endMonth
      ? [startMonth, endMonth].join(' - ')
      : startMonth;
  };

  return (
    <Wrapper>
      <Header>
        <ProgressBar total={3} step={1} />
        <Body $color="gray1">가능한 날짜들을 선택해주세요.</Body>
      </Header>
      <Content>
        {/* selectableDates가 빈 값이라면 캘린더를 렌더링하지 않는다. */}
        {selectableDates ? (
          <>
            <Calendar
              viewType="select"
              minDate={getMinDate(selectableDates)}
              maxDate={getMaxDate(selectableDates)}
              selectableDates={selectableDates}
              prevCalendarDataExist={prevCalendarDataExist}
            />
            <Information
              icon={CalendarIcon}
              title="선택 가능 기간"
              content={getPossibleMonth(selectableDates)}
            />
          </>
        ) : (
          <LoadingContent>
            <Header />
            <Content>
              <LoadingIcon />
            </Content>
          </LoadingContent>
        )}
      </Content>
      <Bottom>
        <ButtonLarge
          onClick={() => {
            buttonClick();
            setActiveDatesList();
          }}
          isDisabled={isActiveButton}
        >
          다음으로
        </ButtonLarge>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-width: 320px;
  max-width: 500px;
  margin: 30px 20px 0 20px;

  @media ${({ theme }) => theme.size.tablet} {
    margin: 60px auto 0 auto;
  }

  @media ${({ theme }) => theme.size.web} {
    margin: 80px auto 0 auto;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Content = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${({ theme }) => theme.size.tablet} {
    margin-top: 24px;
    gap: 30px;
  }
`;

const LoadingContent = styled.div`
  display: flex;
  min-width: 320px;
  max-width: 500px;
  min-height: 368px;
  max-height: 668px;
  margin: 30px 20px 0 20px;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.size.tablet} {
    margin: 60px auto 0 auto;
  }

  @media ${({ theme }) => theme.size.web} {
    margin: 80px auto 0 auto;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px auto;
`;

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body2.regular};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;
