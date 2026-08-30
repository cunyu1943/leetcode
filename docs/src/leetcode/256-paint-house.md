# [256. 粉刷房子](https://leetcode.cn/problems/paint-house/) [🔒 会员题]



## 一、题目描述

假如有一排房子，共 `n` 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且 **相邻的两个房子颜色不能相同** 。

当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 `n x 3` 的正整数矩阵 `costs` 来表示的。

例如，`costs[0][0]` 表示第 0 号房子粉刷成红色的成本花费；`costs[1][2]` 表示第 1 号房子粉刷成绿色的花费，以此类推。

请计算出 **粉刷完所有房子最少的花费成本** 。



**示例 1：**

```
输入: costs = [[17,2,17],[16,16,5],[14,3,19]]
输出: 10
解释: 将 0 号房子粉刷成蓝色，1 号房子粉刷成绿色，2 号房子粉刷成蓝色。
     最少花费: 2 + 5 + 3 = 10。
```

**示例 2：**

```
输入: costs = [[7,6,2]]
输出: 2
```

**提示：**

-   `costs.length == n`
-   `costs[i].length == 3`
-   `1 <= n <= 100`
-   `1 <= costs[i][j] <= 20`



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

`dp[i][c]` 表示粉刷到第 `i` 号房子、且第 `i` 号房子涂颜色 `c` 时的最小总花费。

状态转移（相邻房子颜色不能相同）：

```
dp[i][0] = costs[i][0] + min(dp[i-1][1], dp[i-1][2])
dp[i][1] = costs[i][1] + min(dp[i-1][0], dp[i-1][2])
dp[i][2] = costs[i][2] + min(dp[i-1][0], dp[i-1][1])
```

答案为 `min(dp[n-1][0], dp[n-1][1], dp[n-1][2])`。可用滚动数组把空间优化到 `O(1)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int minCost(int[][] costs) {
        int n = costs.length;
        // 滚动数组：只保留上一行的三个状态
        int prev0 = 0, prev1 = 0, prev2 = 0;
        for (int i = 0; i < n; i++) {
            int cur0 = costs[i][0] + Math.min(prev1, prev2);
            int cur1 = costs[i][1] + Math.min(prev0, prev2);
            int cur2 = costs[i][2] + Math.min(prev0, prev1);
            prev0 = cur0; prev1 = cur1; prev2 = cur2;
        }
        return Math.min(Math.min(prev0, prev1), prev2);
    }
}
```

```python [Python]
class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        prev = [0, 0, 0]                 # 上一行 dp
        for r, b, g in costs:
            prev = [
                r + min(prev[1], prev[2]),
                b + min(prev[0], prev[2]),
                g + min(prev[0], prev[1]),
            ]
        return min(prev)
```

```go [Go]
func minCost(costs [][]int) int {
    prev0, prev1, prev2 := 0, 0, 0
    for _, c := range costs {
        cur0 := c[0] + min(prev1, prev2)
        cur1 := c[1] + min(prev0, prev2)
        cur2 := c[2] + min(prev0, prev1)
        prev0, prev1, prev2 = cur0, cur1, cur2
    }
    return min(min(prev0, prev1), prev2)
}

func min(a, b int) int { if a < b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int minCost(vector<vector<int>>& costs) {
        int prev0 = 0, prev1 = 0, prev2 = 0;
        for (auto& c : costs) {
            int cur0 = c[0] + min(prev1, prev2);
            int cur1 = c[1] + min(prev0, prev2);
            int cur2 = c[2] + min(prev0, prev1);
            prev0 = cur0; prev1 = cur1; prev2 = cur2;
        }
        return min({prev0, prev1, prev2});
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
    let [prev0, prev1, prev2] = [0, 0, 0];
    for (const [r, b, g] of costs) {
        const cur0 = r + Math.min(prev1, prev2);
        const cur1 = b + Math.min(prev0, prev2);
        const cur2 = g + Math.min(prev0, prev1);
        [prev0, prev1, prev2] = [cur0, cur1, cur2];
    }
    return Math.min(prev0, prev1, prev2);
};
```

```ts [TypeScript]
/**
 * @param {number[][]} costs
 * @return {number}
 */
function minCost(costs: number[][]): number {
    let [prev0, prev1, prev2] = [0, 0, 0];
    for (const [r, b, g] of costs) {
        const cur0 = r + Math.min(prev1, prev2);
        const cur1 = b + Math.min(prev0, prev2);
        const cur2 = g + Math.min(prev0, prev1);
        [prev0, prev1, prev2] = [cur0, cur1, cur2];
    }
    return Math.min(prev0, prev1, prev2);
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`（颜色数固定为 3）。
- **空间复杂度**：`O(1)`（滚动数组）。

### 2.2 方法二：原地修改 costs（空间再优化）

1. **思路**

直接在 `costs` 数组上累加，把 `costs[i][c]` 更新为「粉刷到第 i 号房子且涂颜色 c 的最小总花费」，完全不需要额外数组。

2. **代码实现（Python）**

```python
class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        for i in range(1, len(costs)):
            costs[i][0] += min(costs[i - 1][1], costs[i - 1][2])
            costs[i][1] += min(costs[i - 1][0], costs[i - 1][2])
            costs[i][2] += min(costs[i - 1][0], costs[i - 1][1])
        return min(costs[-1])
```

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`（原地修改）。

## 三、总结

经典的 **多状态 DP（状态机 DP）** 入门题：

```
状态：dp[i][c] = 第 i 号房子涂颜色 c 时的最小总花费
转移：dp[i][c] = costs[i][c] + min(dp[i-1][c'] for c' != c)
```

由于颜色只有 3 种，转移时直接写出「排除自身颜色后取另外两个的最小值」即可。

延伸：
- **265. 粉刷房子 II**：颜色数推广到 `k` 种。此时不能用「另外两个取 min」的硬编码，需要维护 **最小值与次小值** 才能把复杂度控制在 `O(nk)`；
- **276. 栅栏涂色**：约束改为「最多允许两个相邻同色」。
