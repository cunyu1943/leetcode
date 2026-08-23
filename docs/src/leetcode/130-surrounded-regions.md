# [130. 被围绕的区域](https://leetcode.cn/problems/surrounded-regions/)



## 一、题目描述

给你一个 `m x n` 的矩阵 `board`，由若干字符 `'X'` 和 `'O'`，捕获 **所有** 被围绕的区域：

连接 **水平或竖直** 方向上相邻的 `'O'` 形成一个被围绕的区域，任何边界上的 `'O'` 都不属于被围绕的区域。任何不在边界上，或不与边界上的 `'O'` 相连的 `'O'` 最终都会被替换为 `'X'`。

请注意，被捕获的区域**不会**在棋盘上直接显示为 `'X'`，而是先被标记为别的状态，处理完成后再统一替换。



**示例 1：**

```
输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
解释：被围绕的区间以 'O' 为中心，四周的 'O' 被捕获。
```

**示例 2：**

```
输入：board = [["X"]]
输出：[["X"]]
```

**提示：**

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 200`
- `board[i][j]` 为 `'X'` 或 `'O'`



## 二、解答方法

### 2.1 方法一：从边界 DFS / BFS 标记

1. **思路**

直接找「被围绕的 `'O'`」比较困难，因为需要判断它是否与边界连通。反向思考：**所有与边界相连的 `'O'` 都不应该被捕获**。因此：

- 遍历矩阵四条边界，凡是边界上为 `'O'` 的点，用 DFS/BFS 把它以及与它连通的所有 `'O'` 标记为临时状态（如 `'#'`）；
- 遍历整个矩阵，把剩余的 `'O'`（即被围绕的）全部改为 `'X'`；
- 再把所有 `'#'` 还原为 `'O'`。

这样只需要一次边界搜索 + 一次整体遍历。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    private int m, n;
    private char[][] board;

    public void solve(char[][] board) {
        if (board.length == 0) return;
        m = board.length;
        n = board[0].length;
        this.board = board;

        for (int j = 0; j < n; j++) {
            dfs(0, j);
            dfs(m - 1, j);
        }
        for (int i = 0; i < m; i++) {
            dfs(i, 0);
            dfs(i, n - 1);
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == '#') board[i][j] = 'O';
                else if (board[i][j] == 'O') board[i][j] = 'X';
            }
        }
    }

    private void dfs(int i, int j) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;
        board[i][j] = '#';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
}
```

```python [Python]
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board:
            return
        m, n = len(board), len(board[0])

        def dfs(i: int, j: int):
            if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != 'O':
                return
            board[i][j] = '#'
            dfs(i + 1, j)
            dfs(i - 1, j)
            dfs(i, j + 1)
            dfs(i, j - 1)

        for j in range(n):
            dfs(0, j)
            dfs(m - 1, j)
        for i in range(m):
            dfs(i, 0)
            dfs(i, n - 1)

        for i in range(m):
            for j in range(n):
                if board[i][j] == '#':
                    board[i][j] = 'O'
                elif board[i][j] == 'O':
                    board[i][j] = 'X'
```

```cpp [C++]
class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;
        int m = board.size(), n = board[0].size();

        function<void(int, int)> dfs = [&](int i, int j) {
            if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;
            board[i][j] = '#';
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        };

        for (int j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }
        for (int i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (board[i][j] == '#') board[i][j] = 'O';
                else if (board[i][j] == 'O') board[i][j] = 'X';
            }
    }
};
```

```go [Go]
func solve(board [][]byte) {
    if len(board) == 0 {
        return
    }
    m, n := len(board), len(board[0])

    var dfs func(int, int)
    dfs = func(i, j int) {
        if i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O' {
            return
        }
        board[i][j] = '#'
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    }

    for j := 0; j < n; j++ {
        dfs(0, j)
        dfs(m-1, j)
    }
    for i := 0; i < m; i++ {
        dfs(i, 0)
        dfs(i, n-1)
    }

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if board[i][j] == '#' {
                board[i][j] = 'O'
            } else if board[i][j] == 'O' {
                board[i][j] = 'X'
            }
        }
    }
}
```

```js [JavaScript]
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    if (!board.length) return;
    const m = board.length, n = board[0].length;

    const dfs = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') return;
        board[i][j] = '#';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };

    for (let j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }
    for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === '#') board[i][j] = 'O';
            else if (board[i][j] === 'O') board[i][j] = 'X';
        }
    }
};
```

```c [C]
#include <stdlib.h>

void dfs(char** board, int m, int n, int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;
    board[i][j] = '#';
    dfs(board, m, n, i + 1, j);
    dfs(board, m, n, i - 1, j);
    dfs(board, m, n, i, j + 1);
    dfs(board, m, n, i, j - 1);
}

void solve(char** board, int boardSize, int* boardColSize) {
    if (boardSize == 0) return;
    int m = boardSize, n = boardColSize[0];
    for (int j = 0; j < n; j++) {
        dfs(board, m, n, 0, j);
        dfs(board, m, n, m - 1, j);
    }
    for (int i = 0; i < m; i++) {
        dfs(board, m, n, i, 0);
        dfs(board, m, n, i, n - 1);
    }
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (board[i][j] == '#') board[i][j] = 'O';
            else if (board[i][j] == 'O') board[i][j] = 'X';
        }
}
```

```ts [TypeScript]
function solve(board: string[][]): void {
    if (!board.length) return;
    const m = board.length, n = board[0].length;

    const dfs = (i: number, j: number): void => {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') return;
        board[i][j] = '#';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };

    for (let j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }
    for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === '#') board[i][j] = 'O';
            else if (board[i][j] === 'O') board[i][j] = 'X';
        }
    }
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m × n)`，每个格子最多被访问两次（边界标记一次、整体遍历一次）。
- **空间复杂度**：`O(m × n)`，DFS 递归栈在最坏情况下（全为连通 `'O'`）达到 `O(m × n)`。

### 2.2 方法二：并查集

1. **思路**

把所有边界上的 `'O'` 以及所有 `'O'` 之间的连通关系用并查集维护，并引入一个虚拟节点 `dummy` 代表「与边界连通」。

- 遍历矩阵，把每个 `'O'` 与其右、下相邻的 `'O'` 合并；
- 把所有边界上的 `'O'` 与 `dummy` 合并；
- 遍历所有 `'O'`，若其根不是 `dummy`，说明它被包围，改为 `'X'`。

并查集适合需要查询连通性的场景，但实现比直接 DFS 复杂。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public void solve(char[][] board) {
        if (board.length == 0) return;
        int m = board.length, n = board[0].length;
        int dummy = m * n;

        UnionFind uf = new UnionFind(m * n + 1);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] != 'O') continue;
                int id = i * n + j;
                if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                    uf.union(id, dummy);
                }
                if (i + 1 < m && board[i + 1][j] == 'O') uf.union(id, (i + 1) * n + j);
                if (j + 1 < n && board[i][j + 1] == 'O') uf.union(id, i * n + j + 1);
            }
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O' && uf.find(i * n + j) != uf.find(dummy)) {
                    board[i][j] = 'X';
                }
            }
        }
    }

    static class UnionFind {
        int[] parent;
        UnionFind(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        void union(int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra != rb) parent[ra] = rb;
        }
    }
}
```

```python [Python]
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board:
            return
        m, n = len(board), len(board[0])
        dummy = m * n
        parent = list(range(m * n + 1))

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        for i in range(m):
            for j in range(n):
                if board[i][j] != 'O':
                    continue
                idx = i * n + j
                if i == 0 or i == m - 1 or j == 0 or j == n - 1:
                    union(idx, dummy)
                if i + 1 < m and board[i + 1][j] == 'O':
                    union(idx, (i + 1) * n + j)
                if j + 1 < n and board[i][j + 1] == 'O':
                    union(idx, i * n + j + 1)

        for i in range(m):
            for j in range(n):
                if board[i][j] == 'O' and find(i * n + j) != find(dummy):
                    board[i][j] = 'X'
```

```cpp [C++]
class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;
        int m = board.size(), n = board[0].size();
        int dummy = m * n;
        vector<int> parent(m * n + 1);
        for (int i = 0; i <= m * n; i++) parent[i] = i;

        function<int(int)> find = [&](int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        };
        auto uni = [&](int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra != rb) parent[ra] = rb;
        };

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (board[i][j] != 'O') continue;
                int id = i * n + j;
                if (i == 0 || i == m - 1 || j == 0 || j == n - 1) uni(id, dummy);
                if (i + 1 < m && board[i + 1][j] == 'O') uni(id, (i + 1) * n + j);
                if (j + 1 < n && board[i][j + 1] == 'O') uni(id, i * n + j + 1);
            }

        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (board[i][j] == 'O' && find(i * n + j) != find(dummy))
                    board[i][j] = 'X';
    }
};
```

```go [Go]
func solve(board [][]byte) {
    if len(board) == 0 {
        return
    }
    m, n := len(board), len(board[0])
    dummy := m * n
    parent := make([]int, m*n+1)
    for i := 0; i <= m*n; i++ {
        parent[i] = i
    }
    find := func(x int) int {
        for parent[x] != x {
            parent[x] = parent[parent[x]]
            x = parent[x]
        }
        return x
    }
    union := func(a, b int) {
        ra, rb := find(a), find(b)
        if ra != rb {
            parent[ra] = rb
        }
    }

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if board[i][j] != 'O' {
                continue
            }
            idx := i*n + j
            if i == 0 || i == m-1 || j == 0 || j == n-1 {
                union(idx, dummy)
            }
            if i+1 < m && board[i+1][j] == 'O' {
                union(idx, (i+1)*n+j)
            }
            if j+1 < n && board[i][j+1] == 'O' {
                union(idx, i*n+j+1)
            }
        }
    }

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if board[i][j] == 'O' && find(i*n+j) != find(dummy) {
                board[i][j] = 'X'
            }
        }
    }
}
```

```js [JavaScript]
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
    if (!board.length) return;
    const m = board.length, n = board[0].length;
    const dummy = m * n;
    const parent = Array.from({ length: m * n + 1 }, (_, i) => i);

    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a, b) => {
        const ra = find(a), rb = find(b);
        if (ra !== rb) parent[ra] = rb;
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] !== 'O') continue;
            const idx = i * n + j;
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1) union(idx, dummy);
            if (i + 1 < m && board[i + 1][j] === 'O') union(idx, (i + 1) * n + j);
            if (j + 1 < n && board[i][j + 1] === 'O') union(idx, i * n + j + 1);
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O' && find(i * n + j) !== find(dummy)) {
                board[i][j] = 'X';
            }
        }
    }
};
```

```c [C]
#include <stdlib.h>

void solve(char** board, int boardSize, int* boardColSize) {
    if (boardSize == 0) return;
    int m = boardSize, n = boardColSize[0];
    int dummy = m * n;
    int* parent = (int*)malloc((m * n + 1) * sizeof(int));
    for (int i = 0; i <= m * n; i++) parent[i] = i;
    int find(int x) { while (parent[x] != x) parent[x] = parent[parent[x]]; return parent[x]; }

    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (board[i][j] != 'O') continue;
            int id = i * n + j;
            if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                int ra = find(id), rb = find(dummy);
                if (ra != rb) parent[ra] = rb;
            }
            if (i + 1 < m && board[i + 1][j] == 'O') {
                int ra = find(id), rb = find((i + 1) * n + j);
                if (ra != rb) parent[ra] = rb;
            }
            if (j + 1 < n && board[i][j + 1] == 'O') {
                int ra = find(id), rb = find(i * n + j + 1);
                if (ra != rb) parent[ra] = rb;
            }
        }
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (board[i][j] == 'O' && find(i * n + j) != find(dummy))
                board[i][j] = 'X';
    free(parent);
}
```

```ts [TypeScript]
function solve(board: string[][]): void {
    if (!board.length) return;
    const m = board.length, n = board[0].length;
    const dummy = m * n;
    const parent = Array.from({ length: m * n + 1 }, (_, i) => i);
    const find = (x: number): number => {
        while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    };
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++) {
            if (board[i][j] !== 'O') continue;
            const idx = i * n + j;
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1) parent[find(idx)] = find(dummy);
            if (i + 1 < m && board[i + 1][j] === 'O') parent[find(idx)] = find((i + 1) * n + j);
            if (j + 1 < n && board[i][j + 1] === 'O') parent[find(idx)] = find(i * n + j + 1);
        }
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (board[i][j] === 'O' && find(i * n + j) !== find(dummy))
                board[i][j] = 'X';
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(m × n α(mn))`，近似 `O(m × n)`。
- **空间复杂度**：`O(m × n)`，并查集父数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 边界 DFS/BFS | `O(m × n)` | `O(m × n)` | 实现最简洁，推荐 |
| 并查集 | `O(m × n)` | `O(m × n)` | 适合需要复用连通性判断 |

实际解题推荐方法一，从边界出发反向标记是最直观且高效的做法。
