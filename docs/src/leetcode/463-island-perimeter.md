# [463. 岛屿的周长](https://leetcode.cn/problems/island-perimeter/)

## 一、题目描述

给定一个二维网格 `grid`，其中 `1` 为陆地、`0` 为水。网格被水完全包围，且恰有一个岛屿（或多个不相连岛屿但只算陆地周长）。求岛屿的周长。

**示例 1：**

```
输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
输出：16
```

**示例 2：**

```
输入：grid = [[1]]
输出：4
```

**提示：**

- `row == grid.length`，`col == grid[i].length`
- `1 <= row, col <= 100`
- `grid[i][j]` 为 0 或 1

## 二、解答方法

### 2.1 方法一：逐格统计相邻水/边界

1. 思路

遍历每个陆地格，初始贡献 4 条边；对上下左右四个邻居，若越界或为水，则该边计入周长（每有一个陆地邻居减 1）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int islandPerimeter(int[][] grid) {
        int m = grid.length, n = grid[0].length, ans = 0;
        int[] dx = {1,-1,0,0}, dy = {0,0,1,-1};
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    int edges = 4;
                    for (int d = 0; d < 4; d++) {
                        int x = i + dx[d], y = j + dy[d];
                        if (x >= 0 && y >= 0 && x < m && y < n && grid[x][y] == 1) edges--;
                    }
                    ans += edges;
                }
            }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def islandPerimeter(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        ans = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j]:
                    edges = 4
                    for x, y in ((i+1,j),(i-1,j),(i,j+1),(i,j-1)):
                        if 0 <= x < m and 0 <= y < n and grid[x][y]:
                            edges -= 1
                    ans += edges
        return ans
```

```cpp [C++]
class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size(), ans = 0;
        int dx[4] = {1,-1,0,0}, dy[4] = {0,0,1,-1};
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (grid[i][j]) {
                    int edges = 4;
                    for (int d = 0; d < 4; d++) {
                        int x = i + dx[d], y = j + dy[d];
                        if (x>=0&&y>=0&&x<m&&y<n&&grid[x][y]) edges--;
                    }
                    ans += edges;
                }
        return ans;
    }
};
```

```go [Go]
func islandPerimeter(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	ans := 0
	dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				edges := 4
				for _, d := range dirs {
					x, y := i+d[0], j+d[1]
					if x >= 0 && y >= 0 && x < m && y < n && grid[x][y] == 1 {
						edges--
					}
				}
				ans += edges
			}
		}
	}
	return ans
}
```

```javascript [JavaScript]
var islandPerimeter = function (grid) {
    const m = grid.length, n = grid[0].length;
    let ans = 0;
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (grid[i][j]) {
                let edges = 4;
                for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                    const x = i + dx, y = j + dy;
                    if (x>=0&&y>=0&&x<m&&y<n&&grid[x][y]) edges--;
                }
                ans += edges;
            }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(mn)$。
- 空间复杂度：$O(1)$。

## 三、总结

逐格算边是岛屿周长最简方法。相关题目：200 岛屿数量、694 不同岛屿数量、695 岛屿的最大面积。
