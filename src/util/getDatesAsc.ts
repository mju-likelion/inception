export const getDatesAsc = (dateList: string[]) => {
  return dateList.sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    });
  });
};
