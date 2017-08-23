var crypto = require('crypto')
var ed25519 = require('ed25519')

module.exports = function generateKeys () {
  var seed = crypto.randomBytes(32)
  var keypair = ed25519.MakeKeypair(seed)
  return {
    publicKey: keypair.publicKey,
    privateKey: keypair.privateKey
  }
}
