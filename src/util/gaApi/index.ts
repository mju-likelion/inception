import { decamelizeKeys } from 'humps';
import ReactGA from 'react-ga4';

import { cleanNullishParams } from './cleanNullishParams';
import { TBinEvent } from './eventType';

export class GaApi {
  private printLog(...params: any[]) {
    if (
      process.env.REACT_APP_IS_DEV === 'true' &&
      localStorage.getItem('enable_ga_log')
    ) {
      console.log(...params);
    }
  }

  sendEvent(params: TBinEvent) {
    const { eventName, ...rest } = params;
    const cleanedParams = cleanNullishParams(rest);
    const restParams = decamelizeKeys(cleanedParams);
    const timestamp = Date.now();

    ReactGA.event(eventName, {
      ...restParams,
      t_timestamp: timestamp,
    });
    this.printLog(eventName, {
      ...restParams,
      t_timestamp: timestamp,
    });
  }
}

export const gaApi = new GaApi();
