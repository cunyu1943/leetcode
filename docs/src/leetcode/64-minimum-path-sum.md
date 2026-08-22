# [64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)



## 一、题目描述

给定一个包含非负整数的 `m x n` 网格 `grid`，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。每次只能向下或者向右移动一步。



**示例 1：**

```
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：路径 1→3→1→1→1 的总和最小，为 7。
```

**示例 2：**

```
输入：grid = [[1,2,3],[4,5,6]]
输出：12
```

**提示：**

-   `m == grid.length`
-   `n == grid[i].length`
-   `1 <= m, n <= 200`
-   `0 <= grid[i][j] <= 100`



## 二、解答方法

### 2.1 方法一：动态规划（一维数组）


1. **思路**

`dp[j]` 表示到达当前行第 `j` 列的最小路径和，转移 `dp[j] = grid[i][j] + min(dp[j], dp[j-1])`，首列只来自上方。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++) {
                dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
            }
        }
        return dp[n - 1];
    }
}
```

```python [Python]
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [grid[0][0]] + [0] * (n - 1)
        for j in range(1, n):
            dp[j] = dp[j - 1] + grid[0][j]
        for i in range(1, m):
            dp[0] += grid[i][0]
            for j in range(1, n):
                dp[j] = grid[i][j] + min(dp[j], dp[j - 1])
        return dp[-1]
```

```go [Go]
func minPathSum(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dp := make([]int, n)
    dp[0] = grid[0][0]
    for j := 1; j < n; j++ { dp[j] = dp[j-1] + grid[0][j] }
    for i := 1; i < m; i++ {
        dp[0] += grid[i][0]
        for j := 1; j < n; j++ {
            if dp[j] < dp[j-1] { dp[j] = grid[i][j] + dp[j] } else { dp[j] = grid[i][j] + dp[j-1] }
        }
    }
    return dp[n-1]
}
```

```c [C]
int minPathSum(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize, n = gridColSize[0];
    int* dp = (int*)malloc(sizeof(int) * n);
    dp[0] = grid[0][0];
    for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
    for (int i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (int j = 1; j < n; j++)
            dp[j] = grid[i][j] + (dp[j] < dp[j-1] ? dp[j] : dp[j-1]);
    }
    int ans = dp[n - 1];
    free(dp);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n);
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++)
                dp[j] = grid[i][j] + min(dp[j], dp[j - 1]);
        }
        return dp[n - 1];
    }
};
```

```javascript [JavaScript]
var minPathSum = function(grid) {
    const m = grid.length, n = grid[0].length;
    const dp = new Array(n).fill(0);
    dp[0] = grid[0][0];
    for (let j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
    for (let i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (let j = 1; j < n; j++)
            dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
    }
    return dp[n - 1];
};
```

```typescript [TypeScript]
function minPathSum(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const dp: number[] = new Array(n).fill(0);
    dp[0] = grid[0][0];
    for (let j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
    for (let i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (let j = 1; j < n; j++)
            dp[j] = grid[i][j] + Math.min(dp[j], dp[j - 1]);
    }
    return dp[n - 1];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，遍历整个网格。
- **空间复杂度**：`O(n)`**，一维数组。

### 2.2 方法二：原地处理（就地修改）


1. **思路**

直接在 `grid` 上更新，把每个格子改为到达该格的最小路径和，省去额外 `dp` 数组，空间为 `O(1)`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                if (i == 0) grid[i][j] += grid[i][j - 1];
                else if (j == 0) grid[i][j] += grid[i - 1][j];
                else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[m - 1][n - 1];
    }
}
```

```python [Python]
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0: continue
                if i == 0: grid[i][j] += grid[i][j - 1]
                elif j == 0: grid[i][j] += grid[i - 1][j]
                else: grid[i][j] += min(grid[i - 1][j], grid[i][j - 1])
        return grid[-1][-1]
```

```go [Go]
func minPathSum(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if i == 0 && j == 0 { continue }
            if i == 0 { grid[i][j] += grid[i][j-1] } else if j == 0 { grid[i][j] += grid[i-1][j] } else {
                if grid[i-1][j] < grid[i][j-1] { grid[i][j] += grid[i-1][j] } else { grid[i][j] += grid[i][j-1] }
            }
        }
    }
    return grid[m-1][n-1]
}
```

```c [C]
int minPathSum(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize, n = gridColSize[0];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            if (i == 0) grid[i][j] += grid[i][j - 1];
            else if (j == 0) grid[i][j] += grid[i - 1][j];
            else grid[i][j] += (grid[i - 1][j] < grid[i][j - 1] ? grid[i - 1][j] : grid[i][j - 1]);
        }
    }
    return grid[m - 1][n - 1];
}
```

```cpp [C++]
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                if (i == 0) grid[i][j] += grid[i][j - 1];
                else if (j == 0) grid[i][j] += grid[i - 1][j];
                else grid[i][j] += min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[m - 1][n - 1];
    }
};
```

```javascript [JavaScript]
var minPathSum = function(grid) {
    const m = grid.length, n = grid[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            if (i === 0) grid[i][j] += grid[i][j - 1];
            else if (j === 0) grid[i][j] += grid[i - 1][j];
            else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    return grid[m - 1][n - 1];
};
```

```typescript [TypeScript]
function minPathSum(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            if (i === 0) grid[i][j] += grid[i][j - 1];
            else if (j === 0) grid[i][j] += grid[i - 1][j];
            else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    return grid[m - 1][n - 1];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，遍历整个网格。
- **空间复杂度**：`O(1)`（不计输入），原地修改。**



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（一维） | `O(m * n)` | `O(n)` | 不修改输入，推荐 |
| 原地修改 | `O(m * n)` | `O(1)` | 空间最优，改输入 |
