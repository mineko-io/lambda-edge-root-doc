const getRequest = event => event.Records[0].cf.request
const getNewUri = (oldUri, uriPart, rootDoc, replaceUri) => {
    if (replaceUri) {
        return `${uriPart}${rootDoc}`
    }
    return `${oldUri}${uriPart}${rootDoc}`
}
const logging = msg => console.log(msg)

module.exports = (config = {}) => async event => {
    const { uriPart = '', rootDoc = '/index.html', log = false, replaceUri = true } = config

    const request = getRequest(event)
    const uri = request.uri

    log && logging(`Old URI: ${uri}`)

    if (uri.endsWith('/')) {
        request.uri = getNewUri(uri, uriPart, rootDoc, replaceUri)
        log && logging(`New URI: ${request.uri}`)
    }

    return request
}