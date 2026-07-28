// https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number/description/?envType=problem-list-v2&envId=dsa-linear-shoal-array-ii
//
import assert from "node:assert/strict";

function smallerNumbersThanCurrent(nums: number[]): number[] {
  const counts = new Array(101).fill(0);
  const res = new Array(nums.length).fill(0);

  for (let i = 0; i < nums.length; i++) {
    counts[nums[i]]++;
  }


  for (let i = 1; i < counts.length; i++) {
    counts[i] += counts[i - 1];
  }


  for (let i = 0; i < nums.length; i++) {
    if(nums[i] !== 0) {
      res[i] = counts[nums[i] - 1];
    }
  }


  return res;

}

console.log(assert.deepEqual(smallerNumbersThanCurrent([8,1,2,2,3]), [4,0,1,1,3]));
