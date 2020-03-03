export type CloudfrontRequestEventHandler =
(event: AWSLambda.CloudFrontRequestEvent) => Promise<AWSLambda.CloudFrontRequest>;
