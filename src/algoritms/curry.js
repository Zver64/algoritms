import assert from 'assert';

function sumThree(a, b, c) {
  return a + b + c;
}

function curry(cb) {
  const allArgs = [];

  return function curried(...args) {
    allArgs.push(...args);
    if (allArgs.length >= cb.length) {
      return cb(...allArgs);
    }
    return curried;
  };
}

function curry2(cb) {
  return function curried(...args) {
    if (args.length >= cb.length) {
      return cb(...args);
    } else {
      return function (...rest) {
        return curried(...args, ...rest);
      };
    }
  };
}

assert.strictEqual(curry(sumThree)(2)(2)(2), sumThree(2, 2, 2));
assert.strictEqual(curry2(sumThree)(2)(2)(2), sumThree(2, 2, 2));

function curryCheck(cb) {
  return function curried(...args) {
    if (args.length >= cb.length) {
      return cb.apply(this, args);
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}
assert.strictEqual(curryCheck(sumThree)(2)(2)(2), sumThree(2, 2, 2));
