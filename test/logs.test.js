var ecb = require('ecb')
var http = require('http')
var server = require('./server')
var simpleConcat = require('simple-concat')
var tape = require('tape')

tape('GET /logs', function (t) {
  server(function (port, directory, close) {
    http.get({
      port: port,
      path: '/logs'
    })
      .once('error', done)
      .once('response', function (response) {
        t.equal(response.statusCode, 200)
        done()
      })
    function done (error) {
      t.error(error, 'no error')
      t.end()
      close()
    }
  })
})
