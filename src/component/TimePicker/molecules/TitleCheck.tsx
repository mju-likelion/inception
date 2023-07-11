import { CheckBox } from '@/component/@share';
import { Body } from '@/component/@share';
import styled from 'styled-components';

export const TitleCheck = () => {
  return (
    <Container>
      <CheckBox isChecked={false} onClick={() => console.log('클릭')} />
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
`;
