# Recursion

A function that calls itself with a smaller version of the problem until it reaches a base case.

**Three laws of recursion:**
1. Must have a base case
2. Must change state and move toward the base case
3. Must call itself recursively

---

## Anatomy of a Recursive Function

```js
function recursive(input) {
  // 1. Base case — stop condition
  if (baseCondition) return baseValue;

  // 2. Recursive case — reduce the problem
  return recursive(smallerInput);
}
```

---

## Factorial

```js
function factorial(n) {
  if (n <= 1) return 1;       // base case
  return n * factorial(n - 1); // recursive case
}

factorial(5); // 120
```

**Complexity:** O(n) time, O(n) space (call stack)

---

## Power

```js
// Naive: O(n)
function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}

// Fast exponentiation: O(log n)
function fastPower(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) {
    const half = fastPower(base, exp / 2);
    return half * half;
  }
  return base * fastPower(base, exp - 1);
}

fastPower(2, 10); // 1024
```

---

## Flatten Nested Array

```js
function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item)); // recurse on nested array
    } else {
      result.push(item);
    }
  }
  return result;
}

flatten([1, [2, [3, [4]], 5]]); // [1, 2, 3, 4, 5]
```

---

## Generate All Subsets (Power Set)

```js
function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop(); // undo — backtracking
    }
  }

  backtrack(0, []);
  return result;
}

subsets([1, 2, 3]);
// [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

**Complexity:** O(2ⁿ) time and space

---

## Permutations

```js
function permutations(nums) {
  const result = [];

  function backtrack(current, remaining) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
      current.pop();
    }
  }

  backtrack([], nums);
  return result;
}

permutations([1, 2, 3]);
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Complexity:** O(n!) time, O(n) space (call stack)

---

## Backtracking Template

```js
function backtrack(state, choices) {
  if (isSolution(state)) {
    saveSolution(state);
    return;
  }
  for (const choice of choices) {
    if (isValid(choice, state)) {
      makeChoice(state, choice);
      backtrack(state, nextChoices(choices, choice));
      undoChoice(state, choice); // backtrack
    }
  }
}
```

**Use cases:**
- Generating combinations, permutations, subsets
- Sudoku, N-Queens, word search
- Path finding with constraints

---

## Tail Recursion (optimization note)

JS engines do not guarantee tail call optimization (TCO), even though ES6 specifies it. In practice, convert deep recursion to iteration or use trampolining.

```js
// Trampolining — avoids stack overflow for deep recursion
function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);
    while (typeof result === 'function') result = result();
    return result;
  };
}

function factTail(n, acc = 1) {
  if (n <= 1) return acc;
  return () => factTail(n - 1, n * acc); // return thunk instead of calling directly
}

const factorial = trampoline(factTail);
factorial(10000); // no stack overflow
```
