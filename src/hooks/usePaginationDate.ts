interface PaginationProps {
  page: number;
  size?: number;
  dateList: Array<string>;
}

export const usePaginationDate = ({
  page,
  size = 4,
  dateList,
}: PaginationProps) => {
  return dateList.slice(size * (page - 1), size * page);
};
