import {
  CreateRoomRequest,
  CreateRoomResponse,
  GetRoomDataRequest,
  GetRoomDataResponse,
  ResultRoomByDateResponse,
  ResultRoomRequest,
  ResultRoomResponse,
} from './room';

export * from './room';
export * from './user';

interface Appointment {
  code: string; // "X97JID"
  dateOnly: boolean;
  dates: string[]; //[ "2023-08-31", "2023-09-01"]
  startTime: string | undefined; // "09:00"
  endTime: string | undefined; // "15:00"
  votingUsers: string[]; // ["유저1", "유저2"]
  enableTimes: { [key: string]: number }; // "2023-08-31": 3 || "2023-07-20 15:00": 5,
  createdAt: string;
  updatedAt: string;
}

interface User {
  roomCodes: string[]; // ["A12345", "B12345"]
  name: string;
  password: string;
}

interface Mockup extends Window {
  appointment: { [key: string]: Appointment };
  user: { [key: string]: User };
}

(window as any).appointment = {};
(window as any).user = {};

export const mockupBackend = {
  createRoom: (param: CreateRoomRequest): CreateRoomResponse => {
    console.log('createRoom', param);
    const code = Math.random().toString(16).substring(2, 8).toUpperCase();
    const appointment: Appointment = {
      code,
      dates: param.dates,
      dateOnly: param.dateOnly,
      startTime: param.startTime,
      endTime: param.endTime,
      enableTimes: {},
      votingUsers: [],
      createdAt: '2023-12-26T20:01:00.277Z',
      updatedAt: '2023-12-26T20:01:00.277Z',
    };

    (window as unknown as Mockup).appointment[code] = appointment;

    return {
      data: {
        code: code,
        dateOnly: appointment.dateOnly,
        dates: appointment.dates,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      },
    };
  },

  getRoomData: (param: GetRoomDataRequest): GetRoomDataResponse => {
    const room = (window as unknown as Mockup).appointment[param.id];
    const response: GetRoomDataResponse = room;

    console.log('getRoomData', room);

    if (!response) {
      throw new Error(`${param.id}에 해당하는 방 정보가 없습니다.`);
    }

    return response;
  },

  getAppointmentResult: (param: {
    id: string;
    date?: string;
  }): ResultRoomResponse | ResultRoomByDateResponse => {
    const appointment = (window as unknown as Mockup).appointment[param.id];
    let response: ResultRoomResponse | ResultRoomByDateResponse;

    if (!appointment) {
      throw new Error(`${param.id}에 해당하는 약속 정보가 없습니다.`);
    }

    /** date 없으면 약속방 결과 조회 */
    if (!param.date) {
      response = appointment;
      console.log('getAppointmentResult', response);

      return response;
    }

    /** 약속방 내 특정 날짜 결과 조회 */
    const keys = Object.keys(appointment.enableTimes).filter(
      (time) => time.split(' ')[0] === param.date
    );
    const everyoneSelectedTimes = keys.filter(
      (key) => appointment.enableTimes[key] === appointment.votingUsers.length
    );

    response = {
      code: appointment.code,
      selectedDate: param.date,
      dateOnly: appointment.dateOnly,
      votingUsers: appointment.votingUsers,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      everyoneSelectedTimes: everyoneSelectedTimes,
    };

    console.log('getAppointmentResult', response);

    return response;
  },
};
