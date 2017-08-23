var SHA256 = new RegExp('^' + require('../data/patterns/digest') + '$')

module.exports = function isDigest (string) {
  return SHA256.test(string)
}
