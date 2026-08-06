import { TreeNode } from '../types.ts';

export function buildBinaryTree(arr: Array<number | null>, i = 0): TreeNode | null {
  const val = arr[i];

  if (val === null || val === undefined) {
    return null;
  }

  return new TreeNode(
    val,
    buildBinaryTree(arr, i * 2 + 1),
    buildBinaryTree(arr, i * 2 + 2),
  );
}

export function printBinaryTree(root: TreeNode | null): void {
  if (!root) {
    console.log("(empty)");
    return;
  }

  const height = getHeight(root);
  const width = 2 ** height * 2;

  const lines: string[][] = Array.from(
    { length: height * 2 - 1 },
    () => Array(width).fill(" "),
  );

  function draw(
    node: TreeNode | null,
    level: number,
    left: number,
    right: number,
  ): void {
    if (!node) {
      return;
    }

    const column = Math.floor((left + right) / 2);
    const row = level * 2;

    const value = String(node.val);

    for (let i = 0; i < value.length; i++) {
      lines[row][column + i] = value[i];
    }

    if (node.left) {
      const leftColumn = Math.floor((left + column - 1) / 2);

      lines[row + 1][leftColumn] = "┌";

      for (let i = leftColumn + 1; i < column; i++) {
        lines[row + 1][i] = "─";
      }

      lines[row + 1][column] = "┴";

      draw(node.left, level + 1, left, column - 1);
    }

    if (node.right) {
      const rightColumn = Math.floor((column + 1 + right) / 2);

      lines[row + 1][column] = "┴";

      for (let i = column + 1; i < rightColumn; i++) {
        lines[row + 1][i] = "─";
      }

      lines[row + 1][rightColumn] = "┐";

      draw(node.right, level + 1, column + 1, right);
    }
  }

  draw(root, 0, 0, width - 1);

  console.log(
    lines
      .map((line) => line.join("").trimEnd())
      .join("\n"),
  );
}

function getHeight(node: TreeNode | null): number {
  if (!node) {
    return 0;
  }

  return 1 + Math.max(
    getHeight(node.left),
    getHeight(node.right),
  );
}
