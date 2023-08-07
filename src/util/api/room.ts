import { Axios } from '@/util/axios';

/** @TODO dates는 string[]으로 바뀔 예정?? */
export interface CreateRoomRequest {
  dates: string; // '2023-07-07,2023-07-08' | ['2023-07-07', '2023-07-08']
  dateOnly: boolean; // true: 날짜, false: 날짜+시간
  startTime?: string | undefined; // '09:00'
  endTime?: string | undefined; // '17:00'
}

export interface CreateRoomResponse {
  dates: string;
  dateOnly: boolean | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
}

export const createRoom = async (
  params: CreateRoomRequest
): Promise<CreateRoomResponse | undefined> => {
  try {
    const res = (await Axios.post('/api/rooms', params)) as CreateRoomResponse;
    return res;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('createRoom Error', e);
    }
  }
};
