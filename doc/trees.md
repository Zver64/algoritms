# Trees & Binary Search Trees

## Tree Node

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Build from level-order array (null = missing node)
function fromArray(arr) {
  if (!arr.length || arr[0] == null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (arr[i] != null) { node.left = new TreeNode(arr[i]); queue.push(node.left); }
    i++;
    if (i < arr.length && arr[i] != null) { node.right = new TreeNode(arr[i]); queue.push(node.right); }
    i++;
  }
  return root;
}
```

---

## DFS Traversals

All three run in O(n) time, O(h) space where h = tree height.

```js
// Inorder: Left → Root → Right  (BST → sorted order)
function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result;
}

// Preorder: Root → Left → Right  (serialize / copy tree)
function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

// Postorder: Left → Right → Root  (delete tree, evaluate expressions)
function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result;
}
```

### Iterative Inorder (interview favourite)

```js
function inorderIterative(root) {
  const result = [], stack = [];
  let curr = root;
  while (curr || stack.length) {
    while (curr) { stack.push(curr); curr = curr.left; }
    curr = stack.pop();
    result.push(curr.val);
    curr = curr.right;
  }
  return result;
}
```

---

## BFS / Level-Order Traversal

```js
function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// Tree: [3,9,20,null,null,15,7]
// → [[3],[9,20],[15,7]]
```

**Complexity:** O(n) time, O(n) space

---

## Tree Height / Max Depth (LeetCode 104)

```js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

**Complexity:** O(n) time, O(h) space

---

## Balanced Binary Tree (LeetCode 110)

A tree where every node's left and right subtree heights differ by at most 1.

```js
function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1; // unbalanced signal
    return 1 + Math.max(left, right);
  }
  return height(root) !== -1;
}
```

---

## Lowest Common Ancestor (LeetCode 236)

```js
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root; // p and q are on different sides
  return left || right;
}
```

**Complexity:** O(n) time, O(h) space

---

## Binary Search Tree (BST)

Property: left subtree < node < right subtree (for all nodes).

**Complexity:** Search, insert, delete = O(h). For balanced BST: O(log n). Worst case (skewed): O(n).

```js
// Search
function searchBST(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}

// Insert
function insertBST(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insertBST(root.left, val);
  else root.right = insertBST(root.right, val);
  return root;
}

// Validate BST (LeetCode 98)
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}
```

---

## Path Sum (LeetCode 112)

Does any root-to-leaf path sum to `targetSum`?

```js
function hasPathSum(root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  return hasPathSum(root.left, targetSum - root.val) ||
         hasPathSum(root.right, targetSum - root.val);
}
```

---

## Complexity Summary

| Operation | Average (balanced) | Worst (skewed) |
|---|---|---|
| DFS traversal | O(n) | O(n) |
| BFS level-order | O(n) | O(n) |
| BST search/insert | O(log n) | O(n) |
| Max depth | O(n) | O(n) |
| LCA | O(n) | O(n) |
