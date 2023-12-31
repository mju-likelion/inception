import {
  CreateRoomRequest,
  CreateRoomResponse,
  GetRoomDataRequest,
  GetRoomDataResponse,
  ResultRoomByDateResponse,
  ResultRoomResponse,
} from './room';
import {
  ModifyScheduleRequest,
  ModifyScheduleResponse,
  RegisterScheduleRequest,
  RegisterScheduleResponse,
} from './user';

/** 약속방 정보 */
interface Appointment {
  code: string; // "X97JID"
  dateOnly: boolean;
  dates: string[]; //[ "2023-08-31", "2023-09-01"]
  startTime: string | undefined; // "09:00"
  endTime: string | undefined; // "15:00"
  votingUsers: string[]; // ["유저1", "유저2"]
  enableTimes: { [key: string]: number }; // "2023-08-31": 3,
  createdAt: string;
  updatedAt: string;
}

/** 유저 정보 */
interface User {
  id: string; // roomCode_name
  roomCode: string; // "A12345"
  name: string;
  password: string;
  dates: string[];
}

const enum MOCKUP_KEY {
  Appointment = 'MOCKUP_APPOINTMENT',
  User = 'MOCKUP_USER',
}

const localStorageUtil = {
  getData: (key: MOCKUP_KEY) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setData: (key: MOCKUP_KEY, value: any) => {
    const valueToString =
      typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, valueToString);
  },
};

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

    let storedAppointment = localStorageUtil.getData(MOCKUP_KEY.Appointment);

    if (storedAppointment) {
      storedAppointment[code] = appointment;
    } else {
      storedAppointment = { [code]: appointment };
    }

    localStorageUtil.setData(MOCKUP_KEY.Appointment, storedAppointment);

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
    const room = localStorageUtil.getData(MOCKUP_KEY.Appointment)?.[param.id];
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
    const appointment: Appointment = localStorageUtil.getData(
      MOCKUP_KEY.Appointment
    )?.[param.id];

    const storedUsers: { [key: string]: User } = localStorageUtil.getData(
      MOCKUP_KEY.User
    );

    let response: ResultRoomResponse | ResultRoomByDateResponse;

    if (!appointment) {
      throw new Error(`${param.id}에 해당하는 약속 정보가 없습니다.`);
    }

    /** 투표받은 날짜 집계 */
    const enableTimes = appointment.votingUsers.reduce((map, value) => {
      const mergeDate = storedUsers[`${param.id}_${value}`].dates.reduce(
        (arr, dateTime) => {
          const date = dateTime.split(' ')[0];
          if (arr.includes(date)) {
            return arr;
          }
          return arr.concat(date);
        },
        [] as string[]
      );

      mergeDate.forEach((value) => {
        if (map[value]) {
          map[value] += 1;
        } else {
          map[value] = 1;
        }
      });
      return map;
    }, {} as { [key: string]: number });

    appointment.enableTimes = enableTimes;

    /** date 없으면 약속방 결과 조회 */
    if (!param.date) {
      response = appointment;
      console.log('getAppointmentResult', response);
      return response;
    }

    /** 약속방 내 특정 날짜 결과 조회 */
    const countSelectedTimes = appointment.votingUsers.reduce(
      (dateTimes, user) => {
        const dates = storedUsers[`${param.id}_${user}`].dates;
        dates.forEach((dateTime) => {
          if (dateTimes[dateTime]) {
            dateTimes[dateTime] += 1;
          } else {
            dateTimes[dateTime] = 1;
          }
        });
        return dateTimes;
      },
      {} as { [key: string]: number }
    );

    const everyoneSelectedTimes = Object.entries(countSelectedTimes).reduce(
      (arr, [key, value]) => {
        if (value === appointment.votingUsers.length) {
          return arr.concat(key.split(' ')[1]);
        }
        return arr;
      },
      [] as string[]
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

  registerSchedule: (
    param: RegisterScheduleRequest
  ): RegisterScheduleResponse => {
    console.log(param);

    const newUser: User = {
      id: `${param.roomCode}_${param.username}`,
      name: param.username,
      password: param.password,
      roomCode: param.roomCode,
      dates: param.dates,
    };

    // user등록
    let storedUser: { [key: string]: User } = localStorageUtil.getData(
      MOCKUP_KEY.User
    );
    if (storedUser) {
      storedUser[newUser.id] = newUser;
    } else {
      storedUser = { [newUser.id]: newUser };
    }
    localStorageUtil.setData(MOCKUP_KEY.User, storedUser);

    // 약속 투표자에 유저 추가
    const storedAppointment: { [key: string]: Appointment } =
      localStorageUtil.getData(MOCKUP_KEY.Appointment);
    storedAppointment[newUser.roomCode].votingUsers.push(newUser.name);
    localStorageUtil.setData(MOCKUP_KEY.Appointment, storedAppointment);

    const response: RegisterScheduleResponse = {
      data: { accessToken: `${newUser.id}` },
    };

    return response;
  },

  modifySchedule: (param: ModifyScheduleRequest): ModifyScheduleResponse => {
    const response: ModifyScheduleResponse = {
      createdAt: new Date(),
      updatedAt: new Date(),
      enableTimes: [''],
      id: '',
      password: '',
      roomId: '',
      username: '',
    };

    return response;
  },
};
