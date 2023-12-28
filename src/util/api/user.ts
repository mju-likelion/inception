import { Axios } from '@/util/axios';
import * as Sentry from '@sentry/react';
import { mockupBackend } from './mockup';

export interface RegisterScheduleRequest {
  roomCode: string;
  username: string;
  password: string;
  dateOnly: boolean;
  dates: string[];
}

export interface RegisterScheduleResponse {
  data: {
    accessToken: string;
  };
}

export const registerSchedule = async (
  userSchedule: RegisterScheduleRequest
): Promise<RegisterScheduleResponse | undefined> => {
  const mockData: RegisterScheduleResponse =
    mockupBackend.registerSchedule(userSchedule);

  return await mockData;

  // try {
  //   const token = (await Axios.post(
  //     '/api/users',
  //     userSchedule
  //   )) as RegisterScheduleResponse;
  //   return token;
  // } catch (e) {
  //   if (e instanceof Error) {
  //     Sentry.captureException(`약속을 등록하는데 실패했대요 ㅠㅠ ${e}`);
  //     window.alert('registerSchedule Error');
  //     throw new Error('registerSchedule Error', e);
  //   }
  // }
};

export interface ModifyScheduleRequest {
  dates: string[]; // ["2023-07-20 15:00", "2023-07-21 15:00"]
}

export interface ModifyScheduleResponse {
  id: string; // "5a921138-2055-414c-8264-76551eeeba8a"
  username: string; // "유예빈"
  password: string; // "$2b$10$2hnmCN6WB4lvwkY.ymzHme9Pa1VitjiR8UAKQ5wK7VT.CcSk4cvAe"
  enableTimes: string[]; // ["2023-07-20 15:00", "2023-07-21 15:00"]
  roomId: string; // "RY3S5I"
  createdAt: Date; // "2023-08-07T10:49:59.228Z"
  updatedAt: Date; // "2023-08-08T10:28:50.679Z"
}

export const modifySchedule = async (
  token: string,
  id: string,
  modifyData: ModifyScheduleRequest
): Promise<ModifyScheduleResponse | undefined> => {
  console.log(token, id, modifyData);
  const mockData: ModifyScheduleResponse = {
    id: '',
    username: '',
    password: '',
    enableTimes: [''],
    roomId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return await mockData;

  // try {
  //   const res = (await Axios.patch(`/api/users/${id}`, modifyData, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })) as ModifyScheduleResponse;
  //   return res;
  // } catch (e) {
  //   if (e instanceof Error) {
  //     window.alert('modify schedule Error');
  //     Sentry.captureException(`일정을 수정하는데 실패했대요 ㅠㅠ ${e}`);
  //   }
  // }
};
