import styled from 'styled-components';
import { TimeSelection } from '@/component/TimePicker';
import { TIME_LIST } from '@/component/TimePicker/data';

interface SelectionListProps {
  selectedTime: string;
  selectTimeItem: (time: string) => void;
}

export const SelectionList = ({
  selectedTime,
  selectTimeItem,
}: SelectionListProps) => {
  const handleClick = (time: string) => {
    selectTimeItem(time);
  };

  return (
    <Container>
      {TIME_LIST.map((item) => (
        <TimeSelection
          onClick={() => handleClick(item)}
          $isSelected={selectedTime === item}
          key={item}
        >
          {item}
        </TimeSelection>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 120px;
  max-height: 232px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  box-shadow: 0px 2px 5px 0px rgba(195, 195, 195, 0.25);
  z-index: 1;
  position: absolute;
  top: 56px;
`;
