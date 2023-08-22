import { ResultRoomResponse } from '@/util/api';
import { RecoilState, atom } from 'recoil';

export const appointmentResultData: RecoilState<ResultRoomResponse> = atom({
  key: 'appointmentResultData',
  default: undefined as unknown as ResultRoomResponse,
});
