module.exports = (config = {}) => async event => {
    const uriPart = config.uriPart || ''
    const rootDoc = config.rootDoc || '/index.html'
    const request = event.Records[0].cf.request
    const oldUri = request.uri
    var newUri = oldUri

    if (newUri.endsWith('/'))
        newUri = `${uriPart}${rootDoc}`

    if (config.log) {
        console.log(`Old URI: ${oldUri}`)
        console.log(`New URI: ${newUri}`)
    }

    request.uri = newUri
    return request
}