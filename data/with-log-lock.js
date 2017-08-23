var ecb = require('ecb')
var lockfile = require('lockfile')
var logPath = require('./paths/log')
var lock = require('./lock')

module.exports = function (directory, publicKey, callback) {
  lock(publicKey, callback)
}
