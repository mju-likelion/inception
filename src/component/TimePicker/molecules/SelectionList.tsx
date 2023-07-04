import styled from 'styled-components';
import { TimeSelection } from '@/component/TimePicker';
import { TimeList } from '@/component/TimePicker/data';
import { useState } from 'react';

interface SelectionListProps {
  selectedTime: string;
  selectTimeItem: (time: string) => void;
}

export const SelectionList = ({
  selectedTime,
  selectTimeItem,
}: SelectionListProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (time: string) => {
    selectTimeItem(time);
    setIsSelected(!!time);
  };

  return (
    <Container>
      {TimeList.map((item) => (
        <TimeSelection
          onClick={() => handleClick(item)}
          $isSelected={selectedTime === item && isSelected}
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
`;
