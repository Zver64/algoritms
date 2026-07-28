# Graphs (BFS & DFS)

A graph is a set of nodes (vertices) connected by edges. Can be directed or undirected, weighted or unweighted, cyclic or acyclic.

## Representations

```js
// Adjacency List — most common for sparse graphs
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'E'],
  D: ['B'],
  E: ['C'],
};

// Adjacency Matrix — good for dense graphs / quick edge lookup
const matrix = [
  // 0  1  2  3
  [0, 1, 1, 0], // 0
  [1, 0, 0, 1], // 1
  [1, 0, 0, 1], // 2
  [0, 1, 1, 0], // 3
];

// Edge list — simple, used as input format
const edges = [[0,1],[0,2],[1,3],[2,3]];

// Build adjacency list from edges
function buildGraph(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u); // omit for directed
  }
  return graph;
}
```

---

## BFS — Breadth-First Search

Explores all neighbors at the current depth before going deeper. Finds the **shortest path** in unweighted graphs.

```js
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
```

**Complexity:** O(V + E) time, O(V) space (V = vertices, E = edges)

### Shortest Path (BFS)

```js
function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, [start]]]; // [node, path]

  while (queue.length) {
    const [node, path] = queue.shift();
    if (node === end) return path;
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return null; // no path
}
```

### BFS on Grid

```js
// Shortest path in 2D grid (0=open, 1=wall)
function bfsGrid(grid, start, end) {
  const [rows, cols] = [grid.length, grid[0].length];
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  const visited = new Set([`${start[0]},${start[1]}`]);
  const queue = [[...start, 0]]; // [row, col, distance]

  while (queue.length) {
    const [r, c, dist] = queue.shift();
    if (r === end[0] && c === end[1]) return dist;
    for (const [dr, dc] of dirs) {
      const [nr, nc] = [r + dr, c + dc];
      const key = `${nr},${nc}`;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0 && !visited.has(key)) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }
  return -1;
}
```

---

## DFS — Depth-First Search

Explores as deep as possible before backtracking. Used for cycle detection, connected components, topological sort.

```js
// Recursive
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);
  for (const neighbor of graph[node] || []) {
    dfs(graph, neighbor, visited);
  }
}

// Iterative (explicit stack)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }
  return order;
}
```

**Complexity:** O(V + E) time, O(V) space

---

## Number of Connected Components

```js
function countComponents(n, edges) {
  const graph = buildGraph(n, edges);
  const visited = new Set();
  let count = 0;

  function dfs(node) {
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) { dfs(i); count++; }
  }
  return count;
}
```

---

## Cycle Detection

### Undirected Graph

```js
function hasCycleUndirected(graph, n) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // back edge found
      }
    }
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i) && dfs(i, -1)) return true;
  }
  return false;
}
```

### Directed Graph (3-color DFS)

```js
// 0=unvisited, 1=in-progress, 2=done
function hasCycleDirected(graph, n) {
  const color = new Array(n).fill(0);

  function dfs(node) {
    color[node] = 1; // mark in-progress
    for (const neighbor of graph[node] || []) {
      if (color[neighbor] === 1) return true; // back edge
      if (color[neighbor] === 0 && dfs(neighbor)) return true;
    }
    color[node] = 2; // mark done
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (color[i] === 0 && dfs(i)) return true;
  }
  return false;
}
```

---

## Topological Sort (DAG)

Order nodes such that every directed edge u→v has u before v. Only valid for Directed Acyclic Graphs.

```js
// Kahn's Algorithm (BFS-based, uses in-degree)
function topoSort(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const inDegree = new Array(n).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < n; i++) if (inDegree[i] === 0) queue.push(i);

  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return order.length === n ? order : []; // empty = cycle exists
}

topoSort(4, [[0,1],[0,2],[1,3],[2,3]]); // [0, 1, 2, 3] or [0, 2, 1, 3]
```

**Use cases:** Task scheduling, build systems (Webpack, Make), course prerequisites.

---

## Island Problems (LeetCode 200)

Classic DFS/BFS on grid — count connected components.

```js
function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited (in-place)
    dfs(r + 1, c); dfs(r - 1, c);
    dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; dfs(r, c); }
    }
  }
  return count;
}
```

---

## When to Use BFS vs DFS

| Situation | Use |
|---|---|
| Shortest path (unweighted) | BFS |
| Level-order / closest nodes | BFS |
| Connected components | DFS |
| Cycle detection | DFS |
| Topological sort | BFS (Kahn) or DFS |
| Maze / island problems | Either (DFS simpler) |
| All paths / permutations | DFS + backtracking |

---

## Complexity Summary

| Algorithm | Time | Space |
|---|---|---|
| BFS | O(V + E) | O(V) |
| DFS | O(V + E) | O(V) |
| Topological sort | O(V + E) | O(V) |
