var argon2 = require('argon2')
var basicAuth = require('basic-auth')
var internalError = require('./internal-error')
var readPasswordHash = require('../data/read-password-hash')
var unauthorized = require('./unauthorized')

module.exports =
function requirePassword (request, response, directory, next) {
  var parsed = basicAuth(request)
  if (parsed === undefined) {
    unauthorized(request, response)
  } else if (parsed.name !== 'user') {
    unauthorized(request, response)
  } else {
    readPasswordHash(directory, function (error, passwordHash) {
      if (error) {
        internalError(request, response, error)
      } else {
        if (passwordHash === null) {
          allow()
        } else {
          checkPassword(passwordHash)
        }
      }
    })
  }
  function checkPassword (passwordHash) {
    argon2.verify(passwordHash, parsed.pass)
      .then(function (match) {
        if (match) {
          allow()
        } else {
          unauthorized(request, response)
        }
      })
  }

  function allow () {
    next(request, response, directory)
  }
}
