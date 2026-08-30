# [343. 整数拆分](https://leetcode.cn/problems/integer-break/)

## 一、题目描述

给定一个正整数 `n`，将其拆分为 **至少两个** 正整数之和，使这些整数的乘积最大。返回最大乘积。

**示例：**
```
输入：n = 2   输出：1（1+1 → 1×1=1）
输入：n = 10  输出：36（3+3+2+2 或 3×3×4 → 36）
```

**提示：** `2 <= n <= 58`。

## 二、解答方法

### 方法一：动态规划

**思路：** `dp[i]` = 拆分整数 `i` 的最大乘积。转移：对 `j` 从 1 到 i/2，`dp[i] = max(dp[i], j * (i-j), j * dp[i-j])`（`i-j` 可不再拆或继续拆）。`dp[1]=1` 基准。

:::::: code-group

```java [Java]
class Solution {
    public int integerBreak(int n) {
        int[] dp = new int[n + 1];
        dp[1] = 1;
        for (int i = 2; i <= n; i++)
            for (int j = 1; j <= i / 2; j++)
                dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]));
        return dp[n];
    }
}
```

```python [Python]
class Solution:
    def integerBreak(self, n: int) -> int:
        dp = [0]*(n+1); dp[1] = 1
        for i in range(2, n+1):
            for j in range(1, i//2+1):
                dp[i] = max(dp[i], j*(i-j), j*dp[i-j])
        return dp[n]
```

```cpp [C++]
class Solution {
public:
    int integerBreak(int n) {
        vector<int> dp(n+1, 0); dp[1]=1;
        for(int i=2;i<=n;i++)
            for(int j=1;j<=i/2;j++)
                dp[i]=max({dp[i], j*(i-j), j*dp[i-j]});
        return dp[n];
    }
};
```

```go [Go]
func integerBreak(n int) int {
    dp := make([]int, n+1); dp[1] = 1
    for i := 2; i <= n; i++ {
        for j := 1; j <= i/2; j++ {
            v := j*(i-j); if j*dp[i-j] > v { v = j*dp[i-j] }
            if v > dp[i] { dp[i] = v }
        }
    }
    return dp[n]
}
```

```js [JavaScript]
var integerBreak = function (n) {
    const dp = new Array(n+1).fill(0); dp[1] = 1;
    for (let i=2;i<=n;i++)
        for (let j=1;j<=i/2;j++)
            dp[i] = Math.max(dp[i], j*(i-j), j*dp[i-j]);
    return dp[n];
};
```

::::::

### 方法二：数学（贪心拆 3）

**思路：** 数学证明：尽量拆成 `3`，余 1 时拆成 `3...×2×2`（因 `3×1 < 2×2`）。`n==2→1, n==3→2`；否则 `n=3k+r`：`r=0→3^k`, `r=1→3^(k-1)×4`, `r=2→3^k×2`。

:::::: code-group

```java [Java]
class Solution {
    public int integerBreak(int n) {
        if (n == 2) return 1;
        if (n == 3) return 2;
        int k = n / 3, r = n % 3;
        if (r == 0) return (int) Math.pow(3, k);
        if (r == 1) return (int) Math.pow(3, k - 1) * 4;
        return (int) Math.pow(3, k) * 2;
    }
}
```

```python [Python]
class Solution:
    def integerBreak(self, n: int) -> int:
        if n == 2: return 1
        if n == 3: return 2
        k, r = divmod(n, 3)
        if r == 0: return 3**k
        if r == 1: return 3**(k-1)*4
        return 3**k*2
```

```cpp [C++]
class Solution {
public:
    int integerBreak(int n) {
        if (n==2) return 1; if (n==3) return 2;
        int k=n/3, r=n%3;
        if (r==0) return pow(3,k);
        if (r==1) return pow(3,k-1)*4;
        return pow(3,k)*2;
    }
};
```

```go [Go]
func integerBreak(n int) int {
    if n == 2 { return 1 }
    if n == 3 { return 2 }
    k, r := n/3, n%3
    if r == 0 { return pow3(k) }
    if r == 1 { return pow3(k-1)*4 }
    return pow3(k)*2
}
func pow3(k int) int { res := 1; for i:=0;i<k;i++ { res *= 3 }; return res }
```

```js [JavaScript]
var integerBreak = function (n) {
    if (n === 2) return 1;
    if (n === 3) return 2;
    const k = Math.floor(n/3), r = n%3;
    if (r === 0) return 3**k;
    if (r === 1) return 3**(k-1)*4;
    return 3**k*2;
};
```

::::::

**复杂度：** 方法一 `O(n²)`，方法二 `O(1)`。

## 三、总结

DP 能解但慢；数学最优解证明「尽可能多拆 3」。关键细节：`n%3==1` 时把一块 3+1 换成 2+2（乘积更大）。与 `279 完全平方数`、`96 不同的二叉搜索树` 同属「拆分求极值」。面试若允许数学结论可直接 `O(1)`。
