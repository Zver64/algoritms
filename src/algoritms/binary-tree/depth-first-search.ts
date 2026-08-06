import { TreeNode } from "./types.ts";


// Complexity for both versions:
// Time: O(n) — every node is visited once.
// Space: O(h) — where h is the tree height.
// Balanced tree: O(log n).
// Completely skewed tree: O(n).


// recursive sollution
function dfsRecursive(root: TreeNode | null): number[] {
  const result: number[] = [];

  function traverse(node: TreeNode | null): void {
    if (node === null) {
      return;
    }

    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }

  traverse(root);

  return result;
}


// iterative using stack
function dfsIterative(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }

  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;

    result.push(node.val);

    // Push right first because the stack is LIFO.
    if (node.right !== null) {
      stack.push(node.right);
    }

    if (node.left !== null) {
      stack.push(node.left);
    }
  }

  return result;
}
