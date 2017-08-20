var ed25519 = require('ed25519')
var stringify = require('json-stable-stringify')

module.exports = function signature (payload, keys) {
  var payloadJSON = stringify(payload)
  var payloadBuffer = Buffer.from(payloadJSON, 'utf8')
  return ed25519.Sign(payloadBuffer, keys.private)
}
