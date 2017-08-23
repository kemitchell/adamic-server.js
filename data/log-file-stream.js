var fs = require('fs')
var logPath = require('./paths/log')

module.exports = function logFileStream (directory, public) {
  return fs.createReadStream(logPath(directory, public))
}
