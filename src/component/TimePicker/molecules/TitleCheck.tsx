import styled from 'styled-components';
import { CheckBox } from '@/component/@share';
import { Body } from '@/component/@share';

interface TitleCheckProps {
  isChecked: boolean;
  onClick: () => void;
}

export const TitleCheck = ({ isChecked, onClick }: TitleCheckProps) => {
  return (
    <Container onClick={onClick}>
      <CheckBox isChecked={isChecked} onClick={onClick} />
      <Body ag="Body3" color="gray2">
        날짜만 조율할래요
      </Body>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  p {
    cursor: default;
  }
`;
