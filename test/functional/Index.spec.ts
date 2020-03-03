import {
  Test, Expect, RestorableFunctionSpy, SpyOn,
} from 'alsatian';
import Handler, { CloudfrontRequestEventHandler, Config } from '../../src';

export default class IndexSpec {
    consoleLogSpy!: RestorableFunctionSpy;

    @Test()
    async itRedirectToNewUri() {
      const newUriCallback = (request: AWSLambda.CloudFrontRequest) => {
        request.uri = `${request.uri}index.html`;
        return request;
      };

      const actual = await this.getInstance({ newUriCallback })(this.getEvent('https://my.url/path/'));

      Expect(actual.uri).toEqual('https://my.url/path/index.html');
    }

    @Test()
    async itDoesNothingIfUriDoesNotEndWithASlash() {
      const newUriCallback = (request: AWSLambda.CloudFrontRequest): AWSLambda.CloudFrontRequest => {
        request.uri = `${request.uri}index.html`;
        return request;
      };

      const actual = await this.getInstance({ newUriCallback })(this.getEvent('https://my.url/path'));

      Expect(actual.uri).toEqual('https://my.url/path');
    }

    @Test()
    async itDoesAConsoleLogIfConfigSet() {
      this.consoleLogSpy = SpyOn(console, 'log');
      const newUriCallback = (request: AWSLambda.CloudFrontRequest): AWSLambda.CloudFrontRequest => {
        request.uri = `${request.uri}index.html`;
        return request;
      };

      await this.getInstance({
        newUriCallback,
        log: true,
      })(this.getEvent('https://my.url/path/'));

      Expect(this.consoleLogSpy).toHaveBeenCalledWith('Redirecting from https://my.url/path/ to https://my.url/path/index.html');
    }

    private getInstance(config: Config): CloudfrontRequestEventHandler {
      return Handler.getCloudfrontRequestHandler(config);
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
