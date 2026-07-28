# Stack & Queue

## Stack

LIFO — Last In, First Out. Use an array: `push()` and `pop()` are O(1).

**Use cases:** balanced brackets, undo/redo, function call management, DFS iteratively, monotonic stack problems.

```js
// JS array as stack
const stack = [];
stack.push(1); // [1]
stack.push(2); // [1, 2]
stack.pop();   // 2  →  stack: [1]
stack.at(-1);  // peek: 1
```

---

### Balanced Brackets

Check that every opening bracket has a matching closing bracket in correct order. See `src/algoritms/stack/brackets.js`.

```js
function checkBrackets(str) {
  const map = { '}': '{', ']': '[', ')': '(' };
  const opens = new Set(Object.values(map));
  const stack = [];

  for (const ch of str) {
    if (opens.has(ch)) {
      stack.push(ch);
    } else if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    }
  }
  return stack.length === 0;
}

checkBrackets('((){})');   // true
checkBrackets('[()(df)]'); // true
checkBrackets('(()())()('); // false
```

**Complexity:** O(n) time, O(n) space

---

### Monotonic Stack — Next Greater Element

Find the next greater element to the right for each element.

```js
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack.at(-1)] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}

nextGreaterElement([2, 1, 2, 4, 3]); // [4, 2, 4, -1, -1]
```

**Complexity:** O(n) time, O(n) space

**Variants:** Next smaller element (flip comparison), Previous greater element (iterate right to left).

---

### Largest Rectangle in Histogram (LeetCode 84)

```js
function largestRectangle(heights) {
  const stack = []; // indices of bars with increasing height
  let max = 0;
  heights = [...heights, 0]; // sentinel to flush remaining stack

  for (let i = 0; i < heights.length; i++) {
    while (stack.length && heights[stack.at(-1)] > heights[i]) {
      const h = heights[stack.pop()];
      const w = stack.length ? i - stack.at(-1) - 1 : i;
      max = Math.max(max, h * w);
    }
    stack.push(i);
  }
  return max;
}

largestRectangle([2, 1, 5, 6, 2, 3]); // 10
```

**Complexity:** O(n) time, O(n) space

---

### Min Stack (LeetCode 155)

Stack that supports push, pop, top, and getMin in O(1).

```js
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // tracks current minimum
  }
  push(val) {
    this.stack.push(val);
    const min = Math.min(val, this.minStack.at(-1) ?? Infinity);
    this.minStack.push(min);
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() { return this.stack.at(-1); }
  getMin() { return this.minStack.at(-1); }
}
```

---

## Queue

FIFO — First In, First Out. JS arrays work but `shift()` is O(n). For O(1) dequeue, use a pointer-based approach or a linked list.

**Use cases:** BFS, task scheduling, sliding window maximum.

```js
// Simple queue with array (shift is O(n) — fine for interviews)
const queue = [];
queue.push(1);    // enqueue
queue.push(2);
queue.shift();    // dequeue: 1
queue[0];         // peek: 2
```

```js
// O(1) queue using two pointers
class Queue {
  constructor() {
    this.data = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(val) { this.data[this.tail++] = val; }
  dequeue() {
    if (this.isEmpty()) return undefined;
    const val = this.data[this.head];
    delete this.data[this.head++];
    return val;
  }
  peek() { return this.data[this.head]; }
  isEmpty() { return this.head === this.tail; }
  size() { return this.tail - this.head; }
}
```

---

## Deque (Double-Ended Queue)

Insert and remove from both ends. Used for sliding window maximum.

```js
// Sliding window maximum (LeetCode 239) — O(n)
function maxSlidingWindow(nums, k) {
  const deque = []; // stores indices, front holds index of current max
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // remove indices outside the window
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    // remove indices whose values are smaller than current — they can never be max
    while (deque.length && nums[deque.at(-1)] < nums[i]) deque.pop();

    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3); // [3, 3, 5, 5, 6, 7]
```

**Complexity:** O(n) time, O(k) space

---

## Complexity Summary

| Operation | Array Stack | Array Queue | Pointer Queue |
|---|---|---|---|
| Push / Enqueue | O(1) | O(1) | O(1) |
| Pop / Dequeue | O(1) | O(n) — shift | O(1) |
| Peek | O(1) | O(1) | O(1) |
