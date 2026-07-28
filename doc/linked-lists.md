# Linked Lists

A sequence of nodes where each node stores a value and a pointer to the next node. No random access — traversal is O(n).

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper: build list from array
function fromArray(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = new ListNode(arr[i], head);
  }
  return head;
}

// Helper: list to array (for testing)
function toArray(head) {
  const result = [];
  while (head) { result.push(head.val); head = head.next; }
  return result;
}
```

---

## Reverse a Linked List (LeetCode 206)

```js
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev; // new head
}

toArray(reverseList(fromArray([1, 2, 3, 4, 5]))); // [5, 4, 3, 2, 1]
```

**Complexity:** O(n) time, O(1) space

---

## Detect Cycle — Floyd's Tortoise and Hare (LeetCode 141)

```js
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

**Find cycle entry point** (LeetCode 142): after detecting collision, move one pointer to head; advance both one step at a time — they meet at the cycle start.

```js
function detectCycleEntry(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head; // reset one pointer to head
      while (slow !== fast) { slow = slow.next; fast = fast.next; }
      return slow; // cycle entry
    }
  }
  return null;
}
```

**Complexity:** O(n) time, O(1) space

---

## Merge Two Sorted Lists (LeetCode 21)

```js
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2;
  return dummy.next;
}
```

**Complexity:** O(n + m) time, O(1) space

---

## Find Middle Node — Fast & Slow Pointers (LeetCode 876)

```js
function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // for even length, returns second middle
}
```

**Complexity:** O(n) time, O(1) space

---

## Remove Nth Node from End (LeetCode 19)

Use two pointers n+1 apart. When fast reaches the end, slow is at the node before the one to delete.

```js
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let slow = dummy, fast = dummy;

  for (let i = 0; i <= n; i++) fast = fast.next;

  while (fast) { slow = slow.next; fast = fast.next; }
  slow.next = slow.next.next; // remove
  return dummy.next;
}
```

**Complexity:** O(n) time, O(1) space

---

## Palindrome Linked List (LeetCode 234)

Find middle → reverse second half → compare → restore (optional).

```js
function isPalindrome(head) {
  // 1. find middle
  let slow = head, fast = head;
  while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }

  // 2. reverse second half
  let prev = null, curr = slow;
  while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }

  // 3. compare
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next; right = right.next;
  }
  return true;
}
```

**Complexity:** O(n) time, O(1) space

---

## Key Patterns

| Pattern | Technique |
|---|---|
| Middle of list | Fast & slow pointers |
| Cycle detection | Fast & slow pointers |
| Nth from end | Two pointers with gap |
| Merge / sort | Dummy head node |
| Reverse | Three-pointer (prev, curr, next) |

**Dummy head tip:** Create a `new ListNode(0)` as a sentinel before the real head. Eliminates edge cases for insert/delete at position 0.
