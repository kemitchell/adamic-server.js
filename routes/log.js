var initializeLog = require('../data/initialize-log')
var internalError = require('./internal-error')
var isPublicKey = require('../data/is-public-key')
var logFileStream = require('../data/log-file-stream')
var notFound = require('./not-found')

module.exports = function log (request, response, directory) {
  if (request.method === 'GET') {
    get.apply(null, arguments)
  } else {
    response.statusCode = 405
    response.end()
  }
}

function get (request, response, directory) {
  var public = request.parameters.public
  if (!isPublicKey(public)) {
    return notFound(request, response)
  }
  response.setHeader('Content-Type', 'text/plain')
  logFileStream(directory, public)
    .once('error', function (error) {
      internalError(request, response, error)
    })
    .pipe(response)
}
