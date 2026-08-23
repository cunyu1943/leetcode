# [123. 买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/)



## 一、题目描述

给定一个数组，它的第 `i` 个元素是一支给定的股票在第 `i` 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 **两笔** 交易。

**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

**示例 1：**

```
输入：prices = [3,3,5,0,0,3,1,4]
输出：6
解释：在第 4 天（价格 = 0）买入，第 6 天（价格 = 3）卖出，利润 = 3；第 7 天（价格 = 1）买入，第 8 天（价格 = 4）卖出，利润 = 3。总利润 = 6。
```

**示例 2：**

```
输入：prices = [1,2,3,4,5]
输出：4
```

**提示：**

-   `1 <= prices.length <= 10^5`
-   `0 <= prices[i] <= 10^5`



## 二、解答方法

### 2.1 方法一：状态机动态规划

1. **思路**

最多两笔交易，用五个状态表示：`buy1`（第一次持有）、`sell1`（第一次不持有）、`buy2`（第二次持有）、`sell2`（第二次不持有）。逐天更新这四种持仓状态的最大利润，最终答案即 `sell2`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = -prices[0], sell1 = 0;
        int buy2 = -prices[0], sell2 = 0;
        for (int price : prices) {
            buy1 = Math.max(buy1, -price);
            sell1 = Math.max(sell1, buy1 + price);
            buy2 = Math.max(buy2, sell1 - price);
            sell2 = Math.max(sell2, buy2 + price);
        }
        return sell2;
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buy1 = sell1 = 0
        buy2 = sell2 = 0
        buy1 = -prices[0]
        buy2 = -prices[0]
        for price in prices:
            buy1 = max(buy1, -price)
            sell1 = max(sell1, buy1 + price)
            buy2 = max(buy2, sell1 - price)
            sell2 = max(sell2, buy2 + price)
        return sell2
```

```go [Go]
func maxProfit(prices []int) int {
    buy1, sell1 := -prices[0], 0
    buy2, sell2 := -prices[0], 0
    for _, price := range prices {
        buy1 = max(buy1, -price)
        sell1 = max(sell1, buy1+price)
        buy2 = max(buy2, sell1-price)
        sell2 = max(sell2, buy2+price)
    }
    return sell2
}
func max(a, b int) int { if a > b { return a }; return b }
```

```c [C]
int maxProfit(int* prices, int pricesSize) {
    int buy1 = -prices[0], sell1 = 0;
    int buy2 = -prices[0], sell2 = 0;
    for (int i = 0; i < pricesSize; i++) {
        int p = prices[i];
        buy1 = buy1 > -p ? buy1 : -p;
        sell1 = sell1 > buy1 + p ? sell1 : buy1 + p;
        buy2 = buy2 > sell1 - p ? buy2 : sell1 - p;
        sell2 = sell2 > buy2 + p ? sell2 : buy2 + p;
    }
    return sell2;
}
```

```cpp [C++]
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int buy1 = -prices[0], sell1 = 0;
        int buy2 = -prices[0], sell2 = 0;
        for (int price : prices) {
            buy1 = max(buy1, -price);
            sell1 = max(sell1, buy1 + price);
            buy2 = max(buy2, sell1 - price);
            sell2 = max(sell2, buy2 + price);
        }
        return sell2;
    }
};
```

```js [JavaScript]
var maxProfit = function (prices) {
    let buy1 = -prices[0], sell1 = 0;
    let buy2 = -prices[0], sell2 = 0;
    for (const price of prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }
    return sell2;
};
```

```ts [TypeScript]
function maxProfit(prices: number[]): number {
    let buy1 = -prices[0], sell1 = 0;
    let buy2 = -prices[0], sell2 = 0;
    for (const price of prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }
    return sell2;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，单次遍历。
- **空间复杂度**：`O(1)`，仅维护常数个状态变量。

### 2.2 方法二：两次扫描（前后缀最大利润）

1. **思路**

把数组在每一天切开：左侧用「一次交易最大利润」（`121` 题方法），右侧同理，两者相加取最大。需要两次遍历分别求前缀和后缀的最优值。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[] left = new int[n];
        int minPrice = prices[0];
        for (int i = 1; i < n; i++) {
            minPrice = Math.min(minPrice, prices[i]);
            left[i] = Math.max(left[i - 1], prices[i] - minPrice);
        }
        int[] right = new int[n];
        int maxPrice = prices[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            maxPrice = Math.max(maxPrice, prices[i]);
            right[i] = Math.max(right[i + 1], maxPrice - prices[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; i++) ans = Math.max(ans, left[i] + right[i]);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        n = len(prices)
        left = [0] * n
        min_p = prices[0]
        for i in range(1, n):
            min_p = min(min_p, prices[i])
            left[i] = max(left[i - 1], prices[i] - min_p)
        right = [0] * n
        max_p = prices[-1]
        for i in range(n - 2, -1, -1):
            max_p = max(max_p, prices[i])
            right[i] = max(right[i + 1], max_p - prices[i])
        return max(left[i] + right[i] for i in range(n))
```

```go [Go]
func maxProfit(prices []int) int {
    n := len(prices)
    left := make([]int, n)
    minP := prices[0]
    for i := 1; i < n; i++ {
        minP = min(minP, prices[i])
        left[i] = max(left[i-1], prices[i]-minP)
    }
    right := make([]int, n)
    maxP := prices[n-1]
    for i := n - 2; i >= 0; i-- {
        maxP = max(maxP, prices[i])
        right[i] = max(right[i+1], maxP-prices[i])
    }
    ans := 0
    for i := 0; i < n; i++ {
        ans = max(ans, left[i]+right[i])
    }
    return ans
}
func min(a, b int) int { if a < b { return a }; return b }
func max(a, b int) int { if a > b { return a }; return b }
```

```c [C]
int maxProfit(int* prices, int pricesSize) {
    int left[100000] = {0}, right[100000] = {0};
    int minP = prices[0];
    for (int i = 1; i < pricesSize; i++) {
        if (prices[i] < minP) minP = prices[i];
        left[i] = left[i-1] > prices[i]-minP ? left[i-1] : prices[i]-minP;
    }
    int maxP = prices[pricesSize-1];
    for (int i = pricesSize-2; i >= 0; i--) {
        if (prices[i] > maxP) maxP = prices[i];
        right[i] = right[i+1] > maxP-prices[i] ? right[i+1] : maxP-prices[i];
    }
    int ans = 0;
    for (int i = 0; i < pricesSize; i++) ans = ans > left[i]+right[i] ? ans : left[i]+right[i];
    return ans;
}
```

```cpp [C++]
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<int> left(n, 0), right(n, 0);
        int minP = prices[0];
        for (int i = 1; i < n; i++) {
            minP = min(minP, prices[i]);
            left[i] = max(left[i - 1], prices[i] - minP);
        }
        int maxP = prices[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            maxP = max(maxP, prices[i]);
            right[i] = max(right[i + 1], maxP - prices[i]);
        }
        int ans = 0;
        for (int i = 0; i < n; i++) ans = max(ans, left[i] + right[i]);
        return ans;
    }
};
```

```js [JavaScript]
var maxProfit = function (prices) {
    const n = prices.length;
    const left = new Array(n).fill(0);
    let minP = prices[0];
    for (let i = 1; i < n; i++) {
        minP = Math.min(minP, prices[i]);
        left[i] = Math.max(left[i - 1], prices[i] - minP);
    }
    const right = new Array(n).fill(0);
    let maxP = prices[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxP = Math.max(maxP, prices[i]);
        right[i] = Math.max(right[i + 1], maxP - prices[i]);
    }
    let ans = 0;
    for (let i = 0; i < n; i++) ans = Math.max(ans, left[i] + right[i]);
    return ans;
};
```

```ts [TypeScript]
function maxProfit(prices: number[]): number {
    const n = prices.length;
    const left: number[] = new Array(n).fill(0);
    let minP = prices[0];
    for (let i = 1; i < n; i++) {
        minP = Math.min(minP, prices[i]);
        left[i] = Math.max(left[i - 1], prices[i] - minP);
    }
    const right: number[] = new Array(n).fill(0);
    let maxP = prices[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        maxP = Math.max(maxP, prices[i]);
        right[i] = Math.max(right[i + 1], maxP - prices[i]);
    }
    let ans = 0;
    for (let i = 0; i < n; i++) ans = Math.max(ans, left[i] + right[i]);
    return ans;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(n)`，存储前后缀数组。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 状态机动态规划 | `O(n)` | `O(1)` | 空间最优，推荐 |
| 两次扫描（前后缀） | `O(n)` | `O(n)` | 思路直观易懂 |
