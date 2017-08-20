var routes = module.exports = require('http-hash')()
var NAME = require('../package.json').name
var VERSION = require('../package.json').version

routes.set('/', function root (request, response, directory) {
  response.end(JSON.stringify({
    service: NAME || null,
    version: VERSION || null
  }))
})
