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
    status: 'default',
    count: 3,
    users: ['유저1', '유저2', '유저3'],
  },
  {
    date: '2023-07-12',
    status: 'default',
    count: 3,
    users: ['유저1', '유저2', '유저3'],
  },
  {
    date: '2023-07-13',
    status: 'default',
    count: 3,
    users: ['유저1', '유저2', '유저3'],
  },
  {
    date: '2023-07-14',
    status: 'active',
    count: 10,
    users: [
      '유저1',
      '유저2',
      '유저3',
      '유저4',
      '유저5',
      '유저6',
      '유저7',
      '유저8',
      '유저9',
      '유저10',
    ],
  },
];