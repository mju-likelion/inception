import { styled } from 'styled-components';
import { SelectDate, DateList } from '../molecules';

interface DateListProps {
  page: number;
}

export const TimeBlockHeader = ({ page }: DateListProps) => {
  return (
    <TimeBlockHeaderBlock>
      <DateBlock>
        <SelectDate />
        <DateList page={1} />
      </DateBlock>
    </TimeBlockHeaderBlock>
  );
};

const TimeBlockHeaderBlock = styled.div`
  display: flex;
  width: 320px;
  height: 70px;
  padding: 10px 53px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 16px 16px 0px 0px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  background: #fff;
`;

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
