import { atom } from 'recoil';

export const signUpNickname = atom({
  key: 'signUpNickname',
  default: '',
});

export const signUpPassword = atom({
  key: 'signUpPassword',
  default: '',
});
