var pumpify = require('pumpify')
var split2 = require('split2')
var logFileStream = require('./log-file-stream')

module.exports = function entryDigestStream (directory) {
  return pumpify(
    logFileStream(directory),
    split2('\n')
  )
}
