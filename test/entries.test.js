var http = require('http')
var parseJSON = require('json-parse-errback')
var server = require('./server')
var simpleConcat = require('simple-concat')
var tape = require('tape')

tape.skip('GET /logs/{key}/entries/{digest}', function (t) {
  server(function (port, directory, done) {
    http.get({port: port, path: '/log'})
      .once('error', onHTTPError)
      .once('response', function (response) {
        t.equal(response.statusCode, 200, '/log 200')
        simpleConcat(response, function (error, buffer) {
          t.error(error, 'no body error')
          var digest = buffer.toString().trim()
          t.assert(/^[0-9a-f]{64}$/.test(digest), 'digest')
          http.get({port: port, path: '/entries/' + digest})
            .once('error', onHTTPError, '/entries/{digest} no error')
            .once('response', function (response) {
              t.equal(response.statusCode, 200, '/entries/{digest} 200')
              t.equal(
                response.headers['content-type'], 'application/json',
                'JSON'
              )
              simpleConcat(response, function (error, buffer) {
                t.error(error, 'no body error')
                parseJSON(buffer, function (error, parsed) {
                  t.error(error, 'valid JSON')
                  t.assert(
                    parsed.hasOwnProperty('signature'),
                    'has signature'
                  )
                  t.assert(
                    parsed.hasOwnProperty('payload'),
                    'has payload'
                  )
                  t.equal(
                    typeof parsed.payload, 'object',
                    'object payload'
                  )
                  t.equal(
                    parsed.payload.type, 'announce',
                    'announce payload'
                  )
                  t.assert(
                    /^[0-9a-f]{64}$/.test(parsed.payload.public),
                    'public key'
                  )
                  finish()
                })
              })
            })
        })
      })

    function onHTTPError (error) {
      t.error(error, 'no HTTP error')
      finish()
    }

    function finish () {
      t.end()
      done()
    }
  })
})
