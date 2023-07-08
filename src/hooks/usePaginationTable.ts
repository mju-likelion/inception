interface PaginationProps {
  page: number;
  size?: number;
  timeTable: boolean[][];
}

export const usePaginationTable = ({
  page,
  size = 4,
  timeTable,
}: PaginationProps) => {
  return timeTable.map((date) => date.slice(size * (page - 1), size * page));
};
