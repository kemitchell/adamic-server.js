var http = require('http')
var runSeries = require('run-series')
var server = require('./server')
var simpleConcat = require('simple-concat')
var tape = require('tape')

function putPassword (t, port, oldPassword, newPassword, done) {
  http.request({
    method: 'PUT',
    port: port,
    path: '/password',
    auth: 'user:' + oldPassword
  })
    .once('response', function (response) {
      t.equal(response.statusCode, 204)
      done()
    })
    .once('error', done)
    .end(newPassword)
}

tape('PUT /password first time', function (t) {
  server(function (port, directory, done) {
    putPassword(t, port, '', 'apple', function (error) {
      t.error(error, 'no error')
      t.end()
      done()
    })
  })
})

tape('PUT /password w/ invalid authorization', function (t) {
  server(function (port, directory, done) {
    runSeries([
      function putInitialPassword (done) {
        putPassword(t, port, '', 'apple', done)
      },
      function putAgain (done) {
        http.request({
          method: 'PUT',
          port: port,
          path: '/password',
          auth: 'user:orange'
        })
          .once('response', function (response) {
            t.equal(response.statusCode, 401)
            done()
          })
          .once('error', done)
          .end('banana')
      }
    ], function (error) {
      t.error(error, 'no error')
      t.end()
      done()
    })
  })
})

tape('PUT /password w/ valid authorization', function (t) {
  server(function (port, directory, done) {
    runSeries([
      function putInitialPassword (done) {
        putPassword(t, port, '', 'apple', done)
      },
      function putAgain (done) {
        http.request({
          method: 'PUT',
          port: port,
          path: '/password',
          auth: 'user:apple'
        })
          .once('response', function (response) {
            t.equal(response.statusCode, 204)
            done()
          })
          .once('error', done)
          .end('orange')
      }
    ], function (error) {
      t.error(error, 'no error')
      t.end()
      done()
    })
  })
})
