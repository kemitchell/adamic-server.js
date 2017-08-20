var entryPath = require('./paths/entry')
var fs = require('fs')

module.exports = function entryStream (directory, digest) {
  return fs.createReadStream(entryPath(directory, digest))
}
