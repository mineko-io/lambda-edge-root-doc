# Lambda Edge Root Doc
![](https://github.com/mineko-io/lambda-edge-root-doc/workflows/Build%20%26%20Test/badge.svg)

This module provides a method to define the root document for origin requests from cloudfront in Lambda@Edge.
For each request which ends with a trailingslash `/` the `newUriCallback` gets called.

Useful method for Lambda@Edge for ReactJS applications deployed to AWS S3 with a main `index.html` file.

## Configuration
You can configure behavior of this method:

* `newUriCallback`: Callback method which gets the cloudfront request object. Must return a cloudfront request object.
* `log`: Enables logging to console  (default: `false`)

## Usage
How to use it:

### Install
```bash
npm i -S @mineko-io/lambda-edge-root-doc
```

### Example
Use it on your Lambda@Edge function like this:
```ts
import DefineRootDoc from '@mineko-io/lambda-edge-root-doc';

exports.handler = DefineRootDoc.getCloudfrontRequestHandler({
    log: true,
    newUriCallback: (request: AWSLambda.CloudFrontRequest): AWSLambda.CloudFrontRequest => {
        request.uri = `${request.uri}index.html`;
        return request;
    };
})
```