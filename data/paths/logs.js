var path = require('path')

module.exports = function logsPath (directory) {
  return path.join(directory, 'logs')
}
