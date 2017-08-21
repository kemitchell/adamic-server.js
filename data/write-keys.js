var fs = require('fs')
var keysPath = require('./paths/keys')

module.exports = function writeKeys (directory, keys, callback) {
  fs.writeFile(
    keysPath(directory),
    (
      keys.publicKey.toString('hex') +
      ',' +
      keys.privateKey.toString('hex')
    ),
    'ASCII',
    callback
  )
}
