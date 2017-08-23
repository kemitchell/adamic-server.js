var logFileStream = require('../data/log-file-stream')
var listLogs = require('../data/list-logs')
var initializeLog = require('../data/initialize-log')
var internalError = require('./internal-error')

module.exports = function logs (request, response, directory) {
  if (request.method === 'GET') {
    get.apply(null, arguments)
  } else {
    response.statusCode = 405
    response.end()
  }
}

function get (request, response, directory) {
  response.setHeader('Content-Type', 'text/plain')
  listLogs(directory, function (error, logs) {
    if (error) {
      internalError(request, response, error)
    } else {
      if (logs.length === 0) {
        response.end()
      } else {
        response.end(logs.sort().join('\n') + '\n')
      }
    }
  })
}
