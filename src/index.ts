import Handler from './Handler';
import Config from './Config';
import { CloudfrontRequestEventHandler } from './CloudfrontRequestEventHandler';
import { GetNewUriCallback } from './GetNewUriCallback';

const HandlerInstance = new Handler();

export {
  Handler,
  Config,
  CloudfrontRequestEventHandler,
  GetNewUriCallback,
  HandlerInstance as default,
};
