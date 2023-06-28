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
  /** @TODO currentDate가 이동 가능한 범위 제한에 걸릴 시 prev, next 버튼 비활성화 하는 기능 추가하기 */
  return (
    <Wrapper>
      <Title ag="Title2" color="gray1">
        {`${currentDate[0]}년 ${currentDate[1]}월`}
      </Title>
      <ButtonWrapper>
        <button onClick={() => handleChangeCalendar('prev')}>
          <Back />
        </button>
        <button onClick={() => handleChangeCalendar('next')}>
          <Next />
        </button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 52px;
  h1 {
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
`;
