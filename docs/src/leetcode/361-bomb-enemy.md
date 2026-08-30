# [361. 炸弹袭击](https://leetcode.cn/problems/bomb-enemy/) [🔒 会员题]

## 一、题目描述

给定一个 `m × n` 的网格，其中 `'W'` 墙、`'E'` 敌人、`'0'`（数字 0）空地。你可以选择一块空地放炸弹，炸弹 **只能炸一行或一列**（上下左右四个方向，遇到墙截止）上的所有敌人。求最多能炸死多少敌人。

**示例：**
```
输入：grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
输出：3
```

**提示：** `m == grid.length`, `n == grid[i].length`, `1 <= m, n <= 500`。

## 二、解答方法

### 方法一：预处理每行每列连续敌人数

**思路：** 预处理 `row[i][j]` = 第 i 行、从列 j 出发横向能炸到的敌人数（遇墙重置）；`col[i][j]` = 第 j 列、从行 i 出发纵向能炸到的敌人数。遍历每个空地 `(i,j)`，答案 = `row[i][j] + col[i][j]` 的最大值。

:::::: code-group

```java [Java]
class Solution {
    public int maxKilledEnemies(char[][] grid) {
        int m = grid.length, n = grid[0].length;
        int[][] row = new int[m][n], col = new int[m][n];
        // 行
        for (int i = 0; i < m; i++) {
            int cnt = 0;
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 'W') cnt = 0;
                else if (grid[i][j] == 'E') cnt++;
                row[i][j] = cnt;
            }
        }
        // 列
        for (int j = 0; j < n; j++) {
            int cnt = 0;
            for (int i = 0; i < m; i++) {
                if (grid[i][j] == 'W') cnt = 0;
                else if (grid[i][j] == 'E') cnt++;
                col[i][j] = cnt;
            }
        }
        int ans = 0;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j] == '0') ans = Math.max(ans, row[i][j] + col[i][j]);
        return ans;
    }
}
```

```python [Python]
class Solution:
    def maxKilledEnemies(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        row = [[0]*n for _ in range(m)]; col = [[0]*n for _ in range(m)]
        for i in range(m):
            cnt = 0
            for j in range(n):
                if grid[i][j] == 'W': cnt = 0
                elif grid[i][j] == 'E': cnt += 1
                row[i][j] = cnt
        for j in range(n):
            cnt = 0
            for i in range(m):
                if grid[i][j] == 'W': cnt = 0
                elif grid[i][j] == 'E': cnt += 1
                col[i][j] = cnt
        ans = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '0': ans = max(ans, row[i][j] + col[i][j])
        return ans
```

```cpp [C++]
class Solution {
public:
    int maxKilledEnemies(vector<vector<char>>& grid) {
        int m=grid.size(), n=grid[0].size();
        vector<vector<int>> row(m,vector<int>(n,0)), col(m,vector<int>(n,0));
        for(int i=0;i<m;i++){ int c=0; for(int j=0;j<n;j++){ if(grid[i][j]=='W')c=0; else if(grid[i][j]=='E')c++; row[i][j]=c; } }
        for(int j=0;j<n;j++){ int c=0; for(int i=0;i<m;i++){ if(grid[i][j]=='W')c=0; else if(grid[i][j]=='E')c++; col[i][j]=c; } }
        int ans=0;
        for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(grid[i][j]=='0') ans=max(ans,row[i][j]+col[i][j]);
        return ans;
    }
};
```

```go [Go]
func maxKilledEnemies(grid [][]byte) int {
    m, n := len(grid), len(grid[0])
    row := make([][]int, m); col := make([][]int, m)
    for i := range row { row[i] = make([]int, n); col[i] = make([]int, n) }
    for i := 0; i < m; i++ { c := 0; for j := 0; j < n; j++ { if grid[i][j]=='W' { c=0 } else if grid[i][j]=='E' { c++ }; row[i][j]=c } }
    for j := 0; j < n; j++ { c := 0; for i := 0; i < m; i++ { if grid[i][j]=='W' { c=0 } else if grid[i][j]=='E' { c++ }; col[i][j]=c } }
    ans := 0
    for i := 0; i < m; i++ { for j := 0; j < n; j++ { if grid[i][j]=='0' { v := row[i][j]+col[i][j]; if v > ans { ans = v } } } }
    return ans
}
```

```js [JavaScript]
var maxKilledEnemies = function (grid) {
    const m=grid.length, n=grid[0].length;
    const row=Array.from({length:m},()=>new Array(n).fill(0));
    const col=Array.from({length:m},()=>new Array(n).fill(0));
    for(let i=0;i<m;i++){ let c=0; for(let j=0;j<n;j++){ if(grid[i][j]==='W')c=0; else if(grid[i][j]==='E')c++; row[i][j]=c; } }
    for(let j=0;j<n;j++){ let c=0; for(let i=0;i<m;i++){ if(grid[i][j]==='W')c=0; else if(grid[i][j]==='E')c++; col[i][j]=c; } }
    let ans=0;
    for(let i=0;i<m;i++) for(let j=0;j<n;j++) if(grid[i][j]==='0') ans=Math.max(ans, row[i][j]+col[i][j]);
    return ans;
};
```

::::::

**复杂度：** 时间 `O(mn)`，空间 `O(mn)`（可优化到 `O(n)` 只记当前行/列计数）。

## 三、总结

网格 DP 预处理：行/列分段连续敌人数（遇墙重置）。空地答案为横纵之和的最大值。可优化空间：只保留「当前行计数」「当前列计数数组」，边遍历边更新，省去两个矩阵。同类：`542 01 矩阵`（多源 BFS）、`317 离建筑最近距离`。注意炸弹只能放空地。
