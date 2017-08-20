var routes = module.exports = require('http-hash')()
var VERSION = require('../package.json').version
var fs = require('fs')

routes.set('/', function root (request, response, directory) {
  response.end(JSON.stringify({
    service: 'adamic',
    version: VERSION || null
  }))
})

routes.set('/log', require('./log'))
