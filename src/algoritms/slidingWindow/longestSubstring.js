import assert from 'assert';

// Given a string s, find the length of the longest substring without duplicate characters.
// leetcode https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let start = 0;
  let max = 0;
  // store last position of each char, so we can update start in one step
  const charMap = new Map();

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (charMap.has(char) && charMap.get(char) >= start) {
      // update start so it is in the next position after current char last position
      start = charMap.get(char) + 1;
    }

    charMap.set(char, i);
    max = Math.max(max, i - start + 1);
  }

  return max;
};

assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3);
assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1);
