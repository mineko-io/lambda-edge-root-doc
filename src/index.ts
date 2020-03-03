import Handler from './Handler';
import Config from './Config';
import { CloudfrontRequestEventHandler } from './CloudfrontRequestEventHandler';
import { NewUriCallback } from './NewUriCallback';

const HandlerInstance = new Handler();

export {
  Handler,
  Config,
  CloudfrontRequestEventHandler,
  NewUriCallback,
  HandlerInstance as default,
};
