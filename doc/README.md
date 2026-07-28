# Algorithms & Data Structures — JavaScript

A reference guide covering algorithm patterns, implementations, complexity, and use cases.

## Index

| Topic | File |
|---|---|
| Sorting | [sorting.md](./sorting.md) |
| Searching | [searching.md](./searching.md) |
| Two Pointers | [two-pointers.md](./two-pointers.md) |
| Sliding Window | [sliding-window.md](./sliding-window.md) |
| Dynamic Programming | [dynamic-programming.md](./dynamic-programming.md) |
| Recursion | [recursion.md](./recursion.md) |
| Stack & Queue | [stack-queue.md](./stack-queue.md) |
| Linked Lists | [linked-lists.md](./linked-lists.md) |
| Trees & BST | [trees.md](./trees.md) |
| Graphs (BFS/DFS) | [graphs.md](./graphs.md) |
| Functional Patterns | [functional.md](./functional.md) |

## Complexity Cheat Sheet

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| BFS / DFS | O(V+E) | O(V+E) | O(V+E) | O(V) |

## Interview Patterns Map

```
Array problem?
├── Sorted input → Binary Search / Two Pointers
├── Subarray / substring → Sliding Window
├── Pairs / triplets → Two Pointers
└── Max/min subarray → Kadane's / DP

Tree problem?
├── Level-by-level → BFS
└── Path / depth → DFS

Graph problem?
├── Shortest path (unweighted) → BFS
├── Detect cycle / connected components → DFS / Union-Find
└── Shortest path (weighted) → Dijkstra

Optimization problem?
├── Overlapping subproblems → DP (memoization / tabulation)
└── Greedy works? → Greedy
```
