var path = require('path')
var logsPath = require('./logs')

module.exports = function (directory, publicKey) {
  return path.join(logsPath(directory), publicKey)
}
