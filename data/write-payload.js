var ecb = require('ecb')
var encode = require('./encode')
var fs = require('fs')
var hash = require('./hash')
var path = require('path')
var stringify = require('json-stable-stringify')

module.exports = function writeEntry (directory, entry, callback) {
  var json = stringify(entry)
  var digest = encode(hash(json))
  var file = path.join(directory, digest)
  fs.writeFile(file, json, ecb(callback, function () {
    callback(null, digest)
  }))
}
