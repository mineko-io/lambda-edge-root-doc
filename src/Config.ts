import { GetNewUriCallback } from './GetNewUriCallback';

export default interface Config {
    log?: boolean;
    getNewUriCallback: GetNewUriCallback;
}
