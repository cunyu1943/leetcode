# [279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)

## 一、题目描述

给你一个整数 `n` ，返回 **和为 `n` 的完全平方数的最少数量** 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值为 `1` 的 `2` 次幂，`2` 的 `2` 次幂，`3` 的 `2` 次幂，依此类推。并且 `1` 也算作完全平方数。

**示例：**

```
输入：n = 12   输出：3
解释：12 = 4 + 4 + 4（3 个完全平方数）
输入：n = 13   输出：2
解释：13 = 4 + 9
```

**提示：** `1 <= n <= 10⁴`

## 二、解答方法

### 方法一：动态规划（完全背包）

**思路：** 把「完全平方数」看作物品（1, 4, 9, ...），每个可重复使用，求凑成 `n` 的最少个数。状态 `dp[i]` = 凑成 i 的最少平方数个数。

`dp[i] = min(dp[i - j*j] + 1)`，其中 `j*j <= i`。初始化 `dp[0] = 0`，其余为 `∞`。

:::::: code-group

```java [Java]
class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j * j <= i; j++) {
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
            }
        }
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def numSquares(self, n: int) -> int:
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        for i in range(1, n + 1):
            j = 1
            while j * j <= i:
                dp[i] = min(dp[i], dp[i - j * j] + 1)
                j += 1
        return dp[n]
```

```cpp [C++]
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j * j <= i; j++)
                dp[i] = min(dp[i], dp[i - j * j] + 1);
        return dp[n];
    }
};
```

```go [Go]
func numSquares(n int) int {
    dp := make([]int, n+1)
    for i := range dp { dp[i] = 1<<30 }
    dp[0] = 0
    for i := 1; i <= n; i++ {
        for j := 1; j*j <= i; j++ {
            if dp[i-j*j]+1 < dp[i] {
                dp[i] = dp[i-j*j] + 1
            }
        }
    }
    return dp[n]
}
```

```js [JavaScript]
var numSquares = function (n) {
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    return dp[n];
};
```

::::::

**复杂度：** 时间 `O(n √n)`，空间 `O(n)`。

### 方法二：数学定理（四平方数定理 / 更快）

**思路：** 拉格朗日四平方数定理：任何数可由最多 4 个平方数组成。先判是否 `n = a²`（返回 1）或 `n = a²+b²`（返回 2）；再判是否形如 `4^k(8m+7)`（此时为 4）；否则为 3。

```python [Python]
class Solution:
    def numSquares(self, n: int) -> int:
        import math
        # 1 个平方数
        if int(math.isqrt(n)) ** 2 == n:
            return 1
        # 2 个平方数
        for i in range(1, int(math.isqrt(n)) + 1):
            if int(math.isqrt(n - i * i)) ** 2 == n - i * i:
                return 2
        # 形如 4^k(8m+7) → 4 个
        while n % 4 == 0:
            n //= 4
        if n % 8 == 7:
            return 4
        return 3
```

**复杂度：** 时间 `O(√n)`，空间 `O(1)`。

## 三、总结

本质是 **完全背包求最少物品数**。DP 写法通用易懂；数学法（四平方数定理）可将时间降到 `O(√n)`，是面试加分项。注意判断「2 个平方数」用 `n - i*i` 再开平方比对。本题与 `322 零钱兑换` 同属「完全背包最小个数」题型。
