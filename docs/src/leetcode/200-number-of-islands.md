# [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)



## 一、题目描述

给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中 **岛屿的数量** 。

岛屿总是被水包围，并且每座岛屿只能由 **水平方向和/或竖直方向** 上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

**示例 1：**

```
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：1
```

**示例 2：**

```
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
```

**提示：**

-   `m == grid.length`
-   `n == grid[i].length`
-   `1 <= m, n <= 300`
-   `grid[i][j]` 的值为 `'0'` 或 `'1'`



## 二、解答方法

### 2.1 方法一：DFS 淹没法

1. **思路**

遍历每个格子，遇到 `'1'` 就计数 +1，并用 DFS 把与其相连的所有 `'1'` 标记为 `'0'`（淹没整个岛屿），避免重复计数。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int numIslands(char[][] grid) {
        int m = grid.length, n = grid[0].length, count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == '0') return;
        grid[i][j] = '0';
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}
```

```python [Python]
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        count = 0
        def dfs(i, j):
            if i < 0 or j < 0 or i >= m or j >= n or grid[i][j] == '0':
                return
            grid[i][j] = '0'
            dfs(i + 1, j)
            dfs(i - 1, j)
            dfs(i, j + 1)
            dfs(i, j - 1)
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    dfs(i, j)
        return count
```

```go [Go]
func numIslands(grid [][]byte) int {
    if len(grid) == 0 {
        return 0
    }
    m, n := len(grid), len(grid[0])
    count := 0
    var dfs func(i, j int)
    dfs = func(i, j int) {
        if i < 0 || j < 0 || i >= m || j >= n || grid[i][j] == '0' {
            return
        }
        grid[i][j] = '0'
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    }
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == '1' {
                count++
                dfs(i, j)
            }
        }
    }
    return count
}
```

```cpp [C++]
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size(), count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
    void dfs(vector<vector<char>>& grid, int i, int j) {
        if (i < 0 || j < 0 || i >= grid.size() || j >= grid[0].size() || grid[i][j] == '0') return;
        grid[i][j] = '0';
        dfs(grid, i + 1, j); dfs(grid, i - 1, j);
        dfs(grid, i, j + 1); dfs(grid, i, j - 1);
    }
};
```

```js [JavaScript]
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (!grid.length) return 0;
    const m = grid.length, n = grid[0].length;
    let count = 0;
    const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0') return;
        grid[i][j] = '0';
        dfs(i + 1, j); dfs(i - 1, j);
        dfs(i, j + 1); dfs(i, j - 1);
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
};
```

```ts [TypeScript]
/**
 * @param {string[][]} grid
 * @return {number}
 */
function numIslands(grid: string[][]): number {
    if (!grid.length) return 0;
    const m = grid.length, n = grid[0].length;
    let count = 0;
    const dfs = (i: number, j: number) => {
        if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0') return;
        grid[i][j] = '0';
        dfs(i + 1, j); dfs(i - 1, j);
        dfs(i, j + 1); dfs(i, j - 1);
    };
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m × n)`（每个格子最多访问一次）。
- **空间复杂度**：`O(m × n)`（递归栈，最坏全为陆地）。

### 2.2 方法二：BFS / 并查集

1. **思路**

- **BFS**：用队列替代递归淹没岛屿。
- **并查集**：把相邻陆地合并，最后统计连通分量数（适合动态增删陆地，305 题）。

2. **代码实现（BFS，Python）**

```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        from collections import deque
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        count = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    grid[i][j] = '0'
                    q = deque([(i, j)])
                    while q:
                        x, y = q.popleft()
                        for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] == '1':
                                grid[nx][ny] = '0'
                                q.append((nx, ny))
        return count
```

## 三、总结

| 方法 | 特点 |
| ---- | ---- |
| DFS 淹没 | 代码简洁，推荐 |
| BFS | 避免递归栈溢出（大图） |
| 并查集 | 适合动态查询（305 题） |

经典「连通块计数」问题：每发现一个 `'1'` 就计数并把整块陆地「淹没」（标记），核心是「遍历 + 四连通扩散」。
