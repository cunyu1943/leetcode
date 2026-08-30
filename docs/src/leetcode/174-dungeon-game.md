# [174. 地下城游戏](https://leetcode.cn/problems/dungeon-game/)



## 一、题目描述

恶魔们抓住了公主并将她关在了地下城 `dungeon` 的 **右下角** 。地下城是由 `m x n` 个房间组成的二维网格。我们英勇的骑士最初被安置在 **左上角** 的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。

骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。

为了尽快到达公主，骑士决定每次只 **向右** 或 **向下** 移动一步。

返回确保骑士能够拯救到公主所需的 **最低** 初始健康点数。

**注意：** 任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。



**示例 1：**

```
输入：dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
输出：7
解释：如果骑士遵循最佳路径：右 -> 右 -> 下 -> 下，则初始健康点数至少为 7 才能保证通关。
```

**示例 2：**

```
输入：dungeon = [[0]]
输出：1
```

**提示：**

-   `m == dungeon.length`
-   `n == dungeon[i].length`
-   `1 <= m, n <= 200`
-   `-1000 <= dungeon[i][j] <= 1000`



## 二、解答方法

### 2.1 方法一：动态规划（从右下往左上）

1. **思路**

正向 DP 难以确定「最低初始血量」（因为路径上血量不能为 0）。**反向 DP** 更自然：`dp[i][j]` 表示从 `(i,j)` 走到终点所需的最小初始血量。转移：

```
need = min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]
dp[i][j] = max(1, need)
```

即到达该格时至少要有 `need` 血，且不能为 0（所以与 1 取 max）。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int calculateMinimumHP(int[][] dungeon) {
        int m = dungeon.length, n = dungeon[0].length;
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) Arrays.fill(dp[i], Integer.MAX_VALUE);
        dp[m][n - 1] = dp[m - 1][n] = 1;
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int minNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
                dp[i][j] = Math.max(1, minNext - dungeon[i][j]);
            }
        }
        return dp[0][0];
    }
}
```

```python [Python]
class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m, n = len(dungeon), len(dungeon[0])
        dp = [[float('inf')] * (n + 1) for _ in range(m + 1)]
        dp[m][n - 1] = dp[m - 1][n] = 1
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                min_next = min(dp[i + 1][j], dp[i][j + 1])
                dp[i][j] = max(1, min_next - dungeon[i][j])
        return dp[0][0]
```

```go [Go]
func calculateMinimumHP(dungeon [][]int) int {
    m, n := len(dungeon), len(dungeon[0])
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = 1 << 30
        }
    }
    dp[m][n-1], dp[m-1][n] = 1, 1
    for i := m - 1; i >= 0; i-- {
        for j := n - 1; j >= 0; j-- {
            minNext := min(dp[i+1][j], dp[i][j+1])
            dp[i][j] = max(1, minNext-dungeon[i][j])
        }
    }
    return dp[0][0]
}

func min(a, b int) int { if a < b { return a }; return b }
func max(a, b int) int { if a > b { return a }; return b }
```

```cpp [C++]
class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        int m = dungeon.size(), n = dungeon[0].size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, INT_MAX));
        dp[m][n - 1] = dp[m - 1][n] = 1;
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int minNext = min(dp[i + 1][j], dp[i][j + 1]);
                dp[i][j] = max(1, minNext - dungeon[i][j]);
            }
        }
        return dp[0][0];
    }
};
```

```js [JavaScript]
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
    const m = dungeon.length, n = dungeon[0].length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(Infinity));
    dp[m][n - 1] = dp[m - 1][n] = 1;
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const minNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
            dp[i][j] = Math.max(1, minNext - dungeon[i][j]);
        }
    }
    return dp[0][0];
};
```

```ts [TypeScript]
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
function calculateMinimumHP(dungeon: number[][]): number {
    const m = dungeon.length, n = dungeon[0].length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(Infinity));
    dp[m][n - 1] = dp[m - 1][n] = 1;
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const minNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
            dp[i][j] = Math.max(1, minNext - dungeon[i][j]);
        }
    }
    return dp[0][0];
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(m × n)`。
- **空间复杂度**：`O(m × n)`，可优化为 `O(n)`（滚动数组）。

## 三、总结

本题是 DP 中「**逆推更优**」的经典案例：正向无法确定最低初始值，而反向 DP 从终点推起点，用 `max(1, 下步走所需 - 当前消耗)` 即可。注意血量下限恒为 1（不能 ≤0）。
