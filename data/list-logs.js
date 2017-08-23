var fs = require('fs')
var isDigest = require('../data/is-digest')
var logsPath = require('./paths/logs')

module.exports = function listLogs (directory, callback) {
  fs.readdir(logsPath(directory), function (error, entries) {
    if (error) {
      if (error.code === 'ENOENT') {
        callback(null, [])
      } else {
        callback(error)
      }
    } else {
      callback(null, entries.filter(isDigest))
    }
  })
}
