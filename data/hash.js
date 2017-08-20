var crypto = require('crypto')

module.exports = function hash (input) {
  return crypto.createHash('sha256')
    .update(input)
    .digest()
    .toString('hex')
}
