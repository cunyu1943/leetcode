# [122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)



## 一、题目描述

给你一个整数数组 `prices`，其中 `prices[i]` 表示某支股票第 `i` 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候 **最多** 只能持有 **一股** 股票。你也可以先购买，然后在 **同一天** 出售。

返回你能获得的 **最大** 利润。

**示例 1：**

```
输入：prices = [7,1,5,3,6,4]
输出：7
解释：在第 2 天买入（价格 = 1），第 3 天卖出（价格 = 5），利润 = 4；第 4 天买入（价格 = 3），第 5 天卖出（价格 = 6），利润 = 3。总利润 7。
```

**示例 2：**

```
输入：prices = [1,2,3,4,5]
输出：4
```

**提示：**

-   `1 <= prices.length <= 3 * 10^4`
-   `0 <= prices[i] <= 10^4`



## 二、解答方法

### 2.1 方法一：贪心（收集所有上升段）

1. **思路**

由于可以多次交易且不限次数，只要后一天价格高于前一天，就可以在前一天买入、后一天卖出赚取差价。把所有可能的正差价累加即为最大利润。

等价于收集所有 `prices[i] - prices[i-1] > 0` 的区间。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        return sum(max(prices[i] - prices[i - 1], 0) for i in range(1, len(prices)))
```

```go [Go]
func maxProfit(prices []int) int {
    profit := 0
    for i := 1; i < len(prices); i++ {
        if prices[i] > prices[i-1] {
            profit += prices[i] - prices[i-1]
        }
    }
    return profit
}
```

```c [C]
int maxProfit(int* prices, int pricesSize) {
    int profit = 0;
    for (int i = 1; i < pricesSize; i++) {
        if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
    }
    return profit;
}
```

```cpp [C++]
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
};
```

```js [JavaScript]
var maxProfit = function (prices) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
};
```

```ts [TypeScript]
function maxProfit(prices: number[]): number {
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

### 2.2 方法二：动态规划

1. **思路**

定义 `dp[i][0]` 为第 `i` 天不持有股票的最大利润，`dp[i][1]` 为第 `i` 天持有股票的最大利润。通过状态转移即可求解，思路更通用（可扩展为含手续费、冷冻期等变体）。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] dp = new int[n][2];
        dp[0][0] = 0;
        dp[0][1] = -prices[0];
        for (int i = 1; i < n; i++) {
            dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
        }
        return dp[n - 1][0];
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [[0, 0] for _ in range(n)]
        dp[0][1] = -prices[0]
        for i in range(1, n):
            dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i])
            dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i])
        return dp[n - 1][0]
```

```go [Go]
func maxProfit(prices []int) int {
    n := len(prices)
    dp := make([][2]int, n)
    dp[0][1] = -prices[0]
    for i := 1; i < n; i++ {
        dp[i][0] = max(dp[i-1][0], dp[i-1][1]+prices[i])
        dp[i][1] = max(dp[i-1][1], dp[i-1][0]-prices[i])
    }
    return dp[n-1][0]
}
func max(a, b int) int { if a > b { return a }; return b }
```

```c [C]
int maxProfit(int* prices, int pricesSize) {
    int dp0 = 0, dp1 = -prices[0];
    for (int i = 1; i < pricesSize; i++) {
        int t0 = dp0 > dp1 + prices[i] ? dp0 : dp1 + prices[i];
        int t1 = dp1 > dp0 - prices[i] ? dp1 : dp0 - prices[i];
        dp0 = t0; dp1 = t1;
    }
    return dp0;
}
```

```cpp [C++]
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> dp(n, vector<int>(2));
        dp[0][1] = -prices[0];
        for (int i = 1; i < n; i++) {
            dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
            dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
        }
        return dp[n - 1][0];
    }
};
```

```js [JavaScript]
var maxProfit = function (prices) {
    const n = prices.length;
    const dp = Array.from({ length: n }, () => [0, 0]);
    dp[0][1] = -prices[0];
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }
    return dp[n - 1][0];
};
```

```ts [TypeScript]
function maxProfit(prices: number[]): number {
    const n = prices.length;
    const dp: number[][] = Array.from({ length: n }, () => [0, 0]);
    dp[0][1] = -prices[0];
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    }
    return dp[n - 1][0];
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，可优化为 `O(1)`（如 C 语言实现）。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 贪心（上升段累加） | `O(n)` | `O(1)` | 简洁高效，推荐 |
| 动态规划 | `O(n)` | `O(n)` | 通用，易扩展变体 |
