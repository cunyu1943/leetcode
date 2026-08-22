# [63. 不同路径 II](https://leetcode.cn/problems/unique-paths-ii/)



## 一、题目描述

一个机器人位于一个 `m x n` 网格的左上角。机器人每次只能向下或者向右移动一步。网格中有障碍物（用 `1` 表示），其余格子为 `0`。

机器人试图达到网格的右下角。问总共有多少条不同的路径？



**示例 1：**

```
输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
```

**示例 2：**

```
输入：obstacleGrid = [[0,1],[0,0]]
输出：1
```

**提示：**

-   `m == obstacleGrid.length`
-   `n == obstacleGrid[i].length`
-   `1 <= m, n <= 100`
-   `obstacleGrid[i][j]` 为 `0` 或 `1`



## 二、解答方法

### 2.1 方法一：动态规划（一维数组）


1. **思路**

`dp[j]` 表示当前行第 `j` 列的路径数。若当前格是障碍则 `dp[j] = 0`，否则 `dp[j] = dp[j] + dp[j-1]`。注意首列需特殊处理。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[] dp = new int[n];
        dp[0] = grid[0][0] == 1 ? 0 : 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}
```

```python [Python]
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [0] * n
        dp[0] = 1 if obstacleGrid[0][0] == 0 else 0
        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j - 1]
        return dp[-1]
```

```go [Go]
func uniquePathsWithObstacles(obstacleGrid [][]int) int {
    m, n := len(obstacleGrid), len(obstacleGrid[0])
    dp := make([]int, n)
    if obstacleGrid[0][0] == 0 { dp[0] = 1 }
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if obstacleGrid[i][j] == 1 {
                dp[j] = 0
            } else if j > 0 {
                dp[j] += dp[j-1]
            }
        }
    }
    return dp[n-1]
}
```

```c [C]
int uniquePathsWithObstacles(int** obstacleGrid, int obstacleGridSize, int* obstacleGridColSize) {
    int m = obstacleGridSize, n = obstacleGridColSize[0];
    int* dp = (int*)calloc(n, sizeof(int));
    dp[0] = obstacleGrid[0][0] == 1 ? 0 : 1;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (obstacleGrid[i][j] == 1) dp[j] = 0;
            else if (j > 0) dp[j] += dp[j - 1];
        }
    }
    int ans = dp[n - 1];
    free(dp);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n, 0);
        dp[0] = grid[0][0] == 1 ? 0 : 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
};
```

```javascript [JavaScript]
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length, n = obstacleGrid[0].length;
    const dp = new Array(n).fill(0);
    dp[0] = obstacleGrid[0][0] === 1 ? 0 : 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) dp[j] = 0;
            else if (j > 0) dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
};
```

```typescript [TypeScript]
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length, n = obstacleGrid[0].length;
    const dp: number[] = new Array(n).fill(0);
    dp[0] = obstacleGrid[0][0] === 1 ? 0 : 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) dp[j] = 0;
            else if (j > 0) dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，遍历整个网格。
- **空间复杂度**：`O(n)`**，一维数组。

### 2.2 方法二：动态规划（二维数组）


1. **思路**

直接用二维 `dp[i][j]` 表示到达 `(i, j)` 的路径数，对障碍格置 0，否则取上、左之和。逻辑最直观但空间略高。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int uniquePathsWithObstacles(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] dp = new int[m][n];
        for (int i = 0; i < m && grid[i][0] == 0; i++) dp[i][0] = 1;
        for (int j = 0; j < n && grid[0][j] == 0; j++) dp[0][j] = 1;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (grid[i][j] == 1) dp[i][j] = 0;
                else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
}
```

```python [Python]
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [[0] * n for _ in range(m)]
        for i in range(m):
            if obstacleGrid[i][0] == 0: dp[i][0] = 1
            else: break
        for j in range(n):
            if obstacleGrid[0][j] == 0: dp[0][j] = 1
            else: break
        for i in range(1, m):
            for j in range(1, n):
                if obstacleGrid[i][j] == 0:
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        return dp[-1][-1]
```

```go [Go]
func uniquePathsWithObstacles(obstacleGrid [][]int) int {
    m, n := len(obstacleGrid), len(obstacleGrid[0])
    dp := make([][]int, m)
    for i := range dp { dp[i] = make([]int, n) }
    for i := 0; i < m && obstacleGrid[i][0] == 0; i++ { dp[i][0] = 1 }
    for j := 0; j < n && obstacleGrid[0][j] == 0; j++ { dp[0][j] = 1 }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            if obstacleGrid[i][j] == 0 {
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
            }
        }
    }
    return dp[m-1][n-1]
}
```

```c [C]
int uniquePathsWithObstacles(int** obstacleGrid, int obstacleGridSize, int* obstacleGridColSize) {
    int m = obstacleGridSize, n = obstacleGridColSize[0];
    int** dp = (int**)malloc(sizeof(int*) * m);
    for (int i = 0; i < m; i++) dp[i] = (int*)calloc(n, sizeof(int));
    for (int i = 0; i < m && obstacleGrid[i][0] == 0; i++) dp[i][0] = 1;
    for (int j = 0; j < n && obstacleGrid[0][j] == 0; j++) dp[0][j] = 1;
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            if (obstacleGrid[i][j] == 0) dp[i][j] = dp[i-1][j] + dp[i][j-1];
    int ans = dp[m-1][n-1];
    for (int i = 0; i < m; i++) free(dp[i]);
    free(dp);
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        for (int i = 0; i < m && grid[i][0] == 0; i++) dp[i][0] = 1;
        for (int j = 0; j < n && grid[0][j] == 0; j++) dp[0][j] = 1;
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                if (grid[i][j] == 0) dp[i][j] = dp[i-1][j] + dp[i][j-1];
        return dp[m-1][n-1];
    }
};
```

```javascript [JavaScript]
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length, n = obstacleGrid[0].length;
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) dp[i][0] = 1;
    for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) dp[0][j] = 1;
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            if (obstacleGrid[i][j] === 0) dp[i][j] = dp[i-1][j] + dp[i][j-1];
    return dp[m-1][n-1];
};
```

```typescript [TypeScript]
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length, n = obstacleGrid[0].length;
    const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) dp[i][0] = 1;
    for (let j = 0; j < n && obstacleGrid[0][j] === 0; j++) dp[0][j] = 1;
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            if (obstacleGrid[i][j] === 0) dp[i][j] = dp[i-1][j] + dp[i][j-1];
    return dp[m-1][n-1];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，遍历整个网格。
- **空间复杂度**：`O(m * n)`**，二维数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划（一维） | `O(m * n)` | `O(n)` | 空间更优，推荐 |
| 动态规划（二维） | `O(m * n)` | `O(m * n)` | 逻辑直观，易理解 |
