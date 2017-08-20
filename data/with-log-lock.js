var ecb = require('ecb')
var lockfile = require('lockfile')
var logPath = require('./paths/log')

module.exports = function (directory, callback) {
  var logFile = logPath(directory)
  var lock = logFile + '.lock'
  lockfile.lock(lock, ecb(callback, function () {
    callback(null, function (callback) {
      lockfile.unlock(lock, callback)
    })
  }))
}
