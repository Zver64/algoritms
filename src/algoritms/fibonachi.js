import assert from 'assert'

export function getFibExp(n = 1) {
  if (n <= 2) {
    return 1
  }
  return getFibExp(n - 1) + getFibExp(n - 2)
}

export function getFibMem(n = 1, memo = {}) {
  if (n in memo) {
    return memo[n]
  }
  if (n <= 2) {
    return 1
  }
  memo[n] = getFibMem(n - 1, memo) + getFibMem(n - 2, memo)
  return memo[n]
}

export function getFibLoop(n = 1) {
  if(n <= 2) {
    return 1;
  }

  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

assert.strictEqual(getFibMem(42), 267914296)
assert.strictEqual(getFibExp(42), 267914296)
assert.strictEqual(getFibLoop(42), 267914296)
