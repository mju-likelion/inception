import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const useGAInitialize = () => {
  useEffect(() => {
    const gaId = process.env.REACT_APP_GA_ID;
    const gaDebug = process.env.REACT_APP_GA_DEBUG;

    if (!gaId) {
      throw new Error('Google Analytics ID not found');
    }

    if (gaDebug) {
      console.log('Google Analytics Debug Mode');
      ReactGA.initialize(gaId, { gaOptions: { debug: gaDebug === 'true' } });
      return;
    }

    ReactGA.initialize(gaId);
  }, []);
};
