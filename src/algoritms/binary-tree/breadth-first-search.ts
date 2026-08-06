import { TreeNode } from "./types.ts";

// Using front is optimal in JavaScript/TypeScript. Do not use queue.shift(), because shifting an array is O(n).
// Complexity:
// Time: O(n) — every node is visited once.
// Space: O(w) — where w is the maximum tree width.
// Worst case: O(n).
// Unlike DFS, BFS does not have a meaningful recursive implementation. It is naturally implemented with a queue.
function bfs(root: TreeNode | null): number[] {
  if (root === null) {
    return [];
  }

  const result: number[] = [];
  const queue: TreeNode[] = [root];
  let front = 0;

  while (front < queue.length) {
    const node = queue[front++];

    result.push(node.val);

    if (node.left !== null) {
      queue.push(node.left);
    }

    if (node.right !== null) {
      queue.push(node.right);
    }
  }

  return result;
}

