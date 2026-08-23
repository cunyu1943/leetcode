# [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)



## 一、题目描述

给定一个数组 `prices`，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0`。

**示例 1：**

```
输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6 - 1 = 5 。
```

**示例 2：**

```
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

**提示：**

-   `1 <= prices.length <= 10^5`
-   `0 <= prices[i] <= 10^4`



## 二、解答方法

### 2.1 方法一：一次遍历（贪心）

1. **思路**

遍历价格数组，记录当前遇到的最低价格 `minPrice`，同时用当天价格减去最低价格更新最大利润 `maxProfit`。

由于卖出必须在买入之后，边遍历边维护「历史最低价」即可保证这一点，时间复杂度 `O(n)`。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit
```

```go [Go]
func maxProfit(prices []int) int {
    minPrice := math.MaxInt32
    maxProfit := 0
    for _, price := range prices {
        if price < minPrice {
            minPrice = price
        } else if price-minPrice > maxProfit {
            maxProfit = price - minPrice
        }
    }
    return maxProfit
}
```

```c [C]
int maxProfit(int* prices, int pricesSize) {
    int minPrice = 2147483647;
    int maxProfit = 0;
    for (int i = 0; i < pricesSize; i++) {
        if (prices[i] < minPrice) minPrice = prices[i];
        else if (prices[i] - minPrice > maxProfit) maxProfit = prices[i] - minPrice;
    }
    return maxProfit;
}
```

```cpp [C++]
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
};
```

```js [JavaScript]
var maxProfit = function (prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
};
```

```ts [TypeScript]
function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`，仅遍历一次数组。
- **空间复杂度**：`O(1)`，只使用常数个变量。

### 2.2 方法二：暴力枚举

1. **思路**

枚举所有可能的买入日 `i` 和卖出日 `j`（`j > i`），计算利润 `prices[j] - prices[i]`，取最大值。

该方法思路直观但会超时，仅用于理解问题。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int[] prices) {
        int maxProfit = 0;
        for (int i = 0; i < prices.length - 1; i++) {
            for (int j = i + 1; j < prices.length; j++) {
                maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
            }
        }
        return maxProfit;
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_profit = 0
        n = len(prices)
        for i in range(n):
            for j in range(i + 1, n):
                max_profit = max(max_profit, prices[j] - prices[i])
        return max_profit
```

```go [Go]
func maxProfit(prices []int) int {
    maxProfit := 0
    n := len(prices)
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            if prices[j]-prices[i] > maxProfit {
                maxProfit = prices[j] - prices[i]
            }
        }
    }
    return maxProfit
}
```

```c [C]
int maxProfit(int* prices, int pricesSize) {
    int maxProfit = 0;
    for (int i = 0; i < pricesSize - 1; i++) {
        for (int j = i + 1; j < pricesSize; j++) {
            if (prices[j] - prices[i] > maxProfit) maxProfit = prices[j] - prices[i];
        }
    }
    return maxProfit;
}
```

```cpp [C++]
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxProfit = 0;
        int n = prices.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                maxProfit = max(maxProfit, prices[j] - prices[i]);
            }
        }
        return maxProfit;
    }
};
```

```js [JavaScript]
var maxProfit = function (prices) {
    let maxProfit = 0;
    const n = prices.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
        }
    }
    return maxProfit;
};
```

```ts [TypeScript]
function maxProfit(prices: number[]): number {
    let maxProfit = 0;
    const n = prices.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            maxProfit = Math.max(maxProfit, prices[j] - prices[i]);
        }
    }
    return maxProfit;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(n^2)`，两层循环枚举所有买卖对。
- **空间复杂度**：`O(1)`。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 一次遍历（贪心） | `O(n)` | `O(1)` | 推荐，高效 |
| 暴力枚举 | `O(n^2)` | `O(1)` | 直观但会超时 |
