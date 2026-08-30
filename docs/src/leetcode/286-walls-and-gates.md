# [286. 墙与门](https://leetcode.cn/problems/walls-and-gates/) [🔒 会员题]

## 一、题目描述

你被给定一个 `m × n` 的二维网格 `rooms`，每个格子可能是：

-   `-1` ：墙或障碍物（不可通行）；
-   `0` ：一扇门；
-   `INF`（`2³¹ - 1`） ：一个空房间。

请你 **原地** 填充每个空房间到 **最近门** 的距离。如果无法到达门，则保持 `INF`。

**示例：**

```
输入：rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],
               [2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
输出：[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]
```

**提示：** `m == rooms.length`，`n == rooms[i].length`，`2 <= m, n <= 250`，`rooms[i][j]` 为 `-1`、`0` 或 `INF`。

## 二、解答方法

### 方法一：多源 BFS（从所有门同时出发）

**思路：** 把 **所有门（值为 0）同时入队** 作为 BFS 起点，向四个方向扩散。每走到一个空房间，其距离 = 当前门距离 + 1。多源 BFS 保证每个空房间首次被访问时取得 **到最近门** 的最短距离。

:::::: code-group

```java [Java]
class Solution {
    private static final int INF = Integer.MAX_VALUE;
    public void wallsAndGates(int[][] rooms) {
        int m = rooms.length, n = rooms[0].length;
        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (rooms[i][j] == 0) q.offer(new int[]{i, j});   // 所有门入队
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int x = cur[0], y = cur[1];
            for (int[] d : dirs) {
                int nx = x + d[0], ny = y + d[1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && rooms[nx][ny] == INF) {
                    rooms[nx][ny] = rooms[x][y] + 1;
                    q.offer(new int[]{nx, ny});
                }
            }
        }
    }
}
```

```python [Python]
class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> None:
        from collections import deque
        INF = 2147483647
        m, n = len(rooms), len(rooms[0])
        q = deque()
        for i in range(m):
            for j in range(n):
                if rooms[i][j] == 0:
                    q.append((i, j))
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        while q:
            x, y = q.popleft()
            for dx, dy in dirs:
                nx, ny = x + dx, y + dy
                if 0 <= nx < m and 0 <= ny < n and rooms[nx][ny] == INF:
                    rooms[nx][ny] = rooms[x][y] + 1
                    q.append((nx, ny))
```

```cpp [C++]
class Solution {
public:
    void wallsAndGates(vector<vector<int>>& rooms) {
        int m = rooms.size(), n = rooms[0].size();
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (rooms[i][j] == 0) q.push({i, j});
        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        while (!q.empty()) {
            auto [x, y] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nx = x + d[0], ny = y + d[1];
                if (nx>=0 && nx<m && ny>=0 && ny<n && rooms[nx][ny] == INT_MAX) {
                    rooms[nx][ny] = rooms[x][y] + 1;
                    q.push({nx, ny});
                }
            }
        }
    }
};
```

```go [Go]
func wallsAndGates(rooms [][]int) {
    m, n := len(rooms), len(rooms[0])
    q := [][2]int{}
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if rooms[i][j] == 0 { q = append(q, [2]int{i, j}) }
        }
    }
    dirs := [][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
    for len(q) > 0 {
        cur := q[0]; q = q[1:]
        x, y := cur[0], cur[1]
        for _, d := range dirs {
            nx, ny := x+d[0], y+d[1]
            if nx >= 0 && nx < m && ny >= 0 && ny < n && rooms[nx][ny] == 1<<31-1 {
                rooms[nx][ny] = rooms[x][y] + 1
                q = append(q, [2]int{nx, ny})
            }
        }
    }
}
```

```js [JavaScript]
var wallsAndGates = function (rooms) {
    const m = rooms.length, n = rooms[0].length;
    const q = [];
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if (rooms[i][j] === 0) q.push([i, j]);
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (q.length) {
        const [x, y] = q.shift();
        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && rooms[nx][ny] === 2147483647) {
                rooms[nx][ny] = rooms[x][y] + 1;
                q.push([nx, ny]);
            }
        }
    }
};
```

::::::

**复杂度：** 时间 `O(mn)`，空间 `O(mn)`（队列最坏情况）。

## 三、总结

本题是 **多源 BFS** 的典范：把多个起点（所有门）同时入队，等价于「从终点向起点反向 BFS」。每个空房间被首次访问时，其距离必然最小（BFS 层序保证）。单源 BFS（从某点出发求到所有点距离）若重复做 n 次会超时，多源 BFS 一次搞定。同类题：`542 01 矩阵`、`1162 地图分析`、`994 腐烂的橘子`。
