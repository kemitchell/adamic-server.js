var logPath = require('./paths/log')
var fs = require('fs')

module.exports = function appendDigest (directory, digest, callback) {
  fs.appendFile(
    logPath(directory),
    digest.toString('hex') + '\n',
    callback
  )
}
