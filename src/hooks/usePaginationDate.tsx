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
  const pageList: Array<string> = [];

  for (let i = (page - 1) * size; i < (page - 1) * size + size; i++) {
    dateList[i] && pageList.push(dateList[i]);
  }

  return pageList;
};
