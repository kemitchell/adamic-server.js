var entryStream = require('../data/entry-stream')
var invalidRequest = require('./invalid-request')
var SHA256 = new RegExp('^' + require('../data/patterns/digest') + '$')

module.exports = function (request, response, directory) {
  if (request.method === 'GET') {
    get.apply(null, arguments)
  } else {
    response.statusCode = 405
    response.end()
  }
}

function get (request, response, directory) {
  var digest = request.parameters.digest
  if (!SHA256.test(digest)) return invalidRequest(request, response)
  response.setHeader('Content-Type', 'application/json')
  entryStream(directory, digest)
    .once('error', function (error) {
      response.statusCode = 404
      response.end()
    })
    .pipe(response)
}
