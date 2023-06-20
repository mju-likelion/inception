import { Title } from '@/component/@share';
import { styled } from 'styled-components';
import { ReactComponent as Back } from '@/assets/images/Back.svg';
import { ReactComponent as Next } from '@/assets/images/Next.svg';

export const CalendarHeader = () => {
  return (
    <Header>
      <Title ag="Title2" text="2023년 6월" color="gray1" />
      <ButtonWrapper>
        <Back />
        <Next />
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
