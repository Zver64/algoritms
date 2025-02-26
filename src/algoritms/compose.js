import assert from 'assert';

export function compose(...fns) {
  return function (...inputs) {
    return fns.reduceRight((acc, currFn) => {
      return [currFn(...acc)];
    }, inputs)[0];
  };
}

const summ = (a, b) => a + b;
const multiply = (x) => x * 2;
const add = (x) => x + 2;

assert.strictEqual(compose(add, multiply, summ)(2, 1), 8);
