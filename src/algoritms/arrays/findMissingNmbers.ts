import assert from 'node:assert';

// this one is O(n) time and O(n) space complexity
function findDisappearedNumbers(nums: number[]): number[] {
  const collection = new Set(nums);
  const elCount = nums.length;
  const res = [];

  for(let i = 1; i <= elCount; i++) {
    if(!collection.has(i)) {
      res.push(i);
    }
  }

  return res;
}

// this one is better. It is O(n) time but O(1) space complexity we map values
// to it indexes on the normal array that has all values. And use that map to
// find the answer. we map marking existing values as negative. so we only
// change the modality, but not the value itself. This is how we are able to
// store two type of data in a single array.
function BetterFindDisappearedMembers(nums: number[]): number[] {
  console.log('init: ', nums);
  for (let v of nums) {
    const i = Math.abs(v) - 1;
    nums[i] = -Math.abs(nums[i])
  }

  const res: number[] = [];

  console.log('test: ', nums);

  nums.forEach((val, i) => {
    if(val > 0) {
      res.push(i + 1);
    }
  })

  return res;
}

assert.deepEqual(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6]);
assert.deepEqual(findDisappearedNumbers([1,1]), [2]);

assert.deepEqual(BetterFindDisappearedMembers([4, 3, 2, 7, 8, 2, 3, 1]), [5, 6]);
assert.deepEqual(BetterFindDisappearedMembers([1,1]), [2]);
