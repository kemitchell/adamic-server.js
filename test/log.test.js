var http = require('http')
var server = require('./server')
var simpleConcat = require('simple-concat')
var tape = require('tape')

tape('GET /', function (t) {
  server(function (port, directory, done) {
    http.request({
      port: port,
      path: '/log'
    })
      .once('response', function (response) {
        t.equal(response.statusCode, 200)
        simpleConcat(response, function (error, buffer) {
          t.error(error, 'no error')
          if (!error) {
            t.assert(
              buffer.toString().match(/^[0-9a-f]{64}\n$/),
              'one digest'
            )
          }
          t.end()
          done()
        })
      })
      .once('error', function (error) {
        t.fail(error, 'no error')
        t.end()
        done()
      })
      .end()
  })
})
