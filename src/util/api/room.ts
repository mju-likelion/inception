import { Axios } from '@/util/axios';
import * as Sentry from '@sentry/react';
import { mockupBackend } from '.';

export interface CreateRoomRequest {
  dates: string[]; // '2023-07-07,2023-07-08' | ['2023-07-07', '2023-07-08']
  dateOnly: boolean; // true: 날짜, false: 날짜+시간
  startTime?: string | undefined; // '09:00'
  endTime?: string | undefined; // '17:00'
}

export interface CreateRoomResponse {
  data: {
    code: string;
    dates: string[];
    dateOnly: boolean;
    startTime: string | undefined;
    endTime: string | undefined;
    createdAt: string;
    updatedAt: string;
  };
}

/** 방 신규 생성 api */
export const createRoom = async (
  params: CreateRoomRequest
): Promise<CreateRoomResponse | undefined> => {
  const 방생성_목업 = mockupBackend.createRoom({
    dateOnly: params.dateOnly,
    dates: params.dates,
    startTime: params.startTime,
    endTime: params.endTime,
  });
  return await 방생성_목업;
  // try {
  //   const res = (await Axios.post('/api/rooms', params)) as CreateRoomResponse;
  //   return res;
  // } catch (e) {
  //   if (e instanceof Error) {
  //     window.alert('createRoom Error');
  //     Sentry.captureException(`방을 생성하는데 실패했대요 ㅠㅠ ${e}`);
  //     throw new Error('createRoom Error', e);
  //   }
  // }
};

export interface GetRoomDataRequest {
  id: string;
}

export interface GetRoomDataResponse {
  code: string; // 'NXGC2U'
  dates: string[]; // ['2023-07-07', '2023-07-08']
  dateOnly: boolean; // true: 날짜, false: 날짜+시간
  startTime?: string | undefined; // '09:00'
  endTime?: string | undefined; // '17:00'
  createdAt: string; // '2023-07-18T17:42:57.324Z'
  updatedAt: string; // '2023-07-18T17:42:57.324Z'
}

export const getRoomData = async ({
  id,
}: GetRoomDataRequest): Promise<GetRoomDataResponse | undefined> => {
  const mockData = mockupBackend.getRoomData({ id });
  return await mockData;
  // try {
  //   if (!id) {
  //     Sentry.captureException('id is null or empty value');
  //     window.alert('id is null or empty value');
  //     throw Error('id is null or empty value');
  //   }

  //   const res = await Axios.get(`/api/rooms/${id}`);
  //   return res.data as ViewRoomResponse;
  // } catch (e) {
  //   if (e instanceof Error) {
  //     Sentry.captureException(`방을 조회(입장)하는데 실패했대요 ㅠㅠ ${e}`);
  //     throw new Error('viewRoom Error', e);
  //   }
  // }
};

export interface ResultRoomRequest {
  id: string;
}

export interface ResultRoomResponse {
  code: string;
  dateOnly: boolean;
  dates: string[];
  startTime: string | undefined;
  endTime: string | undefined;
  createdAt: string;
  updatedAt: string;
  enableTimes: { [time: string]: number };
  votingUsers: string[];
}

export const resultRoom = async ({
  id,
}: ResultRoomRequest): Promise<ResultRoomResponse | undefined> => {
  const mockData = mockupBackend.getAppointmentResult({ id });
  return (await mockData) as ResultRoomResponse;
  // try {
  //   const res = await Axios.get(`/api/rooms/${id}/result`);
  //   return res.data as ResultRoomResponse;
  // } catch (e) {
  //   if (e instanceof Error) {
  //     window.alert('result view error');
  //     Sentry.captureException(`결과를 조회하는데 실패했대요 ㅠㅠ ${e}`);
  //   }
  // }
};

export interface ResultRoomByDateRequest {
  id: string; // ^[A-Z\d]{6}$
  date: string; // ^\d{4}-\d{2}-\d{2}$
}

export interface ResultRoomByDateResponse {
  code: string; // "3SDXQI"
  selectedDate: string; // "2023-08-31"
  dateOnly: boolean; // false일땐 시간도 정보도 포함됨
  votingUsers: string[]; // ["유저1", "유저2"]
  startTime?: string; // "09:00"
  endTime?: string; // "17:00"
  everyoneSelectedTimes?: string[]; // ["09:00", "09:30", "11:00", "11:30"]
}

export const resultRoomByDate = async ({
  id,
  date,
}: ResultRoomByDateRequest): Promise<ResultRoomByDateResponse | undefined> => {
  const mockData = mockupBackend.getAppointmentResult({ id, date });
  return (await mockData) as ResultRoomByDateResponse;

  // try {
  //   const res = await Axios.get(`/api/rooms/${id}/result/${date}`);
  //   return res.data as ResultRoomByDateResponse;
  // } catch (e) {
  //   if (e instanceof Error) {
  //     Sentry.captureException(e);
  //     window.alert('resultRoomByDate Error');
  //     throw new Error('resultRoomByDate Error', e);
  //   }
  // }
};
