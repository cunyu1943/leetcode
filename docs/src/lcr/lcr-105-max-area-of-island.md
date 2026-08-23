# [LCR 105. 岛屿的最大面积](https://leetcode.cn/problems/ZL6zAn/)



## 一、题目描述

给定一个由 `0` 和 `1` 组成的非空二维数组 `grid` ，用来表示海洋岛屿地图。

一个 **岛屿** 是由一些相邻的 `1` (代表土地) 构成的组合，这里的「相邻」要求两个 `1` 必须在水平或者竖直方向上相邻。你可以假设 `grid` 的四个边缘都被 `0`（代表水）包围着。

找到给定的二维数组中最大的岛屿面积。（如果没有岛屿，则返回面积为 `0`）



**示例 1：**

```
输入: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
输出: 6
解释: 注意不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1 。
```

**示例 2：**

```
输入: grid = [[0,0,0,0,0,0,0,0]]
输出: 0
```

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` 为 `0` 或 `1`



## 二、解答方法

### 2.1 方法一：DFS 染色

1. **思路**

遍历每个格子，遇到 `1` 即以它为起点 DFS 计算连通块面积：

- 访问过的格子置为 `0`（淹没），避免重复计数；
- 向上下左右四个方向扩展，累加面积。

时间 `O(mn)`，空间 `O(mn)`（递归栈）。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int m = grid.length, n = grid[0].length, ans = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    ans = Math.max(ans, dfs(grid, i, j));
                }
            }
        }
        return ans;
    }
    private int dfs(int[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0) {
            return 0;
        }
        grid[i][j] = 0;
        return 1 + dfs(grid, i + 1, j) + dfs(grid, i - 1, j)
                 + dfs(grid, i, j + 1) + dfs(grid, i, j - 1);
    }
}
```

```python [Python]
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = 0

        def dfs(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] == 0:
                return 0
            grid[i][j] = 0
            return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1)

        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    ans = max(ans, dfs(i, j))
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) ans = max(ans, dfs(grid, i, j));
        return ans;
    }
private:
    int dfs(vector<vector<int>>& g, int i, int j) {
        if (i < 0 || i >= g.size() || j < 0 || j >= g[0].size() || !g[i][j]) return 0;
        g[i][j] = 0;
        return 1 + dfs(g, i + 1, j) + dfs(g, i - 1, j) + dfs(g, i, j + 1) + dfs(g, i, j - 1);
    }
};
```

```go [Go]
func maxAreaOfIsland(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0 {
            return 0
        }
        grid[i][j] = 0
        return 1 + dfs(i+1, j) + dfs(i-1, j) + dfs(i, j+1) + dfs(i, j-1)
    }
    ans := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 {
                if a := dfs(i, j); a > ans {
                    ans = a
                }
            }
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dfs = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) return 0;
        grid[i][j] = 0;
        return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1);
    };
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) ans = Math.max(ans, dfs(i, j));
        }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

static int dfs(int** grid, int m, int n, int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0) return 0;
    grid[i][j] = 0;
    return 1 + dfs(grid, m, n, i + 1, j) + dfs(grid, m, n, i - 1, j)
             + dfs(grid, m, n, i, j + 1) + dfs(grid, m, n, i, j - 1);
}

int maxAreaOfIsland(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize, n = gridColSize[0], ans = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j]) {
                int a = dfs(grid, m, n, i, j);
                if (a > ans) ans = a;
            }
    return ans;
}
```

```ts [TypeScript]
function maxAreaOfIsland(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const dfs = (i: number, j: number): number => {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) return 0;
        grid[i][j] = 0;
        return 1 + dfs(i + 1, j) + dfs(i - 1, j) + dfs(i, j + 1) + dfs(i, j - 1);
    };
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) ans = Math.max(ans, dfs(i, j));
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(mn)`。
- **空间复杂度**：`O(mn)`，最坏递归栈深度。

### 2.2 方法二：栈式 DFS（迭代）

1. **思路**

用显式栈模拟 DFS，避免递归深度风险。每遇到一个 `1` 入栈，弹出并标记 `0`，向四邻扩展入栈，统计面积。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int m = grid.length, n = grid[0].length, ans = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) continue;
                Deque<int[]> stk = new ArrayDeque<>();
                stk.push(new int[]{i, j});
                grid[i][j] = 0;
                int area = 0;
                while (!stk.isEmpty()) {
                    int[] cur = stk.pop();
                    area++;
                    for (int[] d : dirs) {
                        int ni = cur[0] + d[0], nj = cur[1] + d[1];
                        if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1) {
                            grid[ni][nj] = 0;
                            stk.push(new int[]{ni, nj});
                        }
                    }
                }
                ans = Math.max(ans, area);
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 0:
                    continue
                stk = [(i, j)]
                grid[i][j] = 0
                area = 0
                while stk:
                    x, y = stk.pop()
                    area += 1
                    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] == 1:
                            grid[nx][ny] = 0
                            stk.append((nx, ny))
                ans = max(ans, area)
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), ans = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (!grid[i][j]) continue;
                stack<pair<int,int>> stk;
                stk.push({i, j});
                grid[i][j] = 0;
                int area = 0;
                while (!stk.empty()) {
                    auto [x, y] = stk.top(); stk.pop();
                    area++;
                    for (auto& d : dirs) {
                        int nx = x + d[0], ny = y + d[1];
                        if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny]) {
                            grid[nx][ny] = 0;
                            stk.push({nx, ny});
                        }
                    }
                }
                ans = max(ans, area);
            }
        }
        return ans;
    }
};
```

```go [Go]
func maxAreaOfIsland(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    ans := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 0 {
                continue
            }
            stk := [][2]int{{i, j}}
            grid[i][j] = 0
            area := 0
            for len(stk) > 0 {
                cur := stk[len(stk)-1]
                stk = stk[:len(stk)-1]
                area++
                for _, d := range dirs {
                    nx, ny := cur[0]+d[0], cur[1]+d[1]
                    if nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] == 1 {
                        grid[nx][ny] = 0
                        stk = append(stk, [2]int{nx, ny})
                    }
                }
            }
            if area > ans {
                ans = area
            }
        }
    }
    return ans
}
```

```js [JavaScript]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) continue;
            const stk = [[i, j]];
            grid[i][j] = 0;
            let area = 0;
            while (stk.length) {
                const [x, y] = stk.pop();
                area++;
                for (const [dx, dy] of dirs) {
                    const nx = x + dx, ny = y + dy;
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
                        grid[nx][ny] = 0;
                        stk.push([nx, ny]);
                    }
                }
            }
            ans = Math.max(ans, area);
        }
    }
    return ans;
};
```

```c [C]
#include <stdlib.h>

int maxAreaOfIsland(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize, n = gridColSize[0], ans = 0;
    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int* sx = (int*)malloc(m * n * sizeof(int));
    int* sy = (int*)malloc(m * n * sizeof(int));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 0) continue;
            int top = 0;
            sx[top] = i; sy[top] = j; top++;
            grid[i][j] = 0;
            int area = 0;
            while (top > 0) {
                int x = sx[--top], y = sy[top];
                area++;
                for (int d = 0; d < 4; d++) {
                    int nx = x + dirs[d][0], ny = y + dirs[d][1];
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] == 1) {
                        grid[nx][ny] = 0;
                        sx[top] = nx; sy[top] = ny; top++;
                    }
                }
            }
            if (area > ans) ans = area;
        }
    }
    free(sx); free(sy);
    return ans;
}
```

```ts [TypeScript]
function maxAreaOfIsland(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let ans = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) continue;
            const stk: [number, number][] = [[i, j]];
            grid[i][j] = 0;
            let area = 0;
            while (stk.length) {
                const [x, y] = stk.pop()!;
                area++;
                for (const [dx, dy] of dirs) {
                    const nx = x + dx, ny = y + dy;
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
                        grid[nx][ny] = 0;
                        stk.push([nx, ny]);
                    }
                }
            }
            ans = Math.max(ans, area);
        }
    }
    return ans;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(mn)`。
- **空间复杂度**：`O(mn)`，栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 递归 DFS | `O(mn)` | `O(mn)` | 简洁 |
| 栈式 DFS | `O(mn)` | `O(mn)` | 无递归栈溢出风险 |

岛屿面积即连通块大小：遇到 `1` 用 DFS/BFS 染色计数，访问过的格子置 0 避免重复。四方向扩展是网格连通性问题的标准遍历方式。

