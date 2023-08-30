import { useEffect } from 'react';
import ReactGA from 'react-ga4';

import { gaApi } from '@/util/gaApi';

export const useGAInitialize = () => {
  useEffect(() => {
    const gaId = process.env.REACT_APP_GA_ID;
    const gaDebug = process.env.REACT_APP_GA_DEBUG;

    if (!gaId) {
      throw new Error('Google Analytics ID not found');
    }

    if (gaDebug) {
      console.log('Google Analytics Debug Mode');
      ReactGA.initialize(gaId, {
        gaOptions: { debug_mode: gaDebug === 'true' },
      });
      return;
    }

    ReactGA.initialize(gaId);
  }, []);
};

export const useGaApi = () => {
  const changePathnameToTPath = (pathname: string) => {
    if (pathname.includes('/appointment')) return '/vote-room';
    if (pathname.includes('/submit-code')) return '/search-room';
    if (pathname.includes('/result')) return '/room-result';
    return '/create-room';
  };

  return { changePathnameToTPath, gaApi };
};
