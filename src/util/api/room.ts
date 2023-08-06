import { Axios } from '@/util/axios';

interface ICreateRoomRequest {
  dates: string; // "2023-07-07,2023-07-08"
  dateOnly: boolean; // true: 날짜, false: 날짜+시간
  startTime?: string; // '09:00'
  endTime?: string; // '17:00'
}

interface ICreateRoomResponse {
  dates: string;
  dateOnly: boolean | undefined;
  startTime: string | null;
  endTime: string | null;
}

export const createRoom = async (
  params: ICreateRoomRequest
): Promise<ICreateRoomResponse | undefined> => {
  try {
    const res = (await Axios.post('/api/rooms', params)) as ICreateRoomResponse;
    return res;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('createRoom Error', e);
    }
  }
};
