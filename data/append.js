var ecb = require('ecb')
var flushWriteStream = require('flush-write-stream')
var fs = require('fs')
var logPath = require('./paths/log')
var pump = require('pump')
var signature = require('./signature')
var split2 = require('split2')
var withLogLock = require('./with-log-lock')
var writeEntry = require('./write-entry')

module.exports = function append (directory, payload, callback) {
  withLogLock(directory, ecb(callback, function (unlock) {
    var lastDigest
    pump(
      fs.createReadStream(logPath(directory)),
      split2('\n'),
      flushWriteStream.obj(function (line, _, done) {
        lastDigest = line
        done()
      }),
      function (error) {
        if (error) {
          callback(error)
          unlock(function () {
            // TODO: report unlock error
          })
        } else {
          var entry = {
            prior: lastDigest,
            payload: payload,
            signature: signature(payload, keys).toString('hex')
          }
          writeEntry(directory, entry, unlock, callback)
        }
      }
    )
  }))
}
