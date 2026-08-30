# [375. 猜数字大小 II](https://leetcode.cn/problems/guess-number-higher-or-lower-ii/)

## 一、题目描述

在 `1 ~ n` 中选一个数字，你要通过「每次猜一个数 `x`，若不对则付 `x` 元」来猜中。若猜错，会告诉你偏大或偏小，缩小范围继续。求 **保证猜中所需的最少金钱**（最坏情况下的最小最大花费，即 Minimax）。

**示例：**
```
输入：n = 10   输出：16
解释：最优策略先猜 7，最坏花费 = 7 + max(cost(1..6), cost(8..10)) = 16
```

**提示：** `1 <= n <= 200`。

## 二、解答方法

### 方法一：区间 DP（Minimax）

**思路：** `dp[i][j]` = 在范围 `[i,j]` 内保证猜中所需的最小金钱。枚举猜 `x∈[i,j]`：付 `x` 元后，对手会让我们进入更坏的一边（`max(dp[i][x-1], dp[x+1][j])`），故 `dp[i][j] = min_{x}( x + max(dp[i][x-1], dp[x+1][j]) )`。区间长度从小到大填。

:::::: code-group

```java [Java]
class Solution {
    public int getMoneyAmount(int n) {
        int[][] dp = new int[n + 2][n + 2];   // dp[i][j] for [i,j]
        for (int len = 2; len <= n; len++) {
            for (int i = 1; i + len - 1 <= n; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int x = i; x <= j; x++)
                    dp[i][j] = Math.min(dp[i][j],
                        x + Math.max(dp[i][x - 1], dp[x + 1][j]));
            }
        }
        return dp[1][n];
    }
}
```

```python [Python]
class Solution:
    def getMoneyAmount(self, n: int) -> int:
        dp = [[0]*(n+2) for _ in range(n+2)]
        for length in range(2, n+1):
            for i in range(1, n-length+2):
                j = i + length - 1
                dp[i][j] = min(x + max(dp[i][x-1], dp[x+1][j]) for x in range(i, j+1))
        return dp[1][n]
```

```cpp [C++]
class Solution {
public:
    int getMoneyAmount(int n) {
        vector<vector<int>> dp(n+2, vector<int>(n+2, 0));
        for(int len=2;len<=n;len++)
            for(int i=1;i+len-1<=n;i++){
                int j=i+len-1; dp[i][j]=INT_MAX;
                for(int x=i;x<=j;x++)
                    dp[i][j]=min(dp[i][j], x+max(dp[i][x-1], dp[x+1][j]));
            }
        return dp[1][n];
    }
};
```

```go [Go]
func getMoneyAmount(n int) int {
    dp := make([][]int, n+2)
    for i := range dp { dp[i] = make([]int, n+2) }
    for length := 2; length <= n; length++ {
        for i := 1; i+length-1 <= n; i++ {
            j := i + length - 1
            dp[i][j] = 1<<30
            for x := i; x <= j; x++ {
                v := x + max(dp[i][x-1], dp[x+1][j])
                if v < dp[i][j] { dp[i][j] = v }
            }
        }
    }
    return dp[1][n]
}
func max(a, b int) int { if a>b { return a }; return b }
```

```js [JavaScript]
var getMoneyAmount = function (n) {
    const dp = Array.from({length:n+2},()=>new Array(n+2).fill(0));
    for (let len=2; len<=n; len++)
        for (let i=1; i+len-1<=n; i++){
            const j=i+len-1; dp[i][j]=Infinity;
            for (let x=i; x<=j; x++)
                dp[i][j]=Math.min(dp[i][j], x+Math.max(dp[i][x-1], dp[x+1][j]));
        }
    return dp[1][n];
};
```

::::::

**复杂度：** 时间 `O(n³)`，空间 `O(n²)`。

## 三、总结

区间 Minimax DP：`374` 的「最坏情况最小花费」版。对比 `374`（二分即可，因为每次能免费获得方向），本题每次猜测要付钱，故需 DP 求最优下注点。状态 `dp[i][j]` 表示范围 `[i,j]` 的最小最坏花费。同类：`464 我能赢吗`（状态压缩 Minimax）、`486 预测赢家`。
