import { CreateRoomRequest, CreateRoomResponse } from './room';

export * from './room';
export * from './user';

interface Appointment {
  code: string; // "X97JID"
  dateOnly: boolean;
  dates: string[]; //[ "2023-08-31", "2023-09-01"]
  startTime?: string; // "09:00"
  endTime?: string; // "15:00"
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
};
