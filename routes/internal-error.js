module.exports = function (request, response, error) {
  request.log.error(error)
  response.statusCode = 500
  response.end()
}
