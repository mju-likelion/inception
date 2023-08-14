import { Axios } from '@/util/axios';

export interface ModifyScheduleRequest {
  username: string; // "유예빈"
  dateOnly: boolean; // false
  dates: string[]; // ["2023-07-20 15:00", "2023-07-21 15:00"]
}

export interface ModifyScheduleResponse {
  data: {
    id: string; // "5a921138-2055-414c-8264-76551eeeba8a"
    username: string; // "유예빈"
    password: string; // "$2b$10$2hnmCN6WB4lvwkY.ymzHme9Pa1VitjiR8UAKQ5wK7VT.CcSk4cvAe"
    enableTimes: string[]; // ["2023-07-20 15:00", "2023-07-21 15:00"]
    roomId: string; // "RY3S5I"
    createdAt: Date; // "2023-08-07T10:49:59.228Z"
    updatedAt: Date; // "2023-08-08T10:28:50.679Z"
  };
}

export const modifySchedule = async (
  id: string,
  params: ModifyScheduleRequest
): Promise<ModifyScheduleResponse | undefined> => {
  try {
    const res = (await Axios.patch(`/${id}`, params)) as ModifyScheduleResponse;
    return res;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('modifySchedule Error', e);
    }
  }
};
