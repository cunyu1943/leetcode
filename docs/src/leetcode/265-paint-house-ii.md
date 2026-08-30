# [265. 粉刷房子 II](https://leetcode.cn/problems/paint-house-ii/) [🔒 会员题]



## 一、题目描述

假如有一排房子，共 `n` 个，每个房子可以被粉刷成 `k` 种颜色中的一种，你需要粉刷所有房子并且 **相邻的两个房子颜色不能相同** 。

当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 `n x k` 的矩阵来表示的。

例如，`costs[0][0]` 表示第 0 号房子粉刷成第 0 号颜色的成本花费；`costs[1][2]` 表示第 1 号房子粉刷成第 2 号颜色的成本花费，以此类推。请你计算出 **粉刷完所有房子最少的花费成本** 。



**示例 1：**

```
输入: costs = [[1,5,3],[2,9,4]]
输出: 5
解释: 将 0 号房子粉刷成 0 号颜色，1 号房子粉刷成 2 号颜色。最少花费: 1 + 4 = 5;
     或者将 0 号房子粉刷成 2 号颜色，1 号房子粉刷成 0 号颜色。最少花费: 3 + 2 = 5。
```

**示例 2：**

```
输入: costs = [[1,3],[2,4]]
输出: 5
```

**提示：**

-   `costs.length == n`
-   `costs[i].length == k`
-   `1 <= n <= 100`
-   `2 <= k <= 20`
-   `1 <= costs[i][j] <= 20`

**进阶：** 您能否在 `O(nk)` 的时间复杂度下解决此问题？



## 二、解答方法

### 2.1 方法一：DP + 维护最小值与次小值（O(nk)）

1. **思路**

沿用 256 题的思路：`dp[i][c] = costs[i][c] + min(dp[i-1][c'] for c' != c)`。

若对每个 `c` 都遍历一遍上一行求「除自己外的最小值」，复杂度为 `O(nk²)`。

**优化关键**：对上一行，只需知道 **最小值 `min1`（及其颜色 `color1`）** 和 **次小值 `min2`**：

- 若当前颜色 `c != color1`（即最小值对应的颜色）→ 可用最小值：`dp[i][c] = costs[i][c] + min1`；
- 若 `c == color1`（不能与最小值同色）→ 只能用次小值：`dp[i][c] = costs[i][c] + min2`。

于是每行只需 `O(k)` 扫描，总复杂度 `O(nk)`，且空间可优化到 `O(1)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minCostII(int[][] costs) {
        int n = costs.length, k = costs[0].length;
        int prevMin1 = 0, prevMin2 = 0, prevColor1 = -1;   // 上一行的最小、次小、最小对应颜色

        for (int i = 0; i < n; i++) {
            int curMin1 = Integer.MAX_VALUE, curMin2 = Integer.MAX_VALUE, curColor1 = -1;
            for (int c = 0; c < k; c++) {
                // 排除与上一行最小同色的情况
                int cost = costs[i][c] + (c == prevColor1 ? prevMin2 : prevMin1);
                // 更新当前行的最小值与次小值
                if (cost < curMin1) {
                    curMin2 = curMin1;
                    curMin1 = cost;
                    curColor1 = c;
                } else if (cost < curMin2) {
                    curMin2 = cost;
                }
            }
            prevMin1 = curMin1;
            prevMin2 = curMin2;
            prevColor1 = curColor1;
        }
        return prevMin1;
    }
}
```

```python [Python]
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        n = len(costs)
        k = len(costs[0])
        prev_min1 = prev_min2 = 0        # 上一行最小值 / 次小值
        prev_color1 = -1                 # 上一行最小值对应的颜色

        for i in range(n):
            cur_min1 = cur_min2 = float('inf')
            cur_color1 = -1
            for c in range(k):
                # 若与上一行最小同色，则只能用次小值
                cost = costs[i][c] + (prev_min2 if c == prev_color1 else prev_min1)
                if cost < cur_min1:
                    cur_min2, cur_min1, cur_color1 = cur_min1, cost, c
                elif cost < cur_min2:
                    cur_min2 = cost
            prev_min1, prev_min2, prev_color1 = cur_min1, cur_min2, cur_color1

        return prev_min1
```

```go [Go]
func minCostII(costs [][]int) int {
    n, k := len(costs), len(costs[0])
    prevMin1, prevMin2, prevColor1 := 0, 0, -1

    for i := 0; i < n; i++ {
        curMin1, curMin2, curColor1 := 1<<30, 1<<30, -1
        for c := 0; c < k; c++ {
            cost := costs[i][c] + prevMin1
            if c == prevColor1 {
                cost = costs[i][c] + prevMin2
            }
            if cost < curMin1 {
                curMin2, curMin1, curColor1 = curMin1, cost, c
            } else if cost < curMin2 {
                curMin2 = cost
            }
        }
        prevMin1, prevMin2, prevColor1 = curMin1, curMin2, curColor1
    }
    return prevMin1
}
```

```cpp [C++]
class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        int n = costs.size(), k = costs[0].size();
        int prevMin1 = 0, prevMin2 = 0, prevColor1 = -1;

        for (int i = 0; i < n; i++) {
            int curMin1 = INT_MAX, curMin2 = INT_MAX, curColor1 = -1;
            for (int c = 0; c < k; c++) {
                int cost = costs[i][c] + (c == prevColor1 ? prevMin2 : prevMin1);
                if (cost < curMin1) {
                    curMin2 = curMin1;
                    curMin1 = cost;
                    curColor1 = c;
                } else if (cost < curMin2) {
                    curMin2 = cost;
                }
            }
            prevMin1 = curMin1;
            prevMin2 = curMin2;
            prevColor1 = curColor1;
        }
        return prevMin1;
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCostII = function (costs) {
    const n = costs.length, k = costs[0].length;
    let prevMin1 = 0, prevMin2 = 0, prevColor1 = -1;

    for (let i = 0; i < n; i++) {
        let curMin1 = Infinity, curMin2 = Infinity, curColor1 = -1;
        for (let c = 0; c < k; c++) {
            const cost = costs[i][c] + (c === prevColor1 ? prevMin2 : prevMin1);
            if (cost < curMin1) {
                curMin2 = curMin1;
                curMin1 = cost;
                curColor1 = c;
            } else if (cost < curMin2) {
                curMin2 = cost;
            }
        }
        prevMin1 = curMin1;
        prevMin2 = curMin2;
        prevColor1 = curColor1;
    }
    return prevMin1;
};
```

```ts [TypeScript]
/**
 * @param {number[][]} costs
 * @return {number}
 */
function minCostII(costs: number[][]): number {
    const n = costs.length, k = costs[0].length;
    let prevMin1 = 0, prevMin2 = 0, prevColor1 = -1;

    for (let i = 0; i < n; i++) {
        let curMin1 = Infinity, curMin2 = Infinity, curColor1 = -1;
        for (let c = 0; c < k; c++) {
            const cost = costs[i][c] + (c === prevColor1 ? prevMin2 : prevMin1);
            if (cost < curMin1) {
                curMin2 = curMin1;
                curMin1 = cost;
                curColor1 = c;
            } else if (cost < curMin2) {
                curMin2 = cost;
            }
        }
        prevMin1 = curMin1;
        prevMin2 = curMin2;
        prevColor1 = curColor1;
    }
    return prevMin1;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(nk)`（满足进阶要求）。
- **空间复杂度**：`O(1)`（滚动变量，不保留完整 DP 数组）。

### 2.2 方法二：朴素 DP（O(nk²)）

1. **思路**

直接按定义：`dp[i][c] = costs[i][c] + min(dp[i-1][c'] for c' != c)`，对每个颜色都扫描上一行所有颜色求最小值。

2. **代码实现（Python）**

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        n, k = len(costs), len(costs[0])
        prev = [0] * k
        for i in range(n):
            cur = [0] * k
            for c in range(k):
                cur[c] = costs[i][c] + min(prev[c2] for c2 in range(k) if c2 != c)
            prev = cur
        return min(prev)
```

3. **复杂度分析**

- **时间复杂度**：`O(nk²)`。
- **空间复杂度**：`O(k)`。

## 三、总结

| 方法 | 时间 | 空间 |
| ---- | ---- | ---- |
| 朴素 DP | `O(nk²)` | `O(k)` |
| 维护最小/次小值 | `O(nk)` | `O(1)`，推荐 |

从 256 题（k=3）到 265 题（k 任意），核心难点是：**如何在 `O(1)` 时间内求出「除某个位置外的最小值」**。

答案：**维护最小值 `min1` 与次小值 `min2`**：

| 当前颜色 | 可使用的上一行最优值 |
| -------- | -------------------- |
| `c != color1` | `min1` |
| `c == color1` | `min2` |

这一技巧在「序列 DP + 排除自身」类问题中非常通用（如 `1525. 字符串的好分割数目`）。注意每行要同时记录最小值对应的 **颜色下标**，以便下一行判断是否需要回退到次小值。
