import { Body } from '@/component/@share';
import { getDateTypeToString } from '@/util';

interface DuringDateProps {
  start: string;
  end: string;
}

export const DuringDate = ({ start, end }: DuringDateProps) => {
  const startDate = getDateTypeToString({ date: start });
  const endDate = getDateTypeToString({ date: end });
  return (
    <Body ag="Body4" color="gray2" align="center">
      {startDate} - {endDate}
    </Body>
  );
};
