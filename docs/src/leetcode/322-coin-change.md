# [322. 零钱兑换](https://leetcode.cn/problems/coin-change/)

## 一、题目描述

给你一个整数数组 `coins` 表示不同面额的硬币，以及一个整数 `amount` 表示总金额。计算凑成总金额所需的 **最少的硬币个数**；若无法凑出，返回 -1。你可以认为每种硬币无限个。

**示例：**
```
输入：coins = [1,2,5], amount = 11   输出：3（11 = 5+5+1）
输入：coins = [2], amount = 3         输出：-1
```

**提示：** `1 <= coins.length <= 12`，`1 <= coins[i] <= 2³¹-1`，`0 <= amount <= 10⁴`。

## 二、解答方法

### 方法一：动态规划（完全背包）

**思路：** `dp[a]` = 凑成金额 `a` 的最少硬币数。转移：`dp[a] = min(dp[a], dp[a-coin] + 1)`（对每个 coin，coin ≤ a）。初始化 `dp[0]=0`，其余 `+∞`。注意硬币可无限用 → 正序遍历金额即可（完全背包）。

:::::: code-group

```java [Java]
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++)
            for (int c : coins)
                if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

```python [Python]
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount+1] * (amount+1)
        dp[0] = 0
        for a in range(1, amount+1):
            for c in coins:
                if c <= a: dp[a] = min(dp[a], dp[a-c]+1)
        return dp[amount] if dp[amount] <= amount else -1
```

```cpp [C++]
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount+1, amount+1);
        dp[0] = 0;
        for (int a=1;a<=amount;a++)
            for (int c : coins)
                if (c <= a) dp[a] = min(dp[a], dp[a-c]+1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

```go [Go]
func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := range dp { dp[i] = amount+1 }
    dp[0] = 0
    for a := 1; a <= amount; a++ {
        for _, c := range coins {
            if c <= a && dp[a-c]+1 < dp[a] { dp[a] = dp[a-c]+1 }
        }
    }
    if dp[amount] > amount { return -1 }
    return dp[amount]
}
```

```js [JavaScript]
var coinChange = function (coins, amount) {
    const dp = new Array(amount+1).fill(amount+1);
    dp[0] = 0;
    for (let a=1; a<=amount; a++)
        for (const c of coins)
            if (c <= a) dp[a] = Math.min(dp[a], dp[a-c]+1);
    return dp[amount] > amount ? -1 : dp[amount];
};
```

::::::

**复杂度：** 时间 `O(amount · n)`，空间 `O(amount)`。

## 三、总结

完全背包求最小个数。关键：`dp[0]=0`，不可达用 `∞`（取 `amount+1` 哨兵）表示，最后判断是否更新。正序遍历金额实现「硬币可复用」。进阶：`518 零钱兑换 II` 求「组合数」而非最少个数（target 维度不同，求方案数用 `dp[a] += dp[a-coin]`）。务必区分「最少个数」与「方案数」两种 DP。
