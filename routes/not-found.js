module.exports = function notFound (request, response) {
  response.statusCode = 404
  response.end()
}
