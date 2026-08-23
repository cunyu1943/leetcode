# [LCR 091. 粉刷房子](https://leetcode.cn/problems/JEj789/)



## 一、题目描述

假如有一排房子，共 `n` 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。

当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 `n x 3` 的正整数矩阵 `costs` 来表示的。

例如，`costs[0][0]` 表示第 `0` 号房子粉刷成红色的成本花费；`costs[1][2]` 表示第 `1` 号房子粉刷成绿色的成本，以此类推。

请计算出粉刷完所有房子最少的花费成本。



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

- `costs.length == n`
- `costs[i].length == 3`
- `1 <= n <= 100`
- `1 <= costs[i][j] <= 20`



## 二、解答方法

### 2.1 方法一：动态规划

1. **思路**

设 `dp[i][j]` 为「第 `i` 个房子刷成颜色 `j` 时的累计最小花费」。相邻房子颜色不能相同，所以：

```
dp[i][j] = costs[i][j] + min(dp[i-1][k])，k ≠ j
```

- 第 `i` 行刷红色：`min(上一行蓝, 上一行绿) + costs[i][0]`；
- 依次类推。

用 3 个变量滚动压缩空间。时间 `O(n)`，空间 `O(1)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int minCost(int[][] costs) {
        int n = costs.length;
        int r = costs[0][0], b = costs[0][1], g = costs[0][2];
        for (int i = 1; i < n; i++) {
            int nr = Math.min(b, g) + costs[i][0];
            int nb = Math.min(r, g) + costs[i][1];
            int ng = Math.min(r, b) + costs[i][2];
            r = nr; b = nb; g = ng;
        }
        return Math.min(r, Math.min(b, g));
    }
}
```

```python [Python]
class Solution:
    def minCost(self, costs: List[List[int]]) -> int:
        r, b, g = costs[0]
        for i in range(1, len(costs)):
            r, b, g = (
                min(b, g) + costs[i][0],
                min(r, g) + costs[i][1],
                min(r, b) + costs[i][2],
            )
        return min(r, b, g)
```

```cpp [C++]
class Solution {
public:
    int minCost(vector<vector<int>>& costs) {
        int r = costs[0][0], b = costs[0][1], g = costs[0][2];
        for (int i = 1; i < costs.size(); i++) {
            int nr = min(b, g) + costs[i][0];
            int nb = min(r, g) + costs[i][1];
            int ng = min(r, b) + costs[i][2];
            r = nr; b = nb; g = ng;
        }
        return min(r, min(b, g));
    }
};
```

```go [Go]
func minCost(costs [][]int) int {
    r, b, g := costs[0][0], costs[0][1], costs[0][2]
    for i := 1; i < len(costs); i++ {
        nr := min(b, g) + costs[i][0]
        nb := min(r, g) + costs[i][1]
        ng := min(r, b) + costs[i][2]
        r, b, g = nr, nb, ng
    }
    return min(r, min(b, g))
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```js [JavaScript]
/**
 * @param {number[][]} costs
 * @return {number}
 */
var minCost = function (costs) {
    let [r, b, g] = costs[0];
    for (let i = 1; i < costs.length; i++) {
        const nr = Math.min(b, g) + costs[i][0];
        const nb = Math.min(r, g) + costs[i][1];
        const ng = Math.min(r, b) + costs[i][2];
        r = nr; b = nb; g = ng;
    }
    return Math.min(r, Math.min(b, g));
};
```

```c [C]
int minCost(int** costs, int costsSize, int* costsColSize) {
    int r = costs[0][0], b = costs[0][1], g = costs[0][2];
    for (int i = 1; i < costsSize; i++) {
        int nr = (b < g ? b : g) + costs[i][0];
        int nb = (r < g ? r : g) + costs[i][1];
        int ng = (r < b ? r : b) + costs[i][2];
        r = nr; b = nb; g = ng;
    }
    int m = r < b ? r : b;
    return m < g ? m : g;
}
```

```ts [TypeScript]
function minCost(costs: number[][]): number {
    let [r, b, g] = costs[0];
    for (let i = 1; i < costs.length; i++) {
        const nr = Math.min(b, g) + costs[i][0];
        const nb = Math.min(r, g) + costs[i][1];
        const ng = Math.min(r, b) + costs[i][2];
        r = nr; b = nb; g = ng;
    }
    return Math.min(r, Math.min(b, g));
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n)`。
- **空间复杂度**：`O(1)`。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 动态规划 | `O(n)` | `O(1)` | 标准解法 |

「相邻房子不同色」的约束通过「当前色 = 上一行另外两色的最小值」来满足，三色滚动变量即可完成递推。

