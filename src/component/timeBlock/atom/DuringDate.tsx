import { Body } from '@/component/@share';

interface DuringDateProps {
  start: string;
  end: string;
}

export const DuringDate = ({ start, end }: DuringDateProps) => {
  return (
    <Body ag="Body4" color="gray2" align="center">
      {new Date(start).getMonth() + 1 + '/' + new Date(start).getDate()} -
      {new Date(end).getMonth() + 1 + '/' + new Date(end).getDate()}
    </Body>
  );
};
