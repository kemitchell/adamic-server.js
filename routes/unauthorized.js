module.exports = function unauthorized (request, response) {
  response.statusCode = 401
  response.setHeader('WWW-Authenticate', 'Basic realm="adamic"')
  response.end()
}
