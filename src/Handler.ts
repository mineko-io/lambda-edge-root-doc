import Config from './Config';
import { CloudfrontRequestEventHandler } from './CloudfrontRequestEventHandler';

export default class Handler {
  getCloudfrontRequestHandler(config: Config): CloudfrontRequestEventHandler {
    return (event: AWSLambda.CloudFrontRequestEvent) => {
      const request = this.getRequest(event);
      if (!request.uri.endsWith('/')) return request;

      const newRequest = config.newUriCallback(request);
      if (config.log) console.log(`Redirecting from ${request.uri} to ${newRequest.uri}`); // eslint-disable-line
      return newRequest;
    };
  }

  private getRequest(event: AWSLambda.CloudFrontRequestEvent): AWSLambda.CloudFrontRequest {
    return event.Records[0].cf.request;
  }
}
