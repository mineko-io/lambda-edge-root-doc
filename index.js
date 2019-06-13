const getRequest = event => event.Records[0].cf.request

const getFirstUriPart = uri => '/' + uri.substr(1).split('/').shift()

const getNewUri = (oldUri, uriPart, rootDoc, replaceUri, onlyFirstPart) => {
    if (replaceUri) {
        return `${uriPart}${rootDoc}`
    }

    if (onlyFirstPart) {
        return `${getFirstUriPart(oldUri)}${uriPart}${rootDoc}`
    }

    return `${oldUri}${uriPart}${rootDoc}`
}

const logging = msg => console.log(msg)

module.exports = (config = {}) => async event => {
    const { uriPart = '', rootDoc = '/index.html', log = false, replaceUri = true, onlyFirstPart = false } = config

    const request = getRequest(event)
    const uri = request.uri

    log && logging(`Old URI: ${uri}`)

    if (uri.endsWith('/')) {
        request.uri = getNewUri(uri, uriPart, rootDoc, replaceUri, onlyFirstPart)
        log && logging(`New URI: ${request.uri}`)
    }

    return request
}