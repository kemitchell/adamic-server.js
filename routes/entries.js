var entryStream = require('../data/entry-stream')
var invalidRequest = require('./invalid-request')
var isDigest = require('../data/is-digest')

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
  if (!isDigest(digest)) return invalidRequest(request, response)
  response.setHeader('Content-Type', 'application/json')
  entryStream(directory, digest)
    .once('error', function (error) {
      response.statusCode = 404
      response.end()
    })
    .pipe(response)
}
