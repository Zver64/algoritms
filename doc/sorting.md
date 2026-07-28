# Sorting Algorithms

## Bubble Sort

Repeatedly swaps adjacent elements that are out of order. Each pass bubbles the largest unsorted element to its correct position.

**Complexity**
| | Time | Space |
|---|---|---|
| Best | O(n) — already sorted | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

**Use cases:** Educational purposes only. Too slow for production use.

```js
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted — O(n) best case
  }
  return arr;
}

bubbleSort([5, 3, 8, 1, 2]); // [1, 2, 3, 5, 8]
```

---

## Selection Sort

Finds the minimum element in the unsorted portion and swaps it into position. Makes exactly n-1 swaps — good when writes are expensive.

**Complexity**
| | Time | Space |
|---|---|---|
| Best | O(n²) | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

**Use cases:** When memory writes are costly (e.g., flash storage). Not stable.

```js
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}

selectionSort([5, 3, 8, 1, 2]); // [1, 2, 3, 5, 8]
```

---

## Insertion Sort

Builds the sorted array one element at a time by inserting each new element into its correct position.

**Complexity**
| | Time | Space |
|---|---|---|
| Best | O(n) — nearly sorted | O(1) |
| Average | O(n²) | O(1) |
| Worst | O(n²) | O(1) |

**Use cases:** Small arrays, nearly-sorted data, online sorting (elements arrive one at a time). Used internally by Timsort for small runs.

```js
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

insertionSort([5, 3, 8, 1, 2]); // [1, 2, 3, 5, 8]
```

---

## Merge Sort

Divide-and-conquer: split the array in half recursively, then merge the sorted halves. Stable sort.

**Complexity**
| | Time | Space |
|---|---|---|
| Best | O(n log n) | O(n) |
| Average | O(n log n) | O(n) |
| Worst | O(n log n) | O(n) |

**Use cases:** When stability is required, linked lists, external sorting (data doesn't fit in memory), guaranteed O(n log n).

```js
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

mergeSort([5, 3, 8, 1, 2]); // [1, 2, 3, 5, 8]
```

---

## Quick Sort

Divide-and-conquer: pick a pivot, partition elements around it, recurse on each side. In-place but not stable.

**Complexity**
| | Time | Space |
|---|---|---|
| Best | O(n log n) | O(log n) |
| Average | O(n log n) | O(log n) |
| Worst | O(n²) — sorted input with bad pivot | O(n) |

**Use cases:** General-purpose sorting, cache-friendly (in-place), fastest in practice for random data. `Array.prototype.sort` in V8 uses Timsort (merge sort + insertion sort).

```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // last element as pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

quickSort([5, 3, 8, 1, 2]); // [1, 2, 3, 5, 8]
```

**Tip — avoid worst case:** Use a random pivot or median-of-three to prevent O(n²) on sorted input.

```js
// Random pivot variant
function randomPivotPartition(arr, low, high) {
  const randomIdx = low + Math.floor(Math.random() * (high - low + 1));
  [arr[randomIdx], arr[high]] = [arr[high], arr[randomIdx]];
  return partition(arr, low, high);
}
```

---

## Choosing a Sorting Algorithm

```
Need stability? → Merge Sort
Small or nearly-sorted? → Insertion Sort
General purpose, in-place? → Quick Sort (random pivot)
Guaranteed O(n log n)? → Merge Sort
Minimal writes? → Selection Sort
```
