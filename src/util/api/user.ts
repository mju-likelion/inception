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
