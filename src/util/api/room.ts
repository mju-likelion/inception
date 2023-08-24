import { Axios } from '@/util/axios';

export interface CreateRoomRequest {
  dates: string[]; // '2023-07-07,2023-07-08' | ['2023-07-07', '2023-07-08']
  dateOnly: boolean; // true: 날짜, false: 날짜+시간
  startTime?: string | undefined; // '09:00'
  endTime?: string | undefined; // '17:00'
}

export interface CreateRoomResponse {
  data: {
    code: string;
    dates: string;
    dateOnly: boolean;
    startTime: string[] | undefined;
    endTime: string | undefined;
    createdAt: string;
    updatedAt: string;
  };
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

export interface ViewRoomRequest {
  id: string;
}

export interface ViewRoomResponse {
  code: string; // 'NXGC2U'
  dates: string[]; // ['2023-07-07', '2023-07-08']
  dateOnly: boolean; // true: 날짜, false: 날짜+시간
  startTime?: string | undefined; // '09:00'
  endTime?: string | undefined; // '17:00'
  createdAt: string; // '2023-07-18T17:42:57.324Z'
  updatedAt: string; // '2023-07-18T17:42:57.324Z'
}

export const viewRoom = async ({
  id,
}: ViewRoomRequest): Promise<ViewRoomResponse | undefined> => {
  try {
    if (!id) {
      throw Error('id is null or empty value');
    }

    const res = await Axios.get(`/api/rooms/${id}`);
    return res.data as ViewRoomResponse;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('viewRoom Error', e);
    }
  }
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
}

export const resultRoom = async ({ id }: ResultRoomRequest) => {
  try {
    const res = await Axios.get(`/api/rooms/${id}/result`);
    return res.data as ResultRoomResponse;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('resultRoom Error', e);
    }
  }
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
}: ResultRoomByDateRequest) => {
  try {
    const res = await Axios.get(`/api/rooms/${id}/result/${date}`);
    return res.data as ResultRoomByDateResponse;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('resultRoomByDate Error', e);
    }
  }
};
