# [188. 买卖股票的最佳时机 IV](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)



## 一、题目描述

给你一个整数数组 `prices` 和一个整数 `k` ，其中 `prices[i]` 是某支给定的股票在第 `i` 天的价格。

设计一个算法来计算你所能获取的 **最大利润** 。你最多可以完成 `k` 笔交易。也就是说，你最多可以买 `k` 次，卖 `k` 次。

**注意：** 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。



**示例 1：**

```
输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天 (股票价格 = 2) 买入，第 2 天 (股票价格 = 4) 卖出，这笔交易所能获得利润 = 4-2 = 2。
```

**示例 2：**

```
输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天买入 (价格 = 2)，第 3 天卖出 (价格 = 6)，利润 = 4；
     随后在第 5 天买入 (价格 = 0)，第 6 天卖出 (价格 = 3)，利润 = 3。总共 7。
```

**提示：**

-   `0 <= k <= 100`
-   `0 <= prices.length <= 1000`
-   `0 <= prices[i] <= 1000`

**进阶：** 当 `k` 很大（超过 `n/2`）时，等价于可 unlimited 交易（122 题），可提前剪枝避免 `O(nk)` 超时。



## 二、解答方法

### 2.1 方法一：动态规划（状态压缩）

1. **思路**

定义 `buy[j]` 表示完成 `j` 笔交易、当前持有股票的最大利润；`sell[j]` 表示完成 `j` 笔交易、当前不持有股票的最大利润。状态转移：

```
buy[j]  = max(buy[j],  sell[j-1] - price)   // 第 j 次买入
sell[j] = max(sell[j], buy[j]   + price)    // 第 j 次卖出
```

从后往前更新 `j`（避免同一次交易被重复使用）。最终答案为 `sell[k]`。当 `k > n/2` 时退化为贪心 unlimited 交易。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int k, int[] prices) {
        if (prices.length < 2 || k == 0) return 0;
        int n = prices.length;
        if (k > n / 2) { // 退化为无限次交易
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            }
            return profit;
        }
        int[] buy = new int[k + 1];
        int[] sell = new int[k + 1];
        Arrays.fill(buy, Integer.MIN_VALUE);
        for (int price : prices) {
            for (int j = 1; j <= k; j++) {
                buy[j] = Math.max(buy[j], sell[j - 1] - price);
                sell[j] = Math.max(sell[j], buy[j] + price);
            }
        }
        return sell[k];
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        if len(prices) < 2 or k == 0:
            return 0
        n = len(prices)
        if k > n // 2:
            return sum(prices[i] - prices[i - 1] for i in range(1, n) if prices[i] > prices[i - 1])
        buy = [float('-inf')] * (k + 1)
        sell = [0] * (k + 1)
        for price in prices:
            for j in range(1, k + 1):
                buy[j] = max(buy[j], sell[j - 1] - price)
                sell[j] = max(sell[j], buy[j] + price)
        return sell[k]
```

```go [Go]
func maxProfit(k int, prices []int) int {
    n := len(prices)
    if n < 2 || k == 0 {
        return 0
    }
    if k > n/2 {
        profit := 0
        for i := 1; i < n; i++ {
            if prices[i] > prices[i-1] {
                profit += prices[i] - prices[i-1]
            }
        }
        return profit
    }
    buy := make([]int, k+1)
    sell := make([]int, k+1)
    for j := 0; j <= k; j++ {
        buy[j] = -1 << 30
    }
    for _, price := range prices {
        for j := 1; j <= k; j++ {
            if buy[j] < sell[j-1]-price {
                buy[j] = sell[j-1] - price
            }
            if sell[j] < buy[j]+price {
                sell[j] = buy[j] + price
            }
        }
    }
    return sell[k]
}
```

```cpp [C++]
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n < 2 || k == 0) return 0;
        if (k > n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++)
                if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            return profit;
        }
        vector<int> buy(k + 1, INT_MIN), sell(k + 1, 0);
        for (int price : prices) {
            for (int j = 1; j <= k; j++) {
                buy[j] = max(buy[j], sell[j - 1] - price);
                sell[j] = max(sell[j], buy[j] + price);
            }
        }
        return sell[k];
    }
};
```

```js [JavaScript]
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
    const n = prices.length;
    if (n < 2 || k === 0) return 0;
    if (k > n / 2) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
    const buy = new Array(k + 1).fill(-Infinity);
    const sell = new Array(k + 1).fill(0);
    for (const price of prices) {
        for (let j = 1; j <= k; j++) {
            buy[j] = Math.max(buy[j], sell[j - 1] - price);
            sell[j] = Math.max(sell[j], buy[j] + price);
        }
    }
    return sell[k];
};
```

```ts [TypeScript]
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(k: number, prices: number[]): number {
    const n = prices.length;
    if (n < 2 || k === 0) return 0;
    if (k > n / 2) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
    const buy = new Array(k + 1).fill(-Infinity);
    const sell = new Array(k + 1).fill(0);
    for (const price of prices) {
        for (let j = 1; j <= k; j++) {
            buy[j] = Math.max(buy[j], sell[j - 1] - price);
            sell[j] = Math.max(sell[j], buy[j] + price);
        }
    }
    return sell[k];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(nk)`（剪枝后大 k 退化为 `O(n)`）。
- **空间复杂度**：`O(k)`。

## 三、总结

本题是股票系列最一般化形式（最多 k 次交易）。核心 DP 状态 `buy[j]`/`sell[j]` 用一维滚动数组即可。注意 `k > n/2` 的剪枝（等价于无限次），否则 `O(nk)` 在 k 大时会超时。后续 309（含冷冻期）、714（含手续费）都是在此基础上加约束。
