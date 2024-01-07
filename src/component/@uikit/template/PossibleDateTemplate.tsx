import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { Calendar } from '@/component';
import {
  ButtonLarge,
  LoadingIcon,
  ButtonSmall,
  Information,
  ProgressBar,
} from '@/component/@uikit';
import CalendarIcon from '@/assets/images/Calendar.svg';
import { getMaxDate, getMinDate } from '@/util';
import { theme } from '@/globalStyle';
import { calendarState, dateListState } from '@/store';
interface Props {
  buttonClick: () => void;
  prevCalendarDataExist: boolean;
  selectableDates?: string[];
  isDateOnly?: boolean;
  token?: string;
}

export const getProgressBarTotalLength = (
  isDateOnly?: boolean,
  token?: string
) => {
  if (token && isDateOnly)
    //제출한적도 있고, 시간 선택을 안할 경우 총길이는 1
    return 1;
  else if (token || isDateOnly)
    //둘 다 해당 되는것은 아니지만 하나는 해당 되는 경우 총 길이는 2
    return 2;
  else return 3;
  //모두 아니라면 총 길이는 3
};

export const PossibleDateTemplate = ({
  buttonClick,
  prevCalendarDataExist,
  selectableDates,
  isDateOnly,
  token,
}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.pathname.split('/')[2];
  const [isActiveButton, setIsActiveButton] = useState(true);
  const calendarData = useRecoilValue(calendarState);
  const [dateList, setDateList] = useRecoilState(dateListState);

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

  const navigateResultPage = () => {
    navigate(`/result?code=${code}`);
  };

  return (
    <Wrapper>
      <Header>
        <ProgressBar
          total={getProgressBarTotalLength(isDateOnly, token)}
          step={1}
        />
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
            {token && (
              <GridFooter>
                <ButtonSmall onClick={navigateResultPage}>
                  결과 보러 가기
                </ButtonSmall>
              </GridFooter>
            )}
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
          {token && isDateOnly ? '수정완료' : '다음으로'}
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

const GridFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 28px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-bottom: 42px;
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
