# [313. 超级丑数](https://leetcode.cn/problems/super-ugly-number/)

## 一、题目描述

**超级丑数** 是质因数都只出现在给定质数集合 `primes` 中的正整数。返回第 `n` 个超级丑数。

**示例：**
```
输入：n = 12, primes = [2,7,13,19]
输出：32
解释：前 12 个超级丑数为 [1,2,4,7,8,13,14,16,19,26,28,32]
```

**提示：** `1 <= n <= 10⁵`，`1 <= primes.length <= 100`，`2 <= primes[i] <= 1000`，`primes` 严格递增。

## 二、解答方法

### 方法一：多指针（dp + 指针数组）

**思路：** 与 `264 丑数 II` 类似，只是质因数从 `{2,3,5}` 推广为 `primes`（k 个）。维护 `dp[i]` 为第 i+1 个丑数，`ptr[j]` 指向每个质因数下次乘的位置。每步取 `min(primes[j] * dp[ptr[j]])` 作为下一个丑数，并把达到最小值的指针前移（注意去重：多个指针同值时都前移）。

:::::: code-group

```java [Java]
class Solution {
    public int nthSuperUglyNumber(int n, int[] primes) {
        int[] dp = new int[n]; dp[0] = 1;
        int[] ptr = new int[primes.length];
        for (int i = 1; i < n; i++) {
            int min = Integer.MAX_VALUE;
            for (int j = 0; j < primes.length; j++) min = Math.min(min, primes[j] * dp[ptr[j]]);
            dp[i] = min;
            for (int j = 0; j < primes.length; j++)
                if (primes[j] * dp[ptr[j]] == min) ptr[j]++;   // 去重
        }
        return dp[n - 1];
    }
}
```

```python [Python]
class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        dp = [1] * n
        ptr = [0] * len(primes)
        for i in range(1, n):
            dp[i] = min(primes[j] * dp[ptr[j]] for j in range(len(primes)))
            for j in range(len(primes)):
                if primes[j] * dp[ptr[j]] == dp[i]: ptr[j] += 1
        return dp[n-1]
```

```cpp [C++]
class Solution {
public:
    int nthSuperUglyNumber(int n, vector<int>& primes) {
        vector<int> dp(n, 1), ptr(primes.size(), 0);
        for (int i=1;i<n;i++){
            int mn = INT_MAX;
            for (int j=0;j<primes.size();j++) mn = min(mn, primes[j]*dp[ptr[j]]);
            dp[i] = mn;
            for (int j=0;j<primes.size();j++) if (primes[j]*dp[ptr[j]]==mn) ptr[j]++;
        }
        return dp[n-1];
    }
};
```

```go [Go]
func nthSuperUglyNumber(n int, primes []int) int {
    dp := make([]int, n); dp[0] = 1
    ptr := make([]int, len(primes))
    for i := 1; i < n; i++ {
        mn := 1 << 30
        for j := range primes { if v := primes[j]*dp[ptr[j]]; v < mn { mn = v } }
        dp[i] = mn
        for j := range primes { if primes[j]*dp[ptr[j]] == mn { ptr[j]++ } }
    }
    return dp[n-1]
}
```

```js [JavaScript]
var nthSuperUglyNumber = function (n, primes) {
    const dp = new Array(n).fill(1);
    const ptr = new Array(primes.length).fill(0);
    for (let i=1;i<n;i++){
        let mn = Infinity;
        for (let j=0;j<primes.length;j++) mn = Math.min(mn, primes[j]*dp[ptr[j]]);
        dp[i] = mn;
        for (let j=0;j<primes.length;j++) if (primes[j]*dp[ptr[j]]===mn) ptr[j]++;
    }
    return dp[n-1];
};
```

::::::

**复杂度：** 时间 `O(n·k)`（k=primes 长度），空间 `O(n+k)`。

## 三、总结

`264 丑数 II` 的推广（质因数集合可变）。核心仍是「多指针 + 取最小 + 去重」。当 k 大、n 大时可改用「优先队列/小顶堆」维护候选，但堆法需处理重复（同值多次弹出），指针法更稳妥。务必记得同值指针全部前移去重。
