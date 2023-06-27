import { Title } from '@/component/@share';
import { styled } from 'styled-components';
import { ReactComponent as Back } from '@/assets/images/Back.svg';
import { ReactComponent as Next } from '@/assets/images/Next.svg';

interface Props {
  currentDate: string[];
  handleChangeCalendar: (param: 'prev' | 'next') => void;
}

export const CalendarHeader = ({
  currentDate,
  handleChangeCalendar,
}: Props) => {
  return (
    <Header>
      <Title ag="Title2" color="gray1">
        {`${currentDate[0]}년 ${currentDate[1]}월`}
      </Title>
      {/* @TODO 특정 날짜 범위 넘어가면 버튼 hidden 하도록 기능 개발 필요 */}
      <ButtonWrapper>
        <button onClick={() => handleChangeCalendar('prev')}>
          <Back />
        </button>
        <button onClick={() => handleChangeCalendar('next')}>
          <Next />
        </button>
      </ButtonWrapper>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 52px;
  h1 {
    width: 180px;
    /* background-color: red; */
    display: flex;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  justify-content: space-between;
`;
