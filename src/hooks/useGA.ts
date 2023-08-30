import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export const useGAInitialize = () => {
  useEffect(() => {
    const gaId = process.env.REACT_APP_GA_ID;
    const gaDebug = process.env.REACT_APP_GA_DEBUG;

    if (!gaId) {
      throw new Error('Google Analytics ID not found');
    }

    console.log('gaDebugMode', gaDebug);

    ReactGA.initialize(gaId, { gaOptions: { debug: gaDebug === 'true' } });
  }, []);
};
