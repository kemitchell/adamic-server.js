var PASSWORD_LOCK = require('./locks/password')
var fs = require('fs')
var lock = require('./lock')
var passwordHashPath = require('./paths/password-hash')

module.exports =
function readPasswordHash (directory, callback) {
  lock(PASSWORD_LOCK, function (unlock) {
    var file = passwordHashPath(directory)
    fs.readFile(file, 'utf8', unlock(function (error, passwordHash) {
      if (error && error.code === 'ENOENT') {
        callback(null, null)
      } else {
        callback(error, passwordHash)
      }
    }))
  })
}
