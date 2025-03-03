import assert from 'assert';

// check brackets

/**
 *
 * @param {string} str
 */
function checkBrackets(str) {
  const bracketsMap = {
    '}': '{',
    ']': '[',
    ')': '(',
  };

  const openBrackets = Object.values(bracketsMap);

  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (openBrackets.includes(str[i])) {
      stack.push(str[i]);
      continue;
    }
    if (bracketsMap[str[i]]) {
      if (stack.pop() !== bracketsMap[str[i]]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

assert(checkBrackets('()') === true);
assert(checkBrackets('(g)()') === true);
assert(checkBrackets('((){})') === true);
assert(checkBrackets('[()(df)][]') === true);
assert(checkBrackets('(()())()(') === false);
assert(checkBrackets('(()())()()') === true);