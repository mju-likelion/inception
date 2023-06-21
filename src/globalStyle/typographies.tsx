import { css } from 'styled-components';

const weight = {
  Regular: 400,
  Semibold: 500,
  Bold: 700,
} as const;

export type FontType = {
  Title1: object;
  Title2: object;
  Subtitle: object;
  Body1: object;
  Body2: object;
  Body3: object;
  Body4: object;
  Body5: object;
};

export const typographies: FontType = {
  Title1: css`
    font-size: '26px';
    font-weight: ${weight.Bold};
    line-height: '28px';
  `,
  Title2: css`
    font-size: '20px';
    font-weight: ${weight.Bold};
    line-height: '24px';
  `,
  Subtitle: css`
    font-size: '18px';
    font-weight: ${weight.Semibold};
    line-height: '28px';
  `,
  Body1: {
    Regular: css`
      font-size: '16px';
      font-weight: ${weight.Regular};
      line-height: '20px';
    `,
    Semibold: css`
      font-size: '16px';
      font-weight: ${weight.Semibold};
      line-height: '20px';
    `,
  },
  Body2: css`
    font-size: '15px';
    font-weight: ${weight.Regular};
    line-height: '22px';
  `,
  Body3: css`
    font-size: '14px';
    font-weight: ${weight.Regular};
    line-height: '18px';
  `,
  Body4: css`
    font-size: '12px';
    font-weight: ${weight.Semibold};
    line-height: '16px';
  `,
  Body5: css`
    font-size: '11px';
    font-weight: ${weight.Regular};
    line-height: '12px';
  `,
};
