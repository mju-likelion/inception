import { styled } from 'styled-components';
import { SelectDate, DateList } from '@/component/TimeBlock/molecules';
import { useGaApi } from '@/hooks/useGA';

interface HeaderProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  activeDate: boolean[];
}

export const TimeBlockHeader = ({ page, setPage, activeDate }: HeaderProps) => {
  const { gaApi } = useGaApi();

  const onClickBackButton = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 214,
      tPath: '/vote-room',
      tTarget: 'move_time_block',
      tPageIndex: page,
      tDirection: 'prev',
    });

    setPage((page) => page - 1);
  };

  const onClickNextButton = () => {
    gaApi.sendEvent({
      eventName: 't_click',
      tEventId: 214,
      tPath: '/vote-room',
      tTarget: 'move_time_block',
      tPageIndex: page,
      tDirection: 'next',
    });

    setPage((page) => page + 1);
  };

  return (
    <TimeBlockHeaderBlock>
      <DateBlock>
        <SelectDate
          page={page}
          onClickBack={onClickBackButton}
          onClickNext={onClickNextButton}
        />
        <DateList page={page} activeDate={activeDate} />
      </DateBlock>
    </TimeBlockHeaderBlock>
  );
};

const TimeBlockHeaderBlock = styled.div`
  display: flex;
  min-width: 320px;
  max-width: 500px;
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
