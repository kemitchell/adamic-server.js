var logFileStream = require('../data/log-file-stream')
var initializeLog = require('../data/initialize-log')
var internalError = require('./internal-error')

module.exports = function log (request, response, directory) {
  if (request.method === 'GET') {
    get.apply(null, arguments)
  } else {
    response.statusCode = 405
    response.end()
  }
}

function get (request, response, directory) {
  response.setHeader('Content-Type', 'text/plain')
  logFileStream(directory)
    .once('error', function (error) {
      if (error.code === 'ENOENT') {
        initializeLog(directory, function (error) {
          if (error) return internalError(request, response, error)
          get(request, response, directory)
        })
      } else {
        internalError(request, response, error)
      }
    })
    .pipe(response)
}
