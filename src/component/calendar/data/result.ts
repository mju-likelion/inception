import { PromiseResultData } from '@/types';

export const promiseResultMockData: PromiseResultData[] = [
  { date: '2023-07-01', status: 'disabled' },
  { date: '2023-07-02', status: 'disabled' },
  { date: '2023-07-03', status: 'disabled' },
  { date: '2023-07-04', status: 'disabled' },
  { date: '2023-07-05', status: 'disabled' },
  { date: '2023-07-06', status: 'disabled' },
  { date: '2023-07-07', status: 'disabled' },
  { date: '2023-07-08', status: 'disabled' },
  { date: '2023-07-09', status: 'disabled' },
  { date: '2023-07-10', status: 'disabled' },
  {
    date: '2023-07-11',
    status: 'active',
    count: 3,
    users: ['유저1', '유저2', '유저3'],
  },
];
