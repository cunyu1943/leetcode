# [LCR 088. 使用最小花费爬楼梯](https://leetcode.cn/problems/GzCJip/)



## 一、题目描述

数组的每个下标作为一个阶梯，第 `i` 个阶梯对应着一个非负数的体力花费值 `cost[i]`（下标从 `0` 开始）。

每当爬上一个阶梯都要花费对应的体力值，一旦支付了相应的体力值，就可以选择向上爬一个阶梯或者爬两个阶梯。

请找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 `0` 或 `1` 的元素作为初始阶梯。



**示例 1：**

```
输入：cost = [10, 15, 20]
输出：15
解释：你将从下标为 1 的阶梯开始，支付 15 ，向上爬两个阶梯，到达楼梯顶部。总花费为 15 。
```

**示例 2：**

```
输入：cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
输出：6
解释：你将从下标为 0 的阶梯开始。
- 支付 1 ，向上爬两个阶梯，到达下标为 2 的阶梯。
- 支付 1 ，向上爬两个阶梯，到达下标为 4 的阶梯。
- 支付 1 ，向上爬两个阶梯，到达下标为 6 的阶梯。
- 支付 1 ，向上爬一个阶梯，到达下标为 7 的阶梯。
- 支付 1 ，向上爬两个阶梯，到达下标为 9 的阶梯。
- 支付 1 ，向上爬一个阶梯，到达楼梯顶部。
总花费为 6 。
```

**提示：**

- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`



## 二、解答方法

### 2.1 方法一：动态规划（滚动数组）

1. **思路**

设 `dp[i]` 为「到达第 `i` 个台阶并支付其体力后」的最小花费。由于可以从 `i-1` 或 `i-2` 跳上来：

```
dp[i] = min(dp[i-1], dp[i-2]) + cost[i]
```

最后一步跨到楼顶可能来自 `n-1` 或 `n-2`，答案取二者较小。用两个变量滚动优化到 `O(1)` 空间。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length;
        int a = cost[0], b = cost[1];
        for (int i = 2; i < n; i++) {
            int c = Math.min(a, b) + cost[i];
            a = b;
            b = c;
        }
        return Math.min(a, b);
    }
}
```

```python [Python]
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        a, b = cost[0], cost[1]
        for i in range(2, n):
            a, b = b, min(a, b) + cost[i]
        return min(a, b)
```

```cpp [C++]
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int a = cost[0], b = cost[1];
        for (int i = 2; i < n; i++) {
            int c = min(a, b) + cost[i];
            a = b;
            b = c;
        }
        return min(a, b);
    }
};
```

```go [Go]
func minCostClimbingStairs(cost []int) int {
    n := len(cost)
    a, b := cost[0], cost[1]
    for i := 2; i < n; i++ {
        c := a
        if b < a {
            c = b
        }
        c += cost[i]
        a, b = b, c
    }
    if a < b {
        return a
    }
    return b
}
```

```js [JavaScript]
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
    const n = cost.length;
    let a = cost[0], b = cost[1];
    for (let i = 2; i < n; i++) {
        const c = Math.min(a, b) + cost[i];
        a = b;
        b = c;
    }
    return Math.min(a, b);
};
```

```c [C]
int minCostClimbingStairs(int* cost, int costSize) {
    int a = cost[0], b = cost[1];
    for (int i = 2; i < costSize; i++) {
        int c = (a < b ? a : b) + cost[i];
        a = b;
        b = c;
    }
    return a < b ? a : b;
}
```

```ts [TypeScript]
function minCostClimbingStairs(cost: number[]): number {
    const n = cost.length;
    let a = cost[0], b = cost[1];
    for (let i = 2; i < n; i++) {
        const c = Math.min(a, b) + cost[i];
        a = b;
        b = c;
    }
    return Math.min(a, b);
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`，滚动变量。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(n)` | `O(1)` | 标准解法 |

状态转移 `dp[i] = min(dp[i-1], dp[i-2]) + cost[i]` 描述「从 i-1 或 i-2 到达并支付第 i 阶」的最小花费；楼顶可能是倒数第一或第二阶，取较小值即可。

