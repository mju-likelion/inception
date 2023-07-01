import { styled } from 'styled-components';
import { SelectDate, DateList } from '../molecules';
import { useState } from 'react';

export const TimeBlockHeader = () => {
  const [nowPage, setNowPage] = useState(1);

  const onClickBackButton = () => setNowPage((prev) => prev - 1);
  const onClickNextButton = () => setNowPage((prev) => prev + 1);

  return (
    <TimeBlockHeaderBlock>
      <DateBlock>
        <SelectDate
          page={nowPage}
          onClickBack={onClickBackButton}
          onClickNext={onClickNextButton}
        />
        <DateList page={nowPage} />
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
  align-items: center;
  gap: 10px;
  border-radius: 16px 16px 0px 0px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  background: ${({ theme }) => theme.colors.white};
`;

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
