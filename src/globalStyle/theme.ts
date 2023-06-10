import { DefaultTheme } from 'styled-components';

/** @Note theme에 color요소를 추가한다면 여기에 타입을 추가해주세요 */
export type Colors = {
  black: string;
  white: string;
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
  },
  size: {
    pc: '1920px',
  },
};
