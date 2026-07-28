# Sliding Window

A window (subarray/substring) that slides over the input, expanding or shrinking to maintain a constraint. Turns O(n²) nested loops into O(n).

**When to use:**
- Contiguous subarray or substring problems
- "Longest / shortest / exactly k" window that satisfies a condition
- Running sum, running product, character frequency

---

## Fixed-Size Window

Window size is constant (k). Slide by removing the leftmost element and adding the next one.

```js
// Maximum sum of subarray of size k
function maxSumFixed(arr, k) {
  let windowSum = 0;
  // build first window
  for (let i = 0; i < k; i++) windowSum += arr[i];

  let max = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // slide
    max = Math.max(max, windowSum);
  }
  return max;
}

maxSumFixed([2, 1, 5, 1, 3, 2], 3); // 9  (5+1+3)
```

**Complexity:** O(n) time, O(1) space

---

## Variable-Size Window (expand / shrink)

Expand the right pointer freely; shrink the left pointer when the constraint is violated.

```js
// Longest substring without repeating characters
// see src/algoritms/slidingWindow/longestSubstring.js
function lengthOfLongestSubstring(s) {
  let start = 0, max = 0;
  const charMap = new Map(); // char → last seen index

  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1; // jump start past duplicate
    }
    charMap.set(char, end);
    max = Math.max(max, end - start + 1);
  }
  return max;
}

lengthOfLongestSubstring('abcabcbb'); // 3
lengthOfLongestSubstring('pwwkew');   // 3
```

**Complexity:** O(n) time, O(min(n, alphabet)) space

---

## Variable-Size Window with Frequency Map

```js
// Longest substring with at most k distinct characters
function longestWithKDistinct(s, k) {
  const freq = new Map();
  let start = 0, max = 0;

  for (let end = 0; end < s.length; end++) {
    freq.set(s[end], (freq.get(s[end]) || 0) + 1);

    while (freq.size > k) {
      const leftChar = s[start];
      freq.set(leftChar, freq.get(leftChar) - 1);
      if (freq.get(leftChar) === 0) freq.delete(leftChar);
      start++;
    }

    max = Math.max(max, end - start + 1);
  }
  return max;
}

longestWithKDistinct('araaci', 2); // 4  ('araa')
longestWithKDistinct('araaci', 1); // 2  ('aa')
```

---

## Minimum Window Substring (LeetCode 76)

Find the smallest window in `s` that contains all characters of `t`.

```js
function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);

  let have = 0, required = need.size;
  let start = 0, minLen = Infinity, minStart = 0;
  const window = new Map();

  for (let end = 0; end < s.length; end++) {
    const c = s[end];
    window.set(c, (window.get(c) || 0) + 1);

    if (need.has(c) && window.get(c) === need.get(c)) have++;

    while (have === required) {
      if (end - start + 1 < minLen) {
        minLen = end - start + 1;
        minStart = start;
      }
      const leftChar = s[start];
      window.set(leftChar, window.get(leftChar) - 1);
      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) have--;
      start++;
    }
  }
  return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
}

minWindow('ADOBECODEBANC', 'ABC'); // 'BANC'
```

**Complexity:** O(n + m) time, O(m) space (m = |t|)

---

## Template

```js
function slidingWindow(arr) {
  let left = 0;
  let result = 0;
  // any state you need (sum, map, count, ...)

  for (let right = 0; right < arr.length; right++) {
    // 1. expand: add arr[right] to window state

    // 2. shrink: while constraint is violated
    while (/* constraint violated */) {
      // remove arr[left] from window state
      left++;
    }

    // 3. update result with current valid window
    result = Math.max(result, right - left + 1);
  }
  return result;
}
```

---

## Complexity Summary

| Problem | Time | Space |
|---|---|---|
| Max sum fixed window | O(n) | O(1) |
| Longest without repeats | O(n) | O(k) |
| Longest k distinct | O(n) | O(k) |
| Minimum window substring | O(n + m) | O(m) |
