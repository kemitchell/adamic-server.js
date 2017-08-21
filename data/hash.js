var crypto = require('crypto')
var encode = require('./encode')

module.exports = function hash (input) {
  return encode(
    crypto.createHash('sha256')
      .update(input)
      .digest()
  )
}
