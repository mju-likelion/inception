import styled from 'styled-components';
import { TimeSelection } from '@/component/TimePicker';
import { TimeList } from '@/component/TimePicker/data';

export const SelectionList = () => {
  return (
    <Container>
      {TimeList.map((item) => (
        <TimeSelection key={item}>{item}</TimeSelection>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 120px;
  max-height: 232px;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  box-shadow: 0px 2px 5px 0px rgba(195, 195, 195, 0.25);
`;
