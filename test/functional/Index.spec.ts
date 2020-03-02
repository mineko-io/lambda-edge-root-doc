import {
  Test, Expect, RestorableFunctionSpy, SpyOn,
} from 'alsatian';
import Handler, { CloudfrontRequestEventHandler, Config } from '../../src';

export default class IndexSpec {
    consoleLogSpy!: RestorableFunctionSpy;

    @Test()
    itRedirectToNewUri() {
      const getNewUriCallback = (request: AWSLambda.CloudFrontRequest) => {
        request.uri = `${request.uri}index.html`;
        return request;
      };

      const actual = this.getInstance({ getNewUriCallback })(this.getEvent('https://my.url/path/'));

      Expect(actual.uri).toEqual('https://my.url/path/index.html');
    }

    @Test()
    itDoesNothingIfUriDoesNotEndWithASlash() {
      const getNewUriCallback = (request: AWSLambda.CloudFrontRequest) => {
        request.uri = `${request.uri}index.html`;
        return request;
      };

      const actual = this.getInstance({ getNewUriCallback })(this.getEvent('https://my.url/path'));

      Expect(actual.uri).toEqual('https://my.url/path');
    }

    @Test()
    itDoesAConsoleLogIfConfigSet() {
      this.consoleLogSpy = SpyOn(console, 'log');
      const getNewUriCallback = (request: AWSLambda.CloudFrontRequest) => {
        request.uri = `${request.uri}index.html`;
        return request;
      };

      this.getInstance({
        getNewUriCallback,
        log: true,
      })(this.getEvent('https://my.url/path/'));

      Expect(this.consoleLogSpy).toHaveBeenCalledWith('Redirecting from https://my.url/path/index.html to https://my.url/path/index.html');
    }

    private getInstance(config: Config): CloudfrontRequestEventHandler {
      return Handler.getNewUri(config);
    }

    private getEvent(uri: string): AWSLambda.CloudFrontRequestEvent {
      return {
        Records: [
          {
            cf: {
              config: {
                distributionDomainName: '',
                distributionId: '',
                requestId: '',
                eventType: 'viewer-request',
              },
              request: {
                uri,
                clientIp: '',
                method: '',
                querystring: '',
                headers: {},
              },
            },
          },
        ],
      };
    }
}
