# Lambda Edge Root Doc
[![Build Status](https://travis-ci.org/mineko-io/lambda-edge-root-doc.svg?branch=master)](https://travis-ci.org/mineko-io/lambda-edge-root-doc) [![Maintainability](https://api.codeclimate.com/v1/badges/b76fb2fec34f0f51cde4/maintainability)](https://codeclimate.com/github/mineko-io/lambda-edge-root-doc/maintainability)
This module provides a method to define the root document for origin requests from cloudfront in Lambda@Edge.

## Configuration
You can configure behavior of this method:

* `urlPart`: First part of request to origin (default: `''`)
* `rootDoc`: The root document (default: `index.html`)
* `log`: Enables logging to console

## Usage
Just add the package to your deployment package to lambda.

### Install
```bash
npm i -S @mineko-io/lambda-edge-root-doc
```

### Example
Use it on your Lambda@Edge function like this:
```js
const defineRootDoc = require('@mineko-io/lambda-edge-root-doc')

const config = {
    urlPart: '/my-url',
    rootDoc: '/my-index.html'
}
exports.handler = defineRootDoc(config)
```