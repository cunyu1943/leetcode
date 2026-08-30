# [417. 太平洋大西洋水流问题](https://leetcode.cn/problems/pacific-atlantic-water-flow/)

## 一、题目描述

给定一个 `m x n` 的非负整数矩阵 `heights` 表示地形高度。水可以从高/等高的格子流向相邻（上下左右）更低或等高的格子。

矩阵左边界和上边界邻接**太平洋**，右边界和下边界邻接**大西洋**。返回所有能同时流向太平洋和大西洋的格子坐标。

**示例 1：**

```
输入：heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
输出：[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

**示例 2：**

```
输入：heights = [[2,1],[1,2]]
输出：[[0,0],[0,1],[1,0],[1,1]]
```

**提示：**

- `m == heights.length`，`n == heights[r].length`
- `1 <= m, n <= 200`
- `0 <= heights[r][c] <= 10^5`

## 二、解答方法

### 2.1 方法一：反向 BFS / DFS（从海洋往内陆）

1. 思路

正向从每个点出发太慢。反向思考：从太平洋边界出发能「逆流」到达的格子（即能流向太平洋的格子）；同理从大西洋边界逆流。两个可达集合的**交集**即答案。逆流时要求下一格高度 $\ge$ 当前格（水才能顺流过去）。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] h) {
        int m = h.length, n = h[0].length;
        boolean[][] p = new boolean[m][n], a = new boolean[m][n];
        for (int i = 0; i < m; i++) { dfs(h, p, i, 0, h[i][0]); dfs(h, a, i, n - 1, h[i][n - 1]); }
        for (int j = 0; j < n; j++) { dfs(h, p, 0, j, h[0][j]); dfs(h, a, m - 1, j, h[m - 1][j]); }
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (p[i][j] && a[i][j]) res.add(List.of(i, j));
        return res;
    }
    void dfs(int[][] h, boolean[][] vis, int x, int y, int pre) {
        if (x < 0 || y < 0 || x >= h.length || y >= h[0].length || vis[x][y] || h[x][y] < pre) return;
        vis[x][y] = true;
        dfs(h, vis, x + 1, y, h[x][y]); dfs(h, vis, x - 1, y, h[x][y]);
        dfs(h, vis, x, y + 1, h[x][y]); dfs(h, vis, x, y - 1, h[x][y]);
    }
}
```

```python [Python]
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        m, n = len(heights), len(heights[0])
        p = [[False] * n for _ in range(m)]
        a = [[False] * n for _ in range(m)]
        def dfs(x, y, pre, vis):
            if x < 0 or y < 0 or x >= m or y >= n or vis[x][y] or heights[x][y] < pre:
                return
            vis[x][y] = True
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                dfs(x + dx, y + dy, heights[x][y], vis)
        for i in range(m):
            dfs(i, 0, heights[i][0], p); dfs(i, n - 1, heights[i][n - 1], a)
        for j in range(n):
            dfs(0, j, heights[0][j], p); dfs(m - 1, j, heights[m - 1][j], a)
        return [[i, j] for i in range(m) for j in range(n) if p[i][j] and a[i][j]]
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& h) {
        int m = h.size(), n = h[0].size();
        vector<vector<bool>> p(m, vector<bool>(n)), a(m, vector<bool>(n));
        function<void(int,int,int,vector<vector<bool>>&)> dfs = [&](int x, int y, int pre, vector<vector<bool>>& vis) {
            if (x<0||y<0||x>=m||y>=n||vis[x][y]||h[x][y]<pre) return;
            vis[x][y] = true;
            for (auto& d : {pair{1,0},{-1,0},{0,1},{0,-1}})
                dfs(x+d.first, y+d.second, h[x][y], vis);
        };
        for (int i = 0; i < m; i++) { dfs(i,0,h[i][0],p); dfs(i,n-1,h[i][n-1],a); }
        for (int j = 0; j < n; j++) { dfs(0,j,h[0][j],p); dfs(m-1,j,h[m-1][j],a); }
        vector<vector<int>> res;
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) if (p[i][j]&&a[i][j]) res.push_back({i,j});
        return res;
    }
};
```

```go [Go]
func pacificAtlantic(heights [][]int) [][]int {
	m, n := len(heights), len(heights[0])
	p := make([][]bool, m)
	a := make([][]bool, m)
	for i := range p {
		p[i] = make([]bool, n)
		a[i] = make([]bool, n)
	}
	var dfs func(int, int, int, [][]bool)
	dfs = func(x, y, pre int, vis [][]bool) {
		if x < 0 || y < 0 || x >= m || y >= n || vis[x][y] || heights[x][y] < pre {
			return
		}
		vis[x][y] = true
		dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
		for _, d := range dirs {
			dfs(x+d[0], y+d[1], heights[x][y], vis)
		}
	}
	for i := 0; i < m; i++ {
		dfs(i, 0, heights[i][0], p)
		dfs(i, n-1, heights[i][n-1], a)
	}
	for j := 0; j < n; j++ {
		dfs(0, j, heights[0][j], p)
		dfs(m-1, j, heights[m-1][j], a)
	}
	res := [][]int{}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if p[i][j] && a[i][j] {
				res = append(res, []int{i, j})
			}
		}
	}
	return res
}
```

```javascript [JavaScript]
var pacificAtlantic = function (heights) {
    const m = heights.length, n = heights[0].length;
    const p = Array.from({ length: m }, () => Array(n).fill(false));
    const a = Array.from({ length: m }, () => Array(n).fill(false));
    const dfs = (x, y, pre, vis) => {
        if (x < 0 || y < 0 || x >= m || y >= n || vis[x][y] || heights[x][y] < pre) return;
        vis[x][y] = true;
        for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) dfs(x+dx, y+dy, heights[x][y], vis);
    };
    for (let i = 0; i < m; i++) { dfs(i, 0, heights[i][0], p); dfs(i, n-1, heights[i][n-1], a); }
    for (let j = 0; j < n; j++) { dfs(0, j, heights[0][j], p); dfs(m-1, j, heights[m-1][j], a); }
    const res = [];
    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (p[i][j] && a[i][j]) res.push([i, j]);
    return res;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(mn)$。
- 空间复杂度：$O(mn)$。

## 三、总结

「从边界反向搜索求可达集合再取交集」是矩阵流向类题的通用套路。相关题目：130 被围绕的区域、200 岛屿数量、286 墙与门。
