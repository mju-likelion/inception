interface PaginationDateProps {
  page: number;
  size?: number;
  dateList: string[];
}

interface PaginationTableProps {
  page: number;
  size?: number;
  timeTable: boolean[][];
}

export const getPaginationDate = ({
  page,
  size = 4,
  dateList,
}: PaginationDateProps) => {
  return dateList && dateList.slice(size * (page - 1), size * page);
};

export const getPaginationTable = ({
  page,
  size = 4,
  timeTable,
}: PaginationTableProps) => {
  return (
    timeTable &&
    timeTable.map((date) => date.slice(size * (page - 1), size * page))
  );
};
