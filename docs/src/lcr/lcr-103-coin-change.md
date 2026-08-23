# [LCR 103. 零钱兑换](https://leetcode.cn/problems/gaM7Ch/)



## 一、题目描述

给你一个整数数组 `coins` ，表示不同面额的硬币；以及一个整数 `amount` ，表示总金额。

计算并返回可以凑成总金额所需的 **最少的硬币个数** 。如果没有任何一种硬币组合能组成总金额，返回 `-1` 。

你可以认为每种硬币的数量是无限的。



**示例 1：**

```
输入：coins = [1, 2, 5], amount = 11
输出：3
解释：11 = 5 + 5 + 1
```

**示例 2：**

```
输入：coins = [2], amount = 3
输出：-1
```

**示例 3：**

```
输入：coins = [1], amount = 0
输出：0
```

**提示：**

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2³¹ - 1`
- `0 <= amount <= 10⁴`



## 二、解答方法

### 2.1 方法一：完全背包（动态规划）

1. **思路**

`dp[j]` 表示凑出金额 `j` 的最少硬币数：

```
dp[j] = min(dp[j], dp[j - coin] + 1)
```

完全背包：每种硬币无限取，内层正序遍历（每个硬币可重复使用）。初始 `dp[0] = 0`，其余为无穷大。时间 `O(amount · n)`，空间 `O(amount)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] = Math.min(dp[j], dp[j - coin] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

```python [Python]
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        for coin in coins:
            for j in range(coin, amount + 1):
                dp[j] = min(dp[j], dp[j - coin] + 1)
        return dp[amount] if dp[amount] <= amount else -1
```

```cpp [C++]
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int coin : coins)
            for (int j = coin; j <= amount; j++)
                dp[j] = min(dp[j], dp[j - coin] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```

```go [Go]
func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := range dp {
        dp[i] = amount + 1
    }
    dp[0] = 0
    for _, coin := range coins {
        for j := coin; j <= amount; j++ {
            if dp[j-coin]+1 < dp[j] {
                dp[j] = dp[j-coin] + 1
            }
        }
    }
    if dp[amount] > amount {
        return -1
    }
    return dp[amount]
}
```

```js [JavaScript]
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (const coin of coins) {
        for (let j = coin; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
};
```

```c [C]
#include <stdlib.h>

int coinChange(int* coins, int coinsSize, int amount) {
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    for (int i = 0; i <= amount; i++) dp[i] = amount + 1;
    dp[0] = 0;
    for (int i = 0; i < coinsSize; i++)
        for (int j = coins[i]; j <= amount; j++)
            if (dp[j - coins[i]] + 1 < dp[j]) dp[j] = dp[j - coins[i]] + 1;
    int res = dp[amount] > amount ? -1 : dp[amount];
    free(dp);
    return res;
}
```

```ts [TypeScript]
function coinChange(coins: number[], amount: number): number {
    const dp: number[] = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (const coin of coins) {
        for (let j = coin; j <= amount; j++) {
            dp[j] = Math.min(dp[j], dp[j - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(amount · n)`。
- **空间复杂度**：`O(amount)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 完全背包 DP | `O(amount·n)` | `O(amount)` | 标准解法 |

「最少硬币数」是完全背包求最小值：`dp[j] = min(dp[j], dp[j-coin]+1)`。内层正序遍历使每个硬币可无限复用；无法凑出时用哨兵值 `amount+1` 判断返回 `-1`。

