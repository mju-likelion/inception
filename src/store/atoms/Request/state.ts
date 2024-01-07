import { RecoilState, atom } from 'recoil';
import { ResultRoomResponse } from '@/util/api';

export const appointmentResultData: RecoilState<ResultRoomResponse> = atom({
  key: 'appointmentResultData',
  default: undefined as unknown as ResultRoomResponse,
});
