var fs = require('fs')
var logPath = require('./paths/log')
var mkdirp = require('mkdirp')
var path = require('path')
var runSeries = require('run-series')

module.exports =
function appendDigest (directory, publicKey, digest, callback) {
  var file = logPath(directory, publicKey)
  var line = digest.toString('hex') + '\n'
  runSeries([
    mkdirp.bind(null, path.dirname(file)),
    fs.appendFile.bind(fs, file, line)
  ], callback)
}
