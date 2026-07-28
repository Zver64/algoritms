# Two Pointers

Two pointers move toward each other (or in the same direction) to reduce O(n²) brute-force to O(n).

**When to use:**
- Sorted array / string problems
- Pairs, triplets, subarrays with a sum target
- Palindrome / mirror checks
- In-place array manipulation

---

## Pattern 1 — Opposite Ends (sorted array)

```js
// Two Sum II — sorted array, find pair that sums to target
function twoSum(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}

twoSum([1, 2, 4, 6, 8], 10); // [2, 4]  →  4 + 6 = 10
```

**Complexity:** O(n) time, O(1) space

---

## Pattern 2 — Same Direction (fast & slow)

```js
// Remove duplicates in-place from sorted array
function removeDuplicates(arr) {
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1; // new length
}

const arr = [1, 1, 2, 3, 3, 4];
removeDuplicates(arr); // 4  →  arr becomes [1, 2, 3, 4, ...]
```

**Complexity:** O(n) time, O(1) space

---

## Pattern 3 — Three Sum (LeetCode 15)

Sort first, then fix one element and use two-pointer on the rest.

```js
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicates

    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

threeSum([-1, 0, 1, 2, -1, -4]); // [[-1,-1,2],[-1,0,1]]
```

**Complexity:** O(n²) time, O(1) extra space

---

## Pattern 4 — Valid Palindrome

```js
function isPalindrome(s) {
  // normalize: lowercase alphanumeric only
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++; right--;
  }
  return true;
}

isPalindrome('A man, a plan, a canal: Panama'); // true
isPalindrome('race a car');                      // false
```

**Complexity:** O(n) time, O(n) space for cleaned string (can be done O(1) with inline skipping)

---

## Pattern 5 — Container With Most Water (LeetCode 11)

```js
function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;
  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, water);
    // move the shorter side inward — moving the taller side can only reduce width
    if (height[left] < height[right]) left++;
    else right--;
  }
  return max;
}

maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]); // 49
```

**Complexity:** O(n) time, O(1) space

---

## Complexity Summary

| Pattern | Time | Space |
|---|---|---|
| Two sum (sorted) | O(n) | O(1) |
| Remove duplicates | O(n) | O(1) |
| Three sum | O(n²) | O(1) |
| Palindrome check | O(n) | O(1) |
| Container with most water | O(n) | O(1) |
