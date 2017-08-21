var encode = require('./encode')
var fs = require('fs')
var logPath = require('./paths/log')

module.exports = function appendDigest (directory, digest, callback) {
  fs.appendFile(
    logPath(directory),
    encode(digest) + '\n',
    callback
  )
}
