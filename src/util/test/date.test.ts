import { getCalendarData } from '@/util';

test('2023년 6월 달력 정보를 제대로 가져오는지 확인', () => {
  const expectData = [
    { date: '20230601', day: '목' },
    { date: '20230602', day: '금' },
    { date: '20230603', day: '토' },
    { date: '20230604', day: '일' },
    { date: '20230605', day: '월' },
    { date: '20230606', day: '화' },
    { date: '20230607', day: '수' },
    { date: '20230608', day: '목' },
    { date: '20230609', day: '금' },
    { date: '20230610', day: '토' },
    { date: '20230611', day: '일' },
    { date: '20230612', day: '월' },
    { date: '20230613', day: '화' },
    { date: '20230614', day: '수' },
    { date: '20230615', day: '목' },
    { date: '20230616', day: '금' },
    { date: '20230617', day: '토' },
    { date: '20230618', day: '일' },
    { date: '20230619', day: '월' },
    { date: '20230620', day: '화' },
    { date: '20230621', day: '수' },
    { date: '20230622', day: '목' },
    { date: '20230623', day: '금' },
    { date: '20230624', day: '토' },
    { date: '20230625', day: '일' },
    { date: '20230626', day: '월' },
    { date: '20230627', day: '화' },
    { date: '20230628', day: '수' },
    { date: '20230629', day: '목' },
    { date: '20230630', day: '금' },
  ];

  const act = getCalendarData('2023', '6');

  expect(act).toEqual(expectData);
});
