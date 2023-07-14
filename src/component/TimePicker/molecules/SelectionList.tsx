import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TimeSelection } from '@/component/TimePicker';
import { TIME_LIST } from '@/component/TimePicker/data';

interface SelectionListProps {
  selectedTime: keyof typeof TIME_LIST;
  selectTimeItem: (time: keyof typeof TIME_LIST) => void;
}

export const SelectionList = ({
  selectedTime,
  selectTimeItem,
}: SelectionListProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  const TIME_LIST_KEYS = (
    Object.values(TIME_LIST) as Array<keyof typeof TIME_LIST>
  ).filter((v) => isNaN(Number(v)));

  const scrollHeight = listRef.current?.scrollHeight;
  const optionHeight = scrollHeight && scrollHeight / TIME_LIST_KEYS.length;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(TIME_LIST_KEYS.indexOf(selectedTime));
    const y = optionHeight && optionHeight * index;
    y &&
      listRef.current.scrollTo({
        top: optionHeight * index,
      });
  });

  const handleClick = (time: keyof typeof TIME_LIST) => {
    selectTimeItem(time);
  };

  return (
    <Container ref={listRef}>
      {TIME_LIST_KEYS.map((item) => (
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

const Container = styled.ul`
  width: 120px;
  max-height: 232px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1px;
  border: 1px solid ${({ theme }) => theme.colors.gray4};
  box-shadow: 0px 2px 5px 0px rgba(195, 195, 195, 0.25);
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: absolute;
  top: 56px;
  cursor: pointer;
`;
