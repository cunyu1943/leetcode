# [309. 最佳买卖股票时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)

## 一、题目描述

给定一个整数数组 `prices`，其中 `prices[i]` 是第 `i` 天的股票价格。你可以多次买卖，但：
- 卖出后 **第二天（冷冻期）不能买**；
- 同一天只能持有一支股票。
求最大利润。

**示例：**
```
输入：prices = [1,2,3,0,2]   输出：3
解释：买入(1)→卖出(2) 利润1；冷冻；买入(0)→卖出(2) 利润2；合计 3
```

**提示：** `1 <= prices.length <= 5000`，`0 <= prices[i] <= 1000`。

## 二、解答方法

### 方法一：状态机 DP

**思路：** 每天三种状态：`hold`（持有股票）、`sold`（当天刚卖出，次日冷冻）、`rest`（冷冻/空仓可买）。转移：
- `hold = max(hold, rest - price)`（继续持有 / 买入）
- `sold = hold + price`（当天卖出）
- `rest = max(rest, sold)`（维持空仓/刚结束冷冻）
答案 = `max(rest, sold)`。

:::::: code-group

```java [Java]
class Solution {
    public int maxProfit(int[] prices) {
        int hold = -prices[0], sold = Integer.MIN_VALUE, rest = 0;
        for (int p : prices) {
            int prevHold = hold, prevSold = sold, prevRest = rest;
            hold = Math.max(prevHold, prevRest - p);
            sold = prevHold + p;
            rest = Math.max(prevRest, prevSold);
        }
        return Math.max(sold, rest);
    }
}
```

```python [Python]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        hold, sold, rest = -prices[0], float('-inf'), 0
        for p in prices:
            hold, sold, rest = max(hold, rest - p), hold + p, max(rest, sold)
        return max(sold, rest)
```

```cpp [C++]
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int hold = -prices[0], sold = INT_MIN, rest = 0;
        for (int p : prices) {
            int ph = hold, ps = sold, pr = rest;
            hold = max(ph, pr - p);
            sold = ph + p;
            rest = max(pr, ps);
        }
        return max(sold, rest);
    }
};
```

```go [Go]
func maxProfit(prices []int) int {
    hold, sold, rest := -prices[0], -1<<31, 0
    for _, p := range prices {
        ph, ps, pr := hold, sold, rest
        hold = max(ph, pr-p)
        sold = ph + p
        rest = max(pr, ps)
    }
    if sold > rest { return sold }
    return rest
}
func max(a, b int) int { if a > b { return a }; return b }
```

```js [JavaScript]
var maxProfit = function (prices) {
    let hold = -prices[0], sold = -Infinity, rest = 0;
    for (const p of prices) {
        const ph = hold, ps = sold, pr = rest;
        hold = Math.max(ph, pr - p);
        sold = ph + p;
        rest = Math.max(pr, ps);
    }
    return Math.max(sold, rest);
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(1)`。

## 三、总结

含冷冻期的股票买卖用「三状态 DP」：持有/刚卖出/空仓。关键约束是「卖出后次日不能买」→ 用 `sold` 状态隔离一天。对比 `714 买卖股票含手续费`（无冷冻但有手续费，状态只需 hold/rest 两态）。通用套路：把约束翻译成状态转移即可。
