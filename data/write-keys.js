var fs = require('fs')
var keysPath = require('./paths/keys')

module.exports = function writeKeys (directory, keys, callback) {
  fs.writeFile(
    keysPath(directory),
    (
      keys.public.toString('hex') +
      ',' +
      keys.private.toString('hex')
    ),
    'ASCII',
    callback
  )
}
