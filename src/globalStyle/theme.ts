import { DefaultTheme } from 'styled-components';
import { css } from 'styled-components';

/** @Note theme에 color요소를 추가한다면 여기에 타입을 추가해주세요 */
export type Colors = {
  black: string;
  white: string;
  mint1: string;
  mint2: string;
  mint3: string;
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
    mint3: '#32D3AD',
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
  font: {
    title1: css`
      font-size: 26px;
      font-weight: 700;
      line-height: 28px;
    `,
    title2: css`
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
    `,
    subtitle: css`
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
    `,
    body1: {
      regular: css`
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
      `,
      semiBold: css`
        font-size: 16px;
        font-weight: 600;
        line-height: 20px;
      `,
    },
    body2: css`
      font-size: 15px;
      font-weight: 400;
      line-height: 22px;
    `,
    body3: css`
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
    `,
    body4: css`
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
    `,
    body5: css`
      font-size: 11px;
      font-weight: 400;
      line-height: 12px;
    `,
  },
};
