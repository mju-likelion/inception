interface PaginationDateProps {
  page: number;
  size?: number;
  dateList: string[];
}

interface PaginationActiveDateProps {
  page: number;
  size?: number;
  activeDate: boolean[];
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
  return dateList.slice(size * (page - 1), size * page);
};

export const getPaginationActiveDate = ({
  page,
  size = 4,
  activeDate,
}: PaginationActiveDateProps) => {
  return activeDate.slice(size * (page - 1), size * page);
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
