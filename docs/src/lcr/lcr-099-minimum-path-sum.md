# [LCR 099. 最小路径和](https://leetcode.cn/problems/0i0mDW/)



## 一、题目描述

给定一个包含非负整数的 `m x n` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：** 一个机器人每次只能向下或者向右移动一步。



**示例 1：**

```
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
```

**示例 2：**

```
输入：grid = [[1,2,3],[4,5,6]]
输出：12
```

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 200`



## 二、解答方法

### 2.1 方法一：动态规划（原地/滚动）

1. **思路**

设 `dp[i][j]` 为到达 `(i, j)` 的最小路径和，只能从上方或左方来：

```
dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
```

边界：第一行只能从左来，第一列只能从上来。可原地修改 `grid` 或用一维滚动数组。时间 `O(mn)`，空间 `O(1)` 或 `O(n)`。

2. **代码实现**

::::::: code-group

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
                dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
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
        dp = [0] * n
        dp[0] = grid[0][0]
        for j in range(1, n):
            dp[j] = dp[j - 1] + grid[0][j]
        for i in range(1, m):
            dp[0] += grid[i][0]
            for j in range(1, n):
                dp[j] = min(dp[j], dp[j - 1]) + grid[i][j]
        return dp[n - 1]
```

```cpp [C++]
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> dp(n, 0);
        dp[0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
        for (int i = 1; i < m; i++) {
            dp[0] += grid[i][0];
            for (int j = 1; j < n; j++)
                dp[j] = min(dp[j], dp[j - 1]) + grid[i][j];
        }
        return dp[n - 1];
    }
};
```

```go [Go]
func minPathSum(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dp := make([]int, n)
    dp[0] = grid[0][0]
    for j := 1; j < n; j++ {
        dp[j] = dp[j-1] + grid[0][j]
    }
    for i := 1; i < m; i++ {
        dp[0] += grid[i][0]
        for j := 1; j < n; j++ {
            if dp[j] < dp[j-1] {
                dp[j] += grid[i][j]
            } else {
                dp[j] = dp[j-1] + grid[i][j]
            }
        }
    }
    return dp[n-1]
}
```

```js [JavaScript]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    const m = grid.length, n = grid[0].length;
    const dp = new Array(n).fill(0);
    dp[0] = grid[0][0];
    for (let j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
    for (let i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (let j = 1; j < n; j++) {
            dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
        }
    }
    return dp[n - 1];
};
```

```c [C]
#include <stdlib.h>

int minPathSum(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize, n = gridColSize[0];
    int* dp = (int*)malloc(n * sizeof(int));
    dp[0] = grid[0][0];
    for (int j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
    for (int i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (int j = 1; j < n; j++) {
            int t = dp[j] < dp[j - 1] ? dp[j] : dp[j - 1];
            dp[j] = t + grid[i][j];
        }
    }
    int res = dp[n - 1];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function minPathSum(grid: number[][]): number {
    const m = grid.length, n = grid[0].length;
    const dp: number[] = new Array(n).fill(0);
    dp[0] = grid[0][0];
    for (let j = 1; j < n; j++) dp[j] = dp[j - 1] + grid[0][j];
    for (let i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (let j = 1; j < n; j++) {
            dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
        }
    }
    return dp[n - 1];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(mn)`。
- **空间复杂度**：`O(n)`，滚动数组。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(mn)` | `O(n)` | 标准解法 |

与「不同路径」同模板：`dp[i][j]` 由上方与左方取更小者递推。滚动数组逐行更新时注意 `dp[j]`（旧的上方值）与 `dp[j-1]`（新的左方值）的语义。

