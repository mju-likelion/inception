import { getCalendarData } from '@/util';

test('2023년 6월 달력 정보를 제대로 가져오는지 확인', () => {
  const expectData = [
    { date: '2023-06-01', day: '목' },
    { date: '2023-06-02', day: '금' },
    { date: '2023-06-03', day: '토' },
    { date: '2023-06-04', day: '일' },
    { date: '2023-06-05', day: '월' },
    { date: '2023-06-06', day: '화' },
    { date: '2023-06-07', day: '수' },
    { date: '2023-06-08', day: '목' },
    { date: '2023-06-09', day: '금' },
    { date: '2023-06-10', day: '토' },
    { date: '2023-06-11', day: '일' },
    { date: '2023-06-12', day: '월' },
    { date: '2023-06-13', day: '화' },
    { date: '2023-06-14', day: '수' },
    { date: '2023-06-15', day: '목' },
    { date: '2023-06-16', day: '금' },
    { date: '2023-06-17', day: '토' },
    { date: '2023-06-18', day: '일' },
    { date: '2023-06-19', day: '월' },
    { date: '2023-06-20', day: '화' },
    { date: '2023-06-21', day: '수' },
    { date: '2023-06-22', day: '목' },
    { date: '2023-06-23', day: '금' },
    { date: '2023-06-24', day: '토' },
    { date: '2023-06-25', day: '일' },
    { date: '2023-06-26', day: '월' },
    { date: '2023-06-27', day: '화' },
    { date: '2023-06-28', day: '수' },
    { date: '2023-06-29', day: '목' },
    { date: '2023-06-30', day: '금' },
  ];

  const act = getCalendarData('2023', '6', 'create');

  expect(act).toEqual(expectData);
});
