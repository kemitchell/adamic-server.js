var crypto = require('crypto')
var encode = require('../encode')

module.exports = function announce (publicKey) {
  return {
    type: 'announce',
    nonce: encode(crypto.randomBytes(32)),
    publicKey: encode(publicKey)
  }
}
