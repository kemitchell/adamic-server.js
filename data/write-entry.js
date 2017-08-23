var appendDigest = require('./append-digest')
var ecb = require('ecb')
var writePayload = require('./write-payload')

module.exports =
function writeEntry (directory, entry, callback) {
  writePayload(directory, entry, ecb(callback, function (digest) {
    appendDigest(directory, digest, callback)
  }))
}
