# [296. 最佳碰头地点](https://leetcode.cn/problems/best-meeting-point/) [🔒 会员题]

## 一、题目描述

给定一个 `m × n` 的二进制网格 `grid`，其中 `1` 表示有人居住的房子，`0` 表示空地。请找出一个 **空地（值为 0 的格子）**，使得所有房子到该空地的 **曼哈顿距离之和最小**。返回这个最小总距离。

**曼哈顿距离**：`|x1 - x2| + |y1 - y2|`。

**注意：** 你只能在 **空地** 上碰头（不能选有房子的格子）。若无法碰头（没有空地），返回 -1。

**示例：**

```
输入：grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]
输出：6
解释：最优碰头点取 (0,2) 或 (2,2) 等，总距离 = 6
```

**提示：** `m == grid.length`，`n == grid[i].length`，`1 <= m, n <= 200`，`grid[i][j]` 为 `0` 或 `1`，房子数量至少为 1。

## 二、解答方法

### 方法一：分离坐标 + 中位数（曼哈顿距离最优性）

**思路：** 曼哈顿距离 `|x1-x2| + |y1-y2|` 可分离为 x、y 两个一维问题。**使一维绝对差之和最小的点是该维坐标的中位数**。

收集所有房子的行坐标 `rows` 和列坐标 `cols`，分别排序取中位数 `mr`、`mc`，最优碰头点理论上是 `(mr, mc)`。但由于必须选空地，可枚举所有空地计算到「各行/列中位位置」的距离和——但更优：直接计算每行的房屋数分布，x 维总距离 = `Σ|x_i - mr|`，y 维同理，二者相加即为最小总距离（若中位数点恰好是房子，则找最近的空地，但距离和公式在中位数附近是最优，需确认该点是否为空地，必要时在房子周围找最近空地）。

实际最简做法：先求 rows、cols 的中位数坐标 `(mr, mc)`。若 `grid[mr][mc] == 0` 直接计算；否则在 `(mr, mc)` 周围 BFS 找最近空地，比较距离和。但更高效的是：分别求「行方向最优总距离」和「列方向最优总距离」后相加——这恰好等于选中位数点（房子或空地都行）时的和。由于相邻空地与中位数点距离差很小，可枚举所有空地取最小（m,n ≤ 200，空地最多 40000，可接受）。

:::::: code-group

```java [Java]
class Solution {
    public int minTotalDistance(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        List<Integer> rows = new ArrayList<>(), cols = new ArrayList<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) { rows.add(i); cols.add(j); }
        Collections.sort(cols);
        int mr = rows.get(rows.size() / 2);   // 行中位数
        int mc = cols.get(cols.size() / 2);   // 列中位数

        // 枚举所有空地，计算到 (mr,mc) 附近的最优（直接在中位数意义上求和 = 全局最小）
        // 但若要求必须空地，这里改为枚举空地距离和
        int best = Integer.MAX_VALUE;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    int d = 0;
                    for (int r : rows) d += Math.abs(r - i);
                    for (int c : cols) d += Math.abs(c - j);
                    best = Math.min(best, d);
                }
            }
        }
        return best;
    }
}
```

```python [Python]
class Solution:
    def minTotalDistance(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        rows = [i for i in range(m) for j in range(n) if grid[i][j] == 1]
        cols = [j for i in range(m) for j in range(n) if grid[i][j] == 1]
        cols.sort()
        mr = rows[len(rows) // 2]
        mc = cols[len(cols) // 2]
        best = float('inf')
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 0:
                    d = sum(abs(r - i) for r in rows) + sum(abs(c - j) for c in cols)
                    best = min(best, d)
        return best
```

```cpp [C++]
class Solution {
public:
    int minTotalDistance(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> rows, cols;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 1) { rows.push_back(i); cols.push_back(j); }
        sort(cols.begin(), cols.end());
        int mr = rows[rows.size()/2], mc = cols[cols.size()/2];
        int best = INT_MAX;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == 0) {
                    int d = 0;
                    for (int r : rows) d += abs(r - i);
                    for (int c : cols) d += abs(c - j);
                    best = min(best, d);
                }
        return best;
    }
};
```

```go [Go]
func minTotalDistance(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    rows, cols := []int{}, []int{}
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 1 { rows = append(rows, i); cols = append(cols, j) }
        }
    }
    sort.Ints(cols)
    best := 1 << 30
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 0 {
                d := 0
                for _, r := range rows { d += abs(r - i) }
                for _, c := range cols { d += abs(c - j) }
                if d < best { best = d }
            }
        }
    }
    return best
}
func abs(a int) int { if a < 0 { return -a }; return a }
```

```js [JavaScript]
var minTotalDistance = function (grid) {
    const m = grid.length, n = grid[0].length;
    const rows = [], cols = [];
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (grid[i][j] === 1) { rows.push(i); cols.push(j); }
    cols.sort((a, b) => a - b);
    let best = Infinity;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                let d = 0;
                for (const r of rows) d += Math.abs(r - i);
                for (const c of cols) d += Math.abs(c - j);
                best = Math.min(best, d);
            }
        }
    }
    return best;
};
```

::::::

**复杂度：** 枚举空地 `O(mn × h)`，h 为房子数。当 m,n ≤ 200 且空地多时略慢，但可行。优化版用中位数分离可 `O(mn)`。

## 三、总结

曼哈顿距离的可分离性是本题关键：**最优 x 坐标 = 行坐标中位数，最优 y 坐标 = 列坐标中位数**，且 x、y 互相独立，总距离 = x 方向总和 + y 方向总和。若允许在房子上碰头，答案即 `Σ|x_i - mr| + Σ|c_i - mc|`；本题限制必须空地，所以在空地中枚举取最小即可（中位数点通常是最近最优，枚举量在约束内可接受）。这是 `462 最少移动次数使数组元素相等`（一维中位数）的二维推广。
