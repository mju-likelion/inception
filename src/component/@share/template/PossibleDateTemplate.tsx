import { Calendar } from '@/component';
import { ButtonLarge, LoadingIcon } from '@/component/@share';
import { Information, ProgressBar } from '@/component/@share/molecules';
import { styled } from 'styled-components';
import CalendarIcon from '@/assets/images/Calendar.svg';
import { getMaxDate, getMinDate } from '@/util';
import { theme } from '@/globalStyle';

interface Props {
  buttonClick: () => void;
  selectableDates?: string[];
}

export const PossibleDateTemplate = ({
  buttonClick,
  selectableDates,
}: Props) => {
  return (
    <Wrapper>
      <Header>
        <ProgressBar total={3} step={1} />
        <Body $color="gray1">가능한 날짜들을 선택해주세요.</Body>
      </Header>
      <Content>
        {/* selectableDates가 빈 값이라면 캘린더를 렌더링하지 않는다. */}
        {selectableDates ? (
          <Calendar
            viewType="select"
            minDate={getMinDate(selectableDates)}
            maxDate={getMaxDate(selectableDates)}
            selectableDates={selectableDates}
          />
        ) : (
          <LoadingIcon />
        )}
        <Information
          icon={CalendarIcon}
          title="선택 가능 기간"
          content={(selectableDates || [])
            .map((date) => `${+date.split('-')[1]}월`)
            .join(' - ')}
        />
      </Content>
      <Bottom>
        <ButtonLarge onClick={buttonClick}>다음으로</ButtonLarge>
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
