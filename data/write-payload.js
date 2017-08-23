var ecb = require('ecb')
var fs = require('fs')
var hash = require('./hash')
var path = require('path')
var path = require('path')
var runSeries = require('run-series')
var stringify = require('json-stable-stringify')

module.exports = function writeEntry (directory, entry, callback) {
  var json = stringify(entry)
  var digest = hash(json)
  var file = path.join(directory, digest)
  runSeries([
    function (done) {
      mkdirp(path.dirname(file), done)
    },
    function (done) {
      fs.writeFile(file, json, done)
    }
  ], function (error) {
    if (error) {
      callback(error)
    } else {
      callback(null, digest)
    }
  })
}
