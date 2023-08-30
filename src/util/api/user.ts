import { Axios } from '@/util/axios';

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
  try {
    const token = (await Axios.post(
      '/api/users',
      userSchedule
    )) as RegisterScheduleResponse;
    return token;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('registerSchedule Error', e);
    }
  }
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
  try {
    const res = (await Axios.patch(`/api/users/${id}`, modifyData, {
      headers: { Authorization: `Bearer ${token}` },
    })) as ModifyScheduleResponse;
    return res;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    }
  }
};
