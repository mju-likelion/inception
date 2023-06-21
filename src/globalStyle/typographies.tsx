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
  Title1: {
    'font-size': '26px',
    'font-weight': weight.Bold,
    'line-height': '28px',
  },
  Title2: {
    'font-size': '20px',
    'font-weight': weight.Bold,
    'line-height': '24px',
  },
  Subtitle: {
    'font-size': '18px',
    'font-weight': weight.Semibold,
    'line-height': '24px',
  },
  Body1: {
    Regular: {
      'font-size': '16px',
      'font-weight': weight.Semibold,
      'line-height': '20px',
    },
    Semibold: {
      'font-size': '16px',
      'font-weight': weight.Semibold,
      'line-height': '20px',
    },
  },
  Body2: {
    'font-size': '15px',
    'font-weight': weight.Regular,
    'line-height': '22px',
  },
  Body3: {
    'font-size': '14px',
    'font-weight': weight.Regular,
    'line-height': '18px',
  },
  Body4: {
    'font-size': '12px',
    'font-weight': weight.Semibold,
    'line-height': '16px',
  },
  Body5: {
    'font-size': '11px',
    'font-weight': weight.Regular,
    'line-height': '12px',
  },
};
