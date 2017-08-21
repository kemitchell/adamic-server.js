var announce = require('./payloads/announce')
var ecb = require('ecb')
var encode = require('./encode')
var generateKeys = require('./generate-keys')
var readKeys = require('./read-keys')
var signature = require('./signature')
var withLogLock = require('./with-log-lock')
var writeEntry = require('./write-entry')
var writeKeys = require('./write-keys')

module.exports = function initializeLog (directory, callback) {
  readKeys(directory, ecb(callback, function (keys) {
    if (keys) withKeys(keys)
    else {
      keys = generateKeys()
      writeKeys(directory, keys, ecb(callback, function () {
        withKeys(keys)
      }))
    }
  }))

  function withKeys (keys) {
    withLogLock(directory, ecb(callback, function (unlock) {
      var payload = announce(keys.publicKey)
      var entry = {
        payload: announce(keys.publicKey),
        signature: encode(signature(payload, keys))
      }
      writeEntry(directory, entry, unlock, callback)
    }))
  }
}
