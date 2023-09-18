// function square(x = 0) {
//   return x ** 2
// }

// function multiply(x = 0) {
//   return x * 2
// }

// function sum(x = 0) {
//   return x + x
// }

// const first = 3

// console.log("test: ", sum(multiply(square(first))))

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

const test = curry(sumThree)

console.log("test: ", test(2)(2)(2))

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

console.log("test2: ", curryCheck(sumThree)(2)(2)(2))
