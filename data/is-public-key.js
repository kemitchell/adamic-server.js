var RE = new RegExp('^' + require('../data/patterns/public-key') + '$')

module.exports = function isPublicKey (string) {
  return RE.test(string)
}
