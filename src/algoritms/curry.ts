import assert = require('assert')

function sumThree(a, b, c) {
  return a + b + c
}

function curry(cb) {
  let allArgs = []

  return function curried(...args) {
    allArgs = allArgs.concat(args)
    if (allArgs.length >= cb.length) {
      return cb(...allArgs)
    }
    return curried
  }
}

assert.strictEqual(curry(sumThree)(2)(2)(2), sumThree(2, 2, 2))

function curryCheck(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2))
    }
  }
}
assert.strictEqual(curryCheck(sumThree)(2)(2)(2), sumThree(2, 2, 2))
