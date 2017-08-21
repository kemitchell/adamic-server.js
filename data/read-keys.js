var decode = require('./decode')
var fs = require('fs')
var keysPath = require('./paths/keys')

var FORMAT = new RegExp(
  '^' +
  '(' + require('./patterns/public-key') + ')' +
  ',' +
  '(' + require('./patterns/private-key') + ')' +
  '$'
)

module.exports = function readKeys (directory, callback) {
  var file = keysPath(directory)
  fs.readFile(file, 'utf8', function (error, content) {
    if (error) {
      if (error.code === 'ENOENT') callback(null, null)
      else callback(error)
    } else {
      var match = FORMAT.exec(content)
      if (!match) callback(new Error('malformed keys file'))
      else {
        callback(null, {
          publicKey: decode(Buffer.from(match[1])),
          privateKey: decode(Buffer.from(match[2]))
        })
      }
    }
  })
}
