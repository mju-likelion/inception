import { Body } from '@/component/@share';

interface DuringDateProps {
  start: string;
  end: string;
}

export const DuringDate = ({ start, end }: DuringDateProps) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const stringStartDate = startDate.getMonth() + 1 + '/' + startDate.getDate();
  const stringEndDate = endDate.getMonth() + 1 + '/' + endDate.getDate();
  return (
    <Body ag="Body4" color="gray2" align="center">
      {stringStartDate} - {stringEndDate}
    </Body>
  );
};
