import { NewUriCallback } from './NewUriCallback';

export default interface Config {
    log?: boolean;
    newUriCallback: NewUriCallback;
}
