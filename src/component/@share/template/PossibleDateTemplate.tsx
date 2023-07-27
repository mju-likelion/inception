import { Calendar } from '@/component';
import { ButtonLarge } from '@/component/@share';
import { Information, ProgressBar } from '@/component/@share/molecules';
import { styled } from 'styled-components';
import CalendarIcon from '@/assets/images/Calendar.svg';
import { getMaxDate, getMinDate } from '@/util';
import { theme } from '@/globalStyle';

interface Props {
  buttonClick: () => void;
}

export const PossibleDateTemplate = ({ buttonClick }: Props) => {
  const selectableDates = ['2023-06', '2023-07', '2023-08']; // @TODO 더미데이터. 서버에서 선택 가능한 시간들 가져와 보여주기

  const onClick = (tab: string) => {
    // @TODO tab에 따라 라우팅하기
    console.log('onClick!!');
  };

  return (
    <Wrapper>
      <Header>
        <ProgressBar total={3} step={1} />
        <Body $color="gray1">가용한 날짜들을 선택해주세요.</Body>
      </Header>
      <Content>
        <Calendar
          viewType="select"
          // @TODO 선택 가능 기간이 어떻게 들어오는지 판단 필요
          minDate={getMinDate(selectableDates)}
          maxDate={getMaxDate(selectableDates)}
        />
        <Information
          icon={CalendarIcon}
          title="선택 가능 기간"
          content={selectableDates
            .map((date) => `${+date.split('-')[1]}월`)
            .join(', ')}
        />
      </Content>
      <Bottom>
        <ButtonLarge click={buttonClick}>다음으로</ButtonLarge>
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
