import { getDateTypeToString } from '@/util';
import styled from 'styled-components';
interface DuringDateProps {
  start: string;
  end: string;
}

export const DuringDate = ({ start, end }: DuringDateProps) => {
  const startDate = getDateTypeToString({ date: start });
  const endDate = getDateTypeToString({ date: end });
  return (
    <DuringDateBlock>
      {startDate === endDate
        ? startDate
        : startDate.concat(' - ').concat(endDate)}
    </DuringDateBlock>
  );
};

const DuringDateBlock = styled.div`
  width: 80px;
  ${({ theme }) => theme.typographies.body4};
  color: ${({ theme }) => theme.colors.gray2};
  @media ${({ theme }) => theme.size.web} {
    width: 104px;
    ${({ theme }) => theme.typographies.body2.semiBold};
  }
`;
