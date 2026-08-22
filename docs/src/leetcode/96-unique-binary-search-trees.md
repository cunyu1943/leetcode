# [96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)



## 一、题目描述

给你一个整数 `n`，求以 `1` 到 `n` 为节点所组成的 **二叉搜索树** 有多少种？

**示例 1：**

```
输入：n = 3
输出：5
```

**示例 2：**

```
输入：n = 1
输出：1
```

**提示：**

-   `1 <= n <= 19`



## 二、解答方法

### 2.1 方法一：动态规划


1. **思路**

以 `i` 为根节点时，左子树由 `1..i-1` 组成（共 `i-1` 个节点），右子树由 `i+1..n` 组成（共 `n-i` 个节点）。设 `dp[i]` 为 `i` 个节点能构成的 BST 数量，则有 `dp[i] = sum(dp[j-1] * dp[i-j])`。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int numTrees(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] += dp[j - 1] * dp[i - j];
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[0] = 1
        for i in range(1, n + 1):
            for j in range(1, i + 1):
                dp[i] += dp[j - 1] * dp[i - j]
        return dp[n]
```

```go [Go]
func numTrees(n int) int {
    dp := make([]int, n+1)
    dp[0] = 1
    for i := 1; i <= n; i++ {
        for j := 1; j <= i; j++ {
            dp[i] += dp[j-1] * dp[i-j]
        }
    }
    return dp[n]
}
```

```c [C]
int numTrees(int n) {
    int dp[n + 1];
    dp[0] = 1;
    for (int i = 1; i <= n; i++) {
        dp[i] = 0;
        for (int j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];
}
```

```cpp [C++]
class Solution {
public:
    int numTrees(int n) {
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                dp[i] += dp[j - 1] * dp[i - j];
            }
        }
        return dp[n];
    }
};
```

```javascript [JavaScript]
var numTrees = function(n) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];
};
```

```typescript [TypeScript]
function numTrees(n: number): number {
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，双重循环。
- **空间复杂度**：`O(n)`，dp 数组。

### 2.2 方法二：数学公式（卡特兰数）


1. **思路**

该问题的解即为第 `n` 个卡特兰数，可直接由公式 `C(n) = C(2n, n) / (n + 1)` 计算。


2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int numTrees(int n) {
        long res = 1;
        for (int i = 0; i < n; i++) {
            res = res * (2L * n - i) / (i + 1);
        }
        return (int) (res / (n + 1));
    }
}
```

```python [Python]
class Solution:
    def numTrees(self, n: int) -> int:
        res = 1
        for i in range(n):
            res = res * (2 * n - i) // (i + 1)
        return res // (n + 1)
```

```go [Go]
func numTrees(n int) int {
    res := 1
    for i := 0; i < n; i++ {
        res = res * (2*n - i) / (i + 1)
    }
    return res / (n + 1)
}
```

```c [C]
int numTrees(int n) {
    long res = 1;
    for (int i = 0; i < n; i++) {
        res = res * (2L * n - i) / (i + 1);
    }
    return (int)(res / (n + 1));
}
```

```cpp [C++]
class Solution {
public:
    int numTrees(int n) {
        long res = 1;
        for (int i = 0; i < n; i++) {
            res = res * (2L * n - i) / (i + 1);
        }
        return (int)(res / (n + 1));
    }
};
```

```javascript [JavaScript]
var numTrees = function(n) {
    let res = 1;
    for (let i = 0; i < n; i++) {
        res = res * (2 * n - i) / (i + 1);
    }
    return Math.floor(res / (n + 1));
};
```

```typescript [TypeScript]
function numTrees(n: number): number {
    let res: number = 1;
    for (let i = 0; i < n; i++) {
        res = res * (2 * n - i) / (i + 1);
    }
    return Math.floor(res / (n + 1));
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单循环。
- **空间复杂度**：`O(1)`，仅常数变量。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(n^2)` | `O(n)` | 思路直观，易推导 |
| 数学公式（卡特兰数） | `O(n)` | `O(1)` | 计算最快，需知道公式 |
