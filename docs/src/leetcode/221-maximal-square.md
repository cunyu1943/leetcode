# [221. 最大正方形](https://leetcode.cn/problems/maximal-square/)



## 一、题目描述

在一个由 `'0'` 和 `'1'` 组成的二维矩阵内，找到只包含 `'1'` 的最大正方形，并返回其面积。

**示例 1：**

```
输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
输出：4
解释：最大的全 1 正方形边长为 2，面积 4。
```

**示例 2：**

```
输入：matrix = [["0","1"],["1","0"]]
输出：1
```

**示例 3：**

```
输入：matrix = [["0"]]
输出：0
```

**提示：**

-   `m == matrix.length`
-   `n == matrix[i].length`
-   `1 <= m, n <= 300`
-   `matrix[i][j]` 为 `'0'` 或 `'1'`



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

`dp[i][j]` 表示以 `(i, j)` 为 **右下角** 的最大正方形边长。

- 若 `matrix[i][j] == '0'`，则 `dp[i][j] = 0`；
- 否则 `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`。

理由：要构成正方形，上方、左方、左斜上方三个方向都必须能构成边长至少为 `x-1` 的正方形，取三者最小值（木桶效应）+1。遍历中记录最大边长。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int maximalSquare(char[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] dp = new int[m + 1][n + 1];
        int maxSide = 0;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
                    maxSide = Math.max(maxSide, dp[i][j]);
                }
            }
        }
        return maxSide * maxSide;
    }
}
```

```python [Python]
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        max_side = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if matrix[i - 1][j - 1] == '1':
                    dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                    max_side = max(max_side, dp[i][j])
        return max_side * max_side
```

```go [Go]
func maximalSquare(matrix [][]byte) int {
    m, n := len(matrix), len(matrix[0])
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    maxSide := 0
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if matrix[i-1][j-1] == '1' {
                dp[i][j] = min(min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1]) + 1
                if dp[i][j] > maxSide {
                    maxSide = dp[i][j]
                }
            }
        }
    }
    return maxSide * maxSide
}

func min(a, b int) int { if a < b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        int maxSide = 0;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (matrix[i - 1][j - 1] == '1') {
                    dp[i][j] = min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]}) + 1;
                    maxSide = max(maxSide, dp[i][j]);
                }
            }
        }
        return maxSide * maxSide;
    }
};
```

```js [JavaScript]
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    let maxSide = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
};
```

```ts [TypeScript]
/**
 * @param {string[][]} matrix
 * @return {number}
 */
function maximalSquare(matrix: string[][]): number {
    const m = matrix.length, n = matrix[0].length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    let maxSide = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m × n)`。
- **空间复杂度**：`O(m × n)`（可优化为 `O(n)`）。

### 2.2 方法二：空间优化（一维 DP）

1. **思路**

`dp[i][j]` 只依赖「上一行的 `dp[j]`、`dp[j-1]`」和「左上角的旧值」。用一维数组 + 变量 `prev` 保存左上角即可，空间降到 `O(n)`。

2. **代码实现（Python）**

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        if not matrix:
            return 0
        n = len(matrix[0])
        dp = [0] * (n + 1)
        max_side = 0
        prev = 0
        for row in matrix:
            for j in range(1, n + 1):
                temp = dp[j]
                if row[j - 1] == '1':
                    dp[j] = min(dp[j], dp[j - 1], prev) + 1
                    max_side = max(max_side, dp[j])
                else:
                    dp[j] = 0
                prev = temp
        return max_side * max_side
```

3. **复杂度分析**

- **时间复杂度**：`O(m × n)`。
- **空间复杂度**：`O(n)`。

## 三、总结

| 方法 | 空间 | 特点 |
| ---- | ---- | ---- |
| 二维 DP | `O(m×n)` | 直观，推荐先掌握 |
| 一维 DP + prev | `O(n)` | 空间优化 |

核心状态转移：`dp[i][j] = min(上, 左, 左上) + 1`（木桶效应 —— 三个方向都够才能扩成正方形）。对比 `1277. 统计全为 1 的正方形子矩阵`（统计所有正方形个数，DP 定义相同，答案累加 `dp` 值之和）。
