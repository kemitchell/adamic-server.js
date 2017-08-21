var crypto = require('crypto')

module.exports = function announce (publicKey) {
  return {
    type: 'announce',
    nonce: crypto.randomBytes(32).toString('hex'),
    publicKey: publicKey.toString('hex')
  }
}
