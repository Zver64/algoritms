# Dynamic Programming

Break problems into overlapping subproblems, solve each once, and store results to avoid recomputation.

**When to use:**
- Problem can be broken into subproblems
- Subproblems overlap (same computation appears multiple times)
- Optimal substructure: optimal solution is built from optimal subproblems

**Two approaches:**
- **Top-down (memoization):** recurse naturally, cache results
- **Bottom-up (tabulation):** fill a table iteratively from base cases

---

## Fibonacci

Classic example — both approaches shown. See `src/algoritms/fibonachi.js`.

```js
// Top-down: O(n) time, O(n) space
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Bottom-up iterative: O(n) time, O(1) space
function fibLoop(n) {
  if (n <= 2) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}

fibMemo(42); // 267914296
fibLoop(42); // 267914296
```

---

## Climbing Stairs (LeetCode 70)

You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?

```js
// dp[i] = dp[i-1] + dp[i-2]  (same recurrence as Fibonacci)
function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) [prev, curr] = [curr, prev + curr];
  return curr;
}

climbStairs(5); // 8
```

**Complexity:** O(n) time, O(1) space

---

## Coin Change (LeetCode 322)

Given coin denominations and a target amount, find the minimum number of coins needed.

```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

coinChange([1, 5, 6, 9], 11); // 2  (5 + 6)
coinChange([2], 3);            // -1
```

**Complexity:** O(amount × coins.length) time, O(amount) space

---

## Longest Common Subsequence (LeetCode 1143)

Find the length of the longest subsequence present in both strings.

```js
function lcs(text1, text2) {
  const m = text1.length, n = text2.length;
  // dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1]
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

lcs('abcde', 'ace'); // 3  ('ace')
lcs('abc', 'abc');   // 3
lcs('abc', 'def');   // 0
```

**Complexity:** O(m×n) time, O(m×n) space

---

## 0/1 Knapsack

Given items with weights and values, maximize value without exceeding capacity.

```js
function knapsack(weights, values, capacity) {
  const n = weights.length;
  // dp[i][w] = max value using first i items with capacity w
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // don't take item i
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}

knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5); // 7  (items 0+1)
```

**Complexity:** O(n × capacity) time, O(n × capacity) space

---

## Longest Increasing Subsequence (LeetCode 300)

```js
// O(n²) DP
function lis(nums) {
  const dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}

lis([10, 9, 2, 5, 3, 7, 101, 18]); // 4  ([2,3,7,101])
```

**Complexity:** O(n²) time, O(n) space. Can be reduced to O(n log n) using binary search + patience sorting.

---

## Kadane's Algorithm — Maximum Subarray (LeetCode 53)

Find the contiguous subarray with the largest sum.

```js
function maxSubArray(nums) {
  let maxSum = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]); // extend or restart
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6  ([4,-1,2,1])
```

**Complexity:** O(n) time, O(1) space

---

## DP Decision Framework

```
1. Define the state clearly: dp[i], dp[i][j], etc.
2. Write the recurrence relation
3. Identify base cases
4. Decide order of computation (top-down or bottom-up)
5. Optimize space if dp table has only local dependencies
```

| Problem Type | State | Recurrence |
|---|---|---|
| Fibonacci / stairs | dp[i] | dp[i-1] + dp[i-2] |
| Coin change | dp[amount] | min(dp[a - coin] + 1) |
| Knapsack | dp[i][w] | max(skip, take) |
| LCS | dp[i][j] | match: dp[i-1][j-1]+1, else max |
| Max subarray | current | max(num, current+num) |
