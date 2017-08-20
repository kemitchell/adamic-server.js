var AJV = require('ajv')
var crypto = require('crypto')
var tape = require('tape')

var constructor = require('../data/payloads/announce')
var schema = require('../data/payloads/schemas/announce')

tape.test('annouce', function (t) {
  t.test('constructor', function (t) {
    var ajv = new AJV()
    ajv.validate(schema, constructor(crypto.randomBytes(32)))
    t.equal(
      ajv.errors, null,
      'creates a valid object'
    )
    t.end()
  })
})
