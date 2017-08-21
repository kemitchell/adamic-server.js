var internalError = require('./internal-error')
var requirePassword = require('./require-password')
var simpleConcat = require('simple-concat')
var writePasswordHash = require('../data/write-password-hash')

module.exports = function (request, response, directory) {
  if (request.method === 'PUT') {
    requirePassword(request, response, directory, put)
  } else {
    response.statusCode = 405
    response.end()
  }
}

function put (request, response, directory) {
  simpleConcat(request, function (error, buffer) {
    if (error) {
      internalError(request, response, error)
    } else {
      var password = buffer.toString()
      writePasswordHash(directory, password, function (error) {
        if (error) {
          internalError(request, response, error)
        } else {
          response.statusCode = 204
          response.end()
        }
      })
    }
  })
}
