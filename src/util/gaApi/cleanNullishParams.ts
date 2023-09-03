import isNil from 'lodash/isNil';

export const cleanNullishParams = (
  params: {
    [key: string]: string | number | boolean | undefined | null;
  } = {}
) => {
  Object.keys(params).forEach((key) => {
    if (isNil(params[key])) {
      delete params[key];
    }
  });

  return params;
};
