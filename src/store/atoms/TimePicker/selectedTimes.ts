import { atom } from 'recoil';

interface selectedTimesTypes {
  startTime: string;
  endTime: string;
}

export const selectedTimes = atom<selectedTimesTypes>({
  key: 'selectedTime',
  default: {
    startTime: '08:00',
    endTime: '22:00',
  },
});
