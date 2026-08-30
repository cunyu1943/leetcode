# [407. 接雨水 II](https://leetcode.cn/problems/trapping-rain-water-ii/)

## 一、题目描述

给你一个 `m x n` 的矩阵，其中的值均为非负整数，代表每个单元格的高度。雨水能在其中「凹陷」处积存，求能接多少雨水。

（即三维版接雨水，水从四周边缘流出。）

**示例 1：**

```
输入：heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
输出：4
```

**示例 2：**

```
输入：heightMap = [[12]]
输出：0
```

**提示：**

- `m == heightMap.length`，`n == heightMap[i].length`
- `1 <= m, n <= 200`
- `0 <= heightMap[i][j] <= 2 * 10^4`

## 二、解答方法

### 2.1 方法一：最小堆 + 边界向内扩散

1. 思路

水的高度由**最矮的边界**决定（类似木桶短板）。把所有边界格子加入最小堆，记录它们的高度。每次取出堆顶（当前最矮的边界格子），向四个方向扩散：若相邻格子比当前边界低，则该处能积水 `boundary - height`，并把该格子以 `max(height, boundary)` 作为新边界加入堆；否则直接将其高度作为新边界入堆。用 `visited` 防止重复。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    public int trapRainWater(int[][] h) {
        int m = h.length, n = h[0].length;
        if (m < 3 || n < 3) return 0;
        boolean[][] vis = new boolean[m][n];
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[2] - b[2]);
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (i == 0 || j == 0 || i == m - 1 || j == n - 1) {
                    pq.offer(new int[]{i, j, h[i][j]});
                    vis[i][j] = true;
                }
        int[][] dir = {{1,0},{-1,0},{0,1},{0,-1}};
        int ans = 0;
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            for (int[] d : dir) {
                int x = cur[0] + d[0], y = cur[1] + d[1];
                if (x < 0 || y < 0 || x >= m || y >= n || vis[x][y]) continue;
                vis[x][y] = true;
                int boundary = Math.max(cur[2], h[x][y]);
                ans += boundary - h[x][y];
                pq.offer(new int[]{x, y, boundary});
            }
        }
        return ans;
    }
}
```

```python [Python]
class Solution:
    def trapRainWater(self, heightMap: List[List[int]]) -> int:
        import heapq
        m, n = len(heightMap), len(heightMap[0])
        if m < 3 or n < 3:
            return 0
        vis = [[False] * n for _ in range(m)]
        pq = []
        for i in range(m):
            for j in range(n):
                if i in (0, m - 1) or j in (0, n - 1):
                    heapq.heappush(pq, (heightMap[i][j], i, j))
                    vis[i][j] = True
        ans = 0
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            while pq:
                h, x, y = heapq.heappop(pq)
                for dxx, dyy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dxx, y + dyy
                    if 0 <= nx < m and 0 <= ny < n and not vis[nx][ny]:
                        vis[nx][ny] = True
                        boundary = max(h, heightMap[nx][ny])
                        ans += boundary - heightMap[nx][ny]
                        heapq.heappush(pq, (boundary, nx, ny))
        return ans
```

```cpp [C++]
class Solution {
public:
    int trapRainWater(vector<vector<int>>& h) {
        int m = h.size(), n = h[0].size();
        if (m < 3 || n < 3) return 0;
        vector<vector<bool>> vis(m, vector<bool>(n));
        priority_queue<array<int,3>, vector<array<int,3>>, greater<>> pq;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (i == 0 || j == 0 || i == m-1 || j == n-1) {
                    pq.push({h[i][j], i, j});
                    vis[i][j] = true;
                }
        int dir[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        int ans = 0;
        while (!pq.empty()) {
            auto [hv, x, y] = pq.top(); pq.pop();
            for (auto& d : dir) {
                int nx = x + d[0], ny = y + d[1];
                if (nx < 0 || ny < 0 || nx >= m || ny >= n || vis[nx][ny]) continue;
                vis[nx][ny] = true;
                int boundary = max(hv, h[nx][ny]);
                ans += boundary - h[nx][ny];
                pq.push({boundary, nx, ny});
            }
        }
        return ans;
    }
};
```

```go [Go]
func trapRainWater(heightMap [][]int) int {
	m, n := len(heightMap), len(heightMap[0])
	if m < 3 || n < 3 {
		return 0
	}
	vis := make([][]bool, m)
	for i := range vis {
		vis[i] = make([]bool, n)
	}
	pq := &minHeap{}
	dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 || j == 0 || i == m-1 || j == n-1 {
				heap.Push(pq, [3]int{heightMap[i][j], i, j})
				vis[i][j] = true
			}
		}
	}
	ans := 0
	for pq.Len() > 0 {
		cur := heap.Pop(pq).([3]int)
		for _, d := range dirs {
			x, y := cur[1]+d[0], cur[2]+d[1]
			if x < 0 || y < 0 || x >= m || y >= n || vis[x][y] {
				continue
			}
			vis[x][y] = true
			boundary := cur[0]
			if heightMap[x][y] > boundary {
				boundary = heightMap[x][y]
			}
			ans += boundary - heightMap[x][y]
			heap.Push(pq, [3]int{boundary, x, y})
		}
	}
	return ans
}
type minHeap [][3]int
func (h minHeap) Len() int            { return len(h) }
func (h minHeap) Less(i, j int) bool  { return h[i][0] < h[j][0] }
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.([3]int)) }
func (h *minHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[:n-1]
	return x
}
```

```javascript [JavaScript]
var trapRainWater = function (h) {
    const m = h.length, n = h[0].length;
    if (m < 3 || n < 3) return 0;
    const vis = Array.from({ length: m }, () => Array(n).fill(false));
    const pq = [];
    const push = (x) => { pq.push(x); let i = pq.length - 1; while (i > 0) { const p = (i-1)>>1; if (pq[p][0] <= pq[i][0]) break; [pq[p], pq[i]] = [pq[i], pq[p]]; i = p; } };
    const pop = () => { const top = pq[0], last = pq.pop(); if (pq.length) { pq[0] = last; let i = 0; while (true) { let l = 2*i+1, r = 2*i+2, s = i; if (l < pq.length && pq[l][0] < pq[s][0]) s = l; if (r < pq.length && pq[r][0] < pq[s][0]) s = r; if (s === i) break; [pq[s], pq[i]] = [pq[i], pq[s]]; i = s; } } return top; };
    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (i === 0 || j === 0 || i === m-1 || j === n-1) { push([h[i][j], i, j]); vis[i][j] = true; }
    const dir = [[1,0],[-1,0],[0,1],[0,-1]];
    let ans = 0;
    while (pq.length) {
        const [hv, x, y] = pop();
        for (const [dx, dy] of dir) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= m || ny >= n || vis[nx][ny]) continue;
            vis[nx][ny] = true;
            const boundary = Math.max(hv, h[nx][ny]);
            ans += boundary - h[nx][ny];
            push([boundary, nx, ny]);
        }
    }
    return ans;
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O(mn \log(mn))$，每个格子入堆出堆一次。
- 空间复杂度：$O(mn)$。

## 三、总结

二维接雨水是「木桶短板」思想的推广：从最矮边界向内扩散，维护当前可达的最小边界高度。相关题目：42 接雨水（一维）、84 柱状图最大矩形。
