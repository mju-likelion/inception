import { Body } from '@/component/@share';

interface DuringDateProps {
  start: string;
  end: string;
}

export const DuringDate = ({ start, end }: DuringDateProps) => {
  const startDate =
    new Date(start).getMonth() + 1 + '/' + new Date(start).getDate();
  const endDAte = new Date(end).getMonth() + 1 + '/' + new Date(end).getDate();
  return (
    <Body ag="Body4" color="gray2" align="center">
      {startDate} - {endDAte}
    </Body>
  );
};
