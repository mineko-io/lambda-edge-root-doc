const {
    URI_PART,
    LOG
} = process.env
const defineRootDoc = require('./index')

exports.handler = defineRootDoc({
    uriPart: URI_PART,
    log: LOG
})