interface DateData {
  date: string;
}

export const getDateTypeToString = ({ date }: DateData) => {
  const dateTypeData = new Date(date);

  return dateTypeData.getMonth() + 1 + '/' + dateTypeData.getDate();
};
