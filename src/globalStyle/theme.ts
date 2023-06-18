import { DefaultTheme } from 'styled-components';

/** @Note theme에 color요소를 추가한다면 여기에 타입을 추가해주세요 */
export type Colors = {
  black: string;
  white: string;
  mint1: string;
  mint2: string;
  red: string;
  gray1: string;
  gray2: string;
  gray3: string;
  gray4: string;
  gray5: string;
};

/** @Note theme에 size요소를 추가한다면 여기에 타입을 추가해주세요 */
export type Size = {
  pc: string;
};

/** @Note theme에 요소를 추가하려면 DefaultTheme에서 타입 프로퍼티를 추가해주세요 */
export const theme: DefaultTheme = {
  colors: {
    black: '#000',
    white: '#fff',
    mint1: '#50E3C0',
    mint2: '#C1FBED',
    red: '#FF6E65',
    gray1: '#656669',
    gray2: '#8E8E93',
    gray3: '#BBBBBD',
    gray4: '#E5E5EA',
    gray5: '#F2F2F5',
  },
  size: {
    pc: '1920px',
  },
};
