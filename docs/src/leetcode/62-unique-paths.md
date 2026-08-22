# [62. 不同路径](https://leetcode.cn/problems/unique-paths/)



## 一、题目描述

一个机器人位于一个 `m x n` 网格的左上角。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。

问总共有多少条不同的路径？



**示例 1：**

```
输入：m = 3, n = 7
输出：28
```

**示例 2：**

```
输入：m = 3, n = 3
输出：6
```

**提示：**

-   `1 <= m, n <= 100`
-   题目数据保证答案小于等于 `2 * 10^9`



## 二、解答方法

### 2.1 方法一：动态规划


1. **思路**

`dp[i][j]` 表示到达 `(i, j)` 的路径数，转移 `dp[i][j] = dp[i-1][j] + dp[i][j-1]`，可压缩为一维数组。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
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
        return dp[-1]
```

```go [Go]
func uniquePaths(m int, n int) int {
    dp := make([]int, n)
    for i := range dp { dp[i] = 1 }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[j] += dp[j-1]
        }
    }
    return dp[n-1]
}
```

```c [C]
int uniquePaths(int m, int n) {
    int* dp = (int*)malloc(sizeof(int) * n);
    for (int i = 0; i < n; i++) dp[i] = 1;
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j - 1];
    int ans = dp[n - 1];
    free(dp);
    return ans;
}
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

```javascript [JavaScript]
var uniquePaths = function(m, n) {
    const dp = new Array(n).fill(1);
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            dp[j] += dp[j - 1];
    return dp[n - 1];
};
```

```typescript [TypeScript]
function uniquePaths(m: number, n: number): number {
    const dp: number[] = new Array(n).fill(1);
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            dp[j] += dp[j - 1];
    return dp[n - 1];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m * n)`**，遍历整个网格。
- **空间复杂度**：`O(n)`**，一维数组。

### 2.2 方法二：组合数学


1. **思路**

从左上到右下共需走 `m-1` 次向下、`n-1` 次向右，总计 `m+n-2` 步，从中选 `m-1`（或 `n-1`）步向下，答案为组合数 `C(m+n-2, m-1)`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int uniquePaths(int m, int n) {
        long res = 1;
        int k = Math.min(m - 1, n - 1);
        for (int i = 1; i <= k; i++) {
            res = res * (m - 1 + n - 1 - i + 1) / i;
        }
        return (int) res;
    }
}
```

```python [Python]
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        k = min(m - 1, n - 1)
        res = 1
        for i in range(1, k + 1):
            res = res * (m - 1 + n - 1 - i + 1) // i
        return res
```

```go [Go]
func uniquePaths(m int, n int) int {
    k := m - 1
    if n-1 < k { k = n - 1 }
    res := 1
    for i := 1; i <= k; i++ {
        res = res * (m - 1 + n - 1 - i + 1) / i
    }
    return res
}
```

```c [C]
int uniquePaths(int m, int n) {
    int k = (m - 1 < n - 1) ? (m - 1) : (n - 1);
    long long res = 1;
    for (int i = 1; i <= k; i++) {
        res = res * (m - 1 + n - 1 - i + 1) / i;
    }
    return (int)res;
}
```

```cpp [C++]
class Solution {
public:
    int uniquePaths(int m, int n) {
        int k = min(m - 1, n - 1);
        long long res = 1;
        for (int i = 1; i <= k; i++) {
            res = res * (m - 1 + n - 1 - i + 1) / i;
        }
        return (int)res;
    }
};
```

```javascript [JavaScript]
var uniquePaths = function(m, n) {
    const k = Math.min(m - 1, n - 1);
    let res = 1;
    for (let i = 1; i <= k; i++) {
        res = res * (m - 1 + n - 1 - i + 1) / i;
    }
    return res;
};
```

```typescript [TypeScript]
function uniquePaths(m: number, n: number): number {
    const k = Math.min(m - 1, n - 1);
    let res = 1;
    for (let i = 1; i <= k; i++) {
        res = res * (m - 1 + n - 1 - i + 1) / i;
    }
    return res;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(min(m, n))`**，只需计算组合数。
- **空间复杂度**：`O(1)`**，只用常数变量。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(m * n)` | `O(n)` | 通用，易理解 |
| 组合数学 | `O(min(m, n))` | `O(1)` | 最优，需防溢出 |
