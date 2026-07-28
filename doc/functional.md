# Functional Programming Patterns

Higher-order functions and functional composition patterns — commonly tested in frontend/JS interviews.

---

## Curry

Transforms a function with multiple arguments into a chain of functions, each taking one (or more) arguments.

See `src/algoritms/curry.js` for multiple implementations.

```js
// Clean implementation
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function (...rest) {
      return curried(...args, ...rest);
    };
  };
}

function add(a, b, c) { return a + b + c; }

const curriedAdd = curry(add);
curriedAdd(1)(2)(3);   // 6
curriedAdd(1, 2)(3);   // 6
curriedAdd(1)(2, 3);   // 6
curriedAdd(1, 2, 3);   // 6
```

**Use cases:**
- Partial application (pre-fill some arguments)
- Point-free function composition
- Reusable parameterized functions (e.g., `const double = multiply(2)`)

**Complexity:** O(1) per call, O(n) total where n = arity

---

## Partial Application

Fix some arguments upfront, return a function waiting for the rest.

```js
function partial(fn, ...presetArgs) {
  return function (...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const multiply = (a, b) => a * b;
const double = partial(multiply, 2);
const triple = partial(multiply, 3);

double(5); // 10
triple(5); // 15
```

---

## Compose

Combine functions right-to-left: `compose(f, g, h)(x)` → `f(g(h(x)))`.

See `src/algoritms/compose.js`.

```js
function compose(...fns) {
  return function (...inputs) {
    return fns.reduceRight((acc, fn) => [fn(...(Array.isArray(acc) ? acc : [acc]))], inputs)[0];
  };
}

// Simplified for single-argument functions
function composeSimple(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const add2 = (x) => x + 2;
const double = (x) => x * 2;
const square = (x) => x * x;

composeSimple(add2, double, square)(3); // add2(double(square(3))) = add2(double(9)) = add2(18) = 20
```

---

## Pipe

Same as compose but left-to-right: `pipe(f, g, h)(x)` → `h(g(f(x)))`.

```js
function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

pipe(square, double, add2)(3); // add2(double(square(3))) = 20 (same result, different order)
pipe(add2, double, square)(3); // square(double(add2(3))) = square(double(5)) = square(10) = 100
```

**Use cases:**
- Data transformation pipelines
- Middleware chains
- Redux-style reducers

---

## Memoize

Cache the results of expensive function calls.

```js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFn = memoize((n) => {
  // simulate heavy computation
  return n * n;
});

expensiveFn(5); // computed: 25
expensiveFn(5); // cached: 25
```

**Complexity:** O(1) cache hit, original complexity on miss

### Memoize with TTL and FIFO eviction

Each entry expires after `ttl` ms. When the cache is full, the oldest inserted key is removed first — `Map` preserves insertion order so the first key from `.keys()` is always the oldest.

```js
function memoizeWithTTL(fn, ttl, maxSize = 100) {
  const cache = new Map(); // insertion order preserved → first key = oldest

  return function (...args) {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const entry = cache.get(key);
      if (now < entry.expiresAt) return entry.value; // valid hit
      cache.delete(key); // expired — treat as miss
    }

    // evict oldest entry when at capacity
    if (cache.size >= maxSize) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    const value = fn.apply(this, args);
    cache.set(key, { value, expiresAt: now + ttl });
    return value;
  };
}

const cachedFn = memoizeWithTTL((n) => n * n, 5000, 3); // 5s TTL, max 3 entries

cachedFn(2); // computed: 4   cache: {2}
cachedFn(3); // computed: 9   cache: {2, 3}
cachedFn(4); // computed: 16  cache: {2, 3, 4}
cachedFn(5); // computed: 25  cache: {3, 4, 5}  ← 2 evicted (oldest)
cachedFn(3); // cached: 9     (still valid)
// ...5 seconds later...
cachedFn(3); // computed: 9   (TTL expired, recomputed)
```

**Key decisions:**
- **FIFO eviction:** `Map` insertion order makes `cache.keys().next().value` always the oldest key — O(1) to find it
- **Lazy TTL check:** entries are only validated on access, no background timer needed
- **Re-insertion on update:** deleting and re-setting a key moves it to the end of insertion order, keeping eviction order correct

**Complexity:** O(1) hit, O(1) eviction, O(fn) on miss

---

## Once

Returns a function that can only be called once. Subsequent calls return the first result.

```js
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const init = once(() => { console.log('initialized'); return 42; });
init(); // logs 'initialized', returns 42
init(); // returns 42 (no log)
```

---

## Throttle

Ensures a function is called at most once in a given time window.

```js
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

const throttledScroll = throttle(() => console.log('scroll'), 200);
// Only fires every 200ms regardless of how often it's called
```

---

## Debounce

Delays execution until after a quiet period ends. Resets the timer on each call.

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debounceSearch = debounce((query) => console.log('search:', query), 300);
// Only fires 300ms after the last keystroke
```

**throttle vs debounce:**
- **throttle:** fire periodically while event continues (scroll, resize)
- **debounce:** fire once after event stops (search input, window resize end)

---

## Flatten / Deep Map

```js
// flatMap — map then flatten one level
[1, 2, 3].flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

// Custom deep flatten
const deepFlatten = (arr) =>
  arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? deepFlatten(val) : val), []);

deepFlatten([1, [2, [3, [4]]]]); // [1, 2, 3, 4]
// Or: [1, [2, [3, [4]]]].flat(Infinity)
```

---

## Complexity Summary

| Pattern | Time | Space |
|---|---|---|
| curry | O(1) per call | O(n) closures |
| compose / pipe | O(k) — k = number of fns | O(k) |
| memoize (hit) | O(1) | O(cache size) |
| memoize (miss) | O(fn complexity) | O(cache size) |
| once | O(1) | O(1) |
| throttle | O(1) | O(1) |
| debounce | O(1) | O(1) |
