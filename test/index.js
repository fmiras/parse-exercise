const test = require('ava')
const parse = require('../')

test('Parse float number', t => {
  const sNumber = '123.4'
  const { value } = parse(sNumber)
  t.is(value, 123.4)
})

test('Parse integer number', t => {
  const sNumber = '1'
  const { value } = parse(sNumber)
  t.is(value, 1)
})

test('Parse true value', t => {
  const sBoolean = 'true'
  const { value } = parse(sBoolean)
  t.true(value)
})

test('Parse false value', t => {
  const sBoolean = 'false'
  const { value } = parse(sBoolean)
  t.false(value)
})

test('Parse null value', t => {
  const sNull = 'null'
  const { value } = parse(sNull)
  t.is(value, null)
})

test('Parse empty array', t => {
  const sArray = '[]'
  const { value } = parse(sArray)
  t.deepEqual(value, [])
})

test('Parse 1-length array', t => {
  const sArray = '[true]'
  const { value } = parse(sArray)
  t.deepEqual(value, [true])
})

test('Parse normal array', t => {
  const sArray = '[true,2]'
  const { value } = parse(sArray)
  t.deepEqual(value, [true, 2])
})

test('Parse array with a second order array', t => {
  const sArray = '[true,2,[1,2]]'
  const { value } = parse(sArray)
  t.deepEqual(value, [true, 2, [1, 2]])
})

test('Parse an invalid expression', t => {
  const sArray = '[true'
  const thrower = () => parse(sArray)
  t.throws(thrower)
})
