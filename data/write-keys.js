var encode = require('./encode')
var fs = require('fs')
var keysPath = require('./paths/keys')

module.exports = function writeKeys (directory, keys, callback) {
  fs.writeFile(
    keysPath(directory),
    encode(keys.publicKey) + ',' + encode(keys.privateKey),
    'ASCII',
    callback
  )
}
