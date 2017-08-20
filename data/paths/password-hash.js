var path = require('path')

module.exports = function (directory) {
  return path.join(directory, 'password')
}
