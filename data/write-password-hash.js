var PASSWORD_LOCK = require('./locks/password')
var argon2 = require('argon2')
var fs = require('fs')
var lock = require('./lock')
var passwordHashPath = require('./paths/password-hash')

module.exports =
function writePasswordHash (directory, password, callback) {
  argon2.hash(password)
    .then(function (passwordHash) {
      lock(PASSWORD_LOCK, function (unlock) {
        fs.writeFile(
          passwordHashPath(directory),
          passwordHash,
          'utf8',
          unlock(callback)
        )
      })
    })
}
