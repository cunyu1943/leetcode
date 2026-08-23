# [120. 三角形最小路径和](https://leetcode.cn/problems/triangle/)

## 一、题目描述

给定一个三角形 `triangle` ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点指的是下标与上一层结点下标相同或者等于上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 `i` ，那么下一步可以移动到下一行的下标 `i` 或 `i+1` 。

**示例 1：**

```
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
```

**示例 2：**

```
输入：triangle = [[-10]]
输出：-10
```

**提示：**

- `1 <= triangle.length <= 200`
- `triangle[0].length == 1`
- `triangle[i].length == triangle[i-1].length + 1`
- `-10^4 <= triangle[i][j] <= 10^4`

**进阶：**

- 你可以只使用 `O(n)` 的额外空间（`n` 为三角形的总行数）来解决这个问题吗？

## 二、解答方法

### 2.1 方法一：二维动态规划（自顶向下）

1. **思路**

定义 `dp[i][j]` 为从三角形顶部到达第 `i` 行第 `j` 列的最小路径和。

- 初始：`dp[0][0] = triangle[0][0]`
- 对于每一行，第一列只能从上一行第一列转移：`dp[i][0] = dp[i-1][0] + triangle[i][0]`
- 对于最后一列（`j == i`），只能从上一行最后一列转移：`dp[i][i] = dp[i-1][i-1] + triangle[i][i]`
- 对于中间列：`dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]`

最后答案为最后一行 `dp[n-1][j]` 的最小值。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[][] dp = new int[n][n];
        dp[0][0] = triangle.get(0).get(0);
        for (int i = 1; i < n; i++) {
            dp[i][0] = dp[i-1][0] + triangle.get(i).get(0);
            for (int j = 1; j < i; j++) {
                dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j]) + triangle.get(i).get(j);
            }
            dp[i][i] = dp[i-1][i-1] + triangle.get(i).get(i);
        }
        int min = dp[n-1][0];
        for (int j = 1; j < n; j++) {
            min = Math.min(min, dp[n-1][j]);
        }
        return min;
    }
}
```

```python [Python]
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = [[0] * n for _ in range(n)]
        dp[0][0] = triangle[0][0]
        for i in range(1, n):
            dp[i][0] = dp[i-1][0] + triangle[i][0]
            for j in range(1, i):
                dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]
            dp[i][i] = dp[i-1][i-1] + triangle[i][i]
        return min(dp[n-1])
```

```go [Go]
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n)
    }
    dp[0][0] = triangle[0][0]
    for i := 1; i < n; i++ {
        dp[i][0] = dp[i-1][0] + triangle[i][0]
        for j := 1; j < i; j++ {
            dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]
        }
        dp[i][i] = dp[i-1][i-1] + triangle[i][i]
    }
    ans := dp[n-1][0]
    for j := 1; j < n; j++ {
        if dp[n-1][j] < ans {
            ans = dp[n-1][j]
        }
    }
    return ans
}
func min(a, b int) int { if a < b { return a }; return b }
```

```c [C]
int minimumTotal(int** triangle, int triangleSize, int* triangleColSize) {
    int n = triangleSize;
    int dp[200][200] = {0};
    dp[0][0] = triangle[0][0];
    for (int i = 1; i < n; i++) {
        dp[i][0] = dp[i-1][0] + triangle[i][0];
        for (int j = 1; j < i; j++) {
            dp[i][j] = (dp[i-1][j-1] < dp[i-1][j] ? dp[i-1][j-1] : dp[i-1][j]) + triangle[i][j];
        }
        dp[i][i] = dp[i-1][i-1] + triangle[i][i];
    }
    int ans = dp[n-1][0];
    for (int j = 1; j < n; j++) {
        if (dp[n-1][j] < ans) ans = dp[n-1][j];
    }
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        dp[0][0] = triangle[0][0];
        for (int i = 1; i < n; i++) {
            dp[i][0] = dp[i-1][0] + triangle[i][0];
            for (int j = 1; j < i; j++) {
                dp[i][j] = min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j];
            }
            dp[i][i] = dp[i-1][i-1] + triangle[i][i];
        }
        int ans = dp[n-1][0];
        for (int j = 1; j < n; j++) ans = min(ans, dp[n-1][j]);
        return ans;
    }
};
```

```js [JavaScript]
var minimumTotal = function(triangle) {
    const n = triangle.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));
    dp[0][0] = triangle[0][0];
    for (let i = 1; i < n; i++) {
        dp[i][0] = dp[i-1][0] + triangle[i][0];
        for (let j = 1; j < i; j++) {
            dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j];
        }
        dp[i][i] = dp[i-1][i-1] + triangle[i][i];
    }
    let ans = dp[n-1][0];
    for (let j = 1; j < n; j++) ans = Math.min(ans, dp[n-1][j]);
    return ans;
};
```

```ts [TypeScript]
function minimumTotal(triangle: number[][]): number {
    const n = triangle.length;
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    dp[0][0] = triangle[0][0];
    for (let i = 1; i < n; i++) {
        dp[i][0] = dp[i-1][0] + triangle[i][0];
        for (let j = 1; j < i; j++) {
            dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j];
        }
        dp[i][i] = dp[i-1][i-1] + triangle[i][i];
    }
    let ans = dp[n-1][0];
    for (let j = 1; j < n; j++) ans = Math.min(ans, dp[n-1][j]);
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，其中 `n` 为三角形的行数。
- **空间复杂度**：`O(n^2)`，存储整个 DP 表。

---

### 2.2 方法二：一维 DP（自底向上，空间优化 O(n)）

1. **思路**

从三角形的底部开始向上计算，使用一维数组 `dp` 表示当前行到下一行的最小路径和。对于第 `i` 行，`dp[j]` 表示从第 `i` 行第 `j` 列到达底部的最小路径和。

转移：`dp[j] = triangle[i][j] + min(dp[j], dp[j+1])`（因为下一行的 `j` 和 `j+1` 对应）

初始时，`dp` 为三角形最后一行的值，然后从倒数第二行向上迭代更新。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = Math.min(dp[j], dp[j + 1]) + triangle.get(i).get(j);
            }
        }
        return dp[0];
    }
}
```

```python [Python]
class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)
        dp = [0] * (n + 1)
        for i in range(n - 1, -1, -1):
            for j in range(i + 1):
                dp[j] = min(dp[j], dp[j + 1]) + triangle[i][j]
        return dp[0]
```

```go [Go]
func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    dp := make([]int, n+1)
    for i := n - 1; i >= 0; i-- {
        for j := 0; j <= i; j++ {
            dp[j] = min(dp[j], dp[j+1]) + triangle[i][j]
        }
    }
    return dp[0]
}
func min(a, b int) int { if a < b { return a }; return b }
```

```c [C]
int minimumTotal(int** triangle, int triangleSize, int* triangleColSize) {
    int n = triangleSize;
    int dp[201] = {0};
    for (int i = n - 1; i >= 0; i--) {
        for (int j = 0; j <= i; j++) {
            dp[j] = (dp[j] < dp[j+1] ? dp[j] : dp[j+1]) + triangle[i][j];
        }
    }
    return dp[0];
}
```

```cpp [C++]
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = min(dp[j], dp[j+1]) + triangle[i][j];
            }
        }
        return dp[0];
    }
};
```

```js [JavaScript]
var minimumTotal = function(triangle) {
    const n = triangle.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = Math.min(dp[j], dp[j+1]) + triangle[i][j];
        }
    }
    return dp[0];
};
```

```ts [TypeScript]
function minimumTotal(triangle: number[][]): number {
    const n = triangle.length;
    const dp: number[] = new Array(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = Math.min(dp[j], dp[j+1]) + triangle[i][j];
        }
    }
    return dp[0];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`。
- **空间复杂度**：`O(n)`，满足进阶要求。

---

## 三、总结

| 方法                | 时间复杂度 | 空间复杂度 | 特点               |
| ------------------- | ---------- | ---------- | ------------------ |
| 二维 DP（自顶向下） | `O(n^2)`   | `O(n^2)`   | 直观，适合理解     |
| 一维 DP（自底向上） | `O(n^2)`   | `O(n)`     | **推荐**，空间最优 |

**推荐**：面试中首选 **方法二（一维 DP）**，代码简洁且空间复杂度低。自底向上的转移方程更简洁，且无需处理边界情况。
