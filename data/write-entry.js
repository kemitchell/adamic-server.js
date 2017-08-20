var writePayload = require('./write-payload')
var appendDigest = require('./append-digest')

module.exports =
function writeEntry (directory, entry, unlock, callback) {
  writePayload(directory, entry, function (error, digest) {
    if (error) return unlock(callback)
    appendDigest(directory, digest, function (error) {
      if (error) {
        unlock(function () {
          callback(error)
        })
      } else {
        unlock(callback)
      }
    })
  })
}
