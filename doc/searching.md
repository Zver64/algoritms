# Searching Algorithms

## Linear Search

Scan every element one by one until found.

**Complexity:** O(n) time, O(1) space

**Use cases:** Unsorted arrays, small arrays, linked lists.

```js
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

linearSearch([3, 1, 4, 1, 5], 4); // 2
linearSearch([3, 1, 4, 1, 5], 9); // -1
```

---

## Binary Search

Eliminates half the search space each step. **Requires a sorted array.**

**Complexity:** O(log n) time, O(1) space (iterative) / O(log n) space (recursive)

**Use cases:** Sorted arrays, searching in answer space ("find minimum k such that..."), rotated arrays.

```js
// Iterative — see src/algoritms/binarySearch.ts
function binarySearch(sortedArr, target) {
  let start = 0;
  let end = sortedArr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) start = mid + 1;
    else end = mid - 1;
  }
  return -1;
}

binarySearch([1, 3, 5, 7, 9, 11], 7); // 3
binarySearch([1, 3, 5, 7, 9, 11], 6); // -1
```

```js
// Recursive variant
function binarySearchRecursive(arr, target, start = 0, end = arr.length - 1) {
  if (start > end) return -1;
  const mid = Math.floor((start + end) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, end);
  return binarySearchRecursive(arr, target, start, mid - 1);
}
```

### Common Binary Search Variants

**Find leftmost occurrence**

```js
function searchFirst(arr, target) {
  let result = -1, lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) { result = mid; hi = mid - 1; } // keep going left
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return result;
}
```

**Search in rotated sorted array** (LeetCode 33)

```js
function searchRotated(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    // left half is sorted
    if (arr[lo] <= arr[mid]) {
      if (arr[lo] <= target && target < arr[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // right half is sorted
      if (arr[mid] < target && target <= arr[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
```

**Binary search on answer space** — find the minimum valid value

```js
// Template: find smallest k where condition(k) is true
function binarySearchAnswer(lo, hi, condition) {
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (condition(mid)) hi = mid;  // try smaller
    else lo = mid + 1;
  }
  return lo;
}

// Example: find sqrt(n) floored
const sqrtFloor = (n) => binarySearchAnswer(1, n, (k) => k * k > n) - 1;
sqrtFloor(16); // 4
sqrtFloor(17); // 4
```

---

## When to Use Binary Search

- Array is sorted (or can be sorted)
- Finding an element, boundary, or optimal value in a monotonic range
- "Minimum/maximum that satisfies condition" problems
- Searching in implicit sorted spaces (square roots, capacities, days)
