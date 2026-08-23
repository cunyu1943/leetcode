# [LCR 098. 不同路径](https://leetcode.cn/problems/2AoeFn/)



## 一、题目描述

一个机器人位于一个 `m x n` 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？



**示例 1：**

```
输入：m = 3, n = 7
输出：28
```

**示例 2：**

```
输入：m = 3, n = 2
输出：3
解释：从左上角开始，总共有 3 条路径可以到达右下角。
```

**示例 3：**

```
输入：m = 7, n = 3
输出：28
```

**提示：**

- `1 <= m, n <= 100`
- 题目数据保证答案小于等于 `2 * 10⁹`



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

设 `dp[i][j]` 为到达 `(i, j)` 的路径数。只能从上方或左方到达：

```
dp[i][j] = dp[i-1][j] + dp[i][j-1]
```

边界：第一行与第一列均为 1。用一维滚动数组优化。时间 `O(mn)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        java.util.Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}
```

```python [Python]
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for _ in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[n - 1]
```

```cpp [C++]
class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; i++)
            for (int j = 1; j < n; j++)
                dp[j] += dp[j - 1];
        return dp[n - 1];
    }
};
```

```go [Go]
func uniquePaths(m int, n int) int {
    dp := make([]int, n)
    for i := range dp {
        dp[i] = 1
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[j] += dp[j-1]
        }
    }
    return dp[n-1]
}
```

```js [JavaScript]
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    const dp = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
};
```

```c [C]
#include <stdlib.h>

int uniquePaths(int m, int n) {
    int* dp = (int*)malloc(n * sizeof(int));
    for (int j = 0; j < n; j++) dp[j] = 1;
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j - 1];
    int res = dp[n - 1];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function uniquePaths(m: number, n: number): number {
    const dp: number[] = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
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

「只能右/下走」决定了路径数的组合性质，用 DP 逐格累加上方与左方的路径数即可；滚动数组让空间降到 `O(n)`。

