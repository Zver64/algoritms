// https://leetcode.com/problems/median-of-two-sorted-arrays/

import assert from 'assert';

/* 
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
*/

/**
 * The first approach is O(m + n)
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArraysUnoptimised = function (nums1, nums2) {
  let num1Idx = 0;
  let num2Idx = 0;

  const merged = [];

  while (num1Idx < nums1.length && num2Idx < nums2.length) {
    if (nums1[num1Idx] < nums2[num2Idx]) {
      merged.push(nums1[num1Idx++]);
    } else {
      merged.push(nums2[num2Idx++]);
    }
  }

  if (num1Idx < nums1.length) {
    for (let i = num1Idx; i < nums1.length; i++) {
      merged.push(nums1[i]);
    }
  }

  if (num2Idx < nums2.length) {
    for (let i = num2Idx; i < nums2.length; i++) {
      merged.push(nums2[i]);
    }
  }

  if (merged.length % 2 === 0) {
    const start = merged.length / 2 - 1;
    return (merged[start] + merged[start + 1]) / 2;
  } else {
    const start = Math.floor(merged.length / 2);
    return merged[start]
  }
};

assert.strictEqual(findMedianSortedArraysUnoptimised([1, 3], [2]), 2);
assert.strictEqual(findMedianSortedArraysUnoptimised([1, 2], [3, 4]), 2.5);

/**
 * Optimised approach O(log(min(n,m))
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  let low = 0;
  let high = m;

  while (low <= high) {
    // Partition nums1
    const partition1 = Math.floor((low + high) / 2);
    // Calculate partition2 based on partition1
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;

    // Handle edge cases for partition1
    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    // Handle edge cases for partition2
    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    // Check if the partition is correct
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // If the total number of elements is even
      if ((m + n) % 2 === 0) {
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        );
      } else {
        // If the total number of elements is odd
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      // Move partition1 to the left
      high = partition1 - 1;
    } else {
      // Move partition1 to the right
      low = partition1 + 1;
    }
  }

  // If no median is found (should not happen for valid inputs)
  throw new Error("Input arrays are not sorted or invalid.");
}



assert.strictEqual(findMedianSortedArrays([1, 3], [2]), 2);
assert.strictEqual(findMedianSortedArrays([1, 2], [3, 4]), 2.5);