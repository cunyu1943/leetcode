# [LCR 107. 01 矩阵](https://leetcode.cn/problems/2bCMpM2/)



## 一、题目描述

给定一个由 `0` 和 `1` 组成的矩阵 `mat` ，请输出一个大小相同的矩阵，其中每一个格子是 `mat` 中对应位置元素到最近的 `0` 的距离。

两个相邻元素间的距离为 `1` 。



**示例 1：**

```
输入：mat = [[0,0,0],[0,1,0],[0,0,0]]
输出：[[0,0,0],[0,1,0],[0,0,0]]
```

**示例 2：**

```
输入：mat = [[0,0,0],[0,1,0],[1,1,1]]
输出：[[0,0,0],[0,1,0],[1,2,1]]
```

**提示：**

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 10⁴`
- `1 <= m * n <= 10⁴`
- `mat[i][j]` is either `0` or `1`
- `mat` 中至少有一个 `0`



## 二、解答方法

### 2.1 方法一：多源 BFS

1. **思路**

把所有 `0` 视为起点同时入队（距离为 0），从它们向四周 BFS 扩散：

- 每扩展一层距离 +1；
- 首次访问到 `1` 时记录的距离即为最近 0 的距离。

利用 BFS 逐层扩展的单调性保证距离最短。时间 `O(mn)`，空间 `O(mn)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int[][] dist = new int[m][n];
        Deque<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) q.offer(new int[]{i, j});
                else dist[i][j] = -1;
            }
        }
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            for (int[] d : dirs) {
                int ni = cur[0] + d[0], nj = cur[1] + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && dist[ni][nj] == -1) {
                    dist[ni][nj] = dist[cur[0]][cur[1]] + 1;
                    q.offer(new int[]{ni, nj});
                }
            }
        }
        return dist;
    }
}
```

```python [Python]
class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        from collections import deque
        m, n = len(mat), len(mat[0])
        dist = [[-1] * n for _ in range(m)]
        q = deque()
        for i in range(m):
            for j in range(n):
                if mat[i][j] == 0:
                    dist[i][j] = 0
                    q.append((i, j))
        while q:
            x, y = q.popleft()
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < m and 0 <= ny < n and dist[nx][ny] == -1:
                    dist[nx][ny] = dist[x][y] + 1
                    q.append((nx, ny))
        return dist
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<vector<int>> dist(m, vector<int>(n, -1));
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++)
            for (int j = 0; j < n; j++)
                if (mat[i][j] == 0) { dist[i][j] = 0; q.push({i, j}); }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [x, y] = q.front(); q.pop();
            for (auto& d : dirs) {
                int nx = x + d[0], ny = y + d[1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && dist[nx][ny] == -1) {
                    dist[nx][ny] = dist[x][y] + 1;
                    q.push({nx, ny});
                }
            }
        }
        return dist;
    }
};
```

```go [Go]
func updateMatrix(mat [][]int) [][]int {
    m, n := len(mat), len(mat[0])
    dist := make([][]int, m)
    type pos struct{ x, y int }
    q := []pos{}
    for i := 0; i < m; i++ {
        dist[i] = make([]int, n)
        for j := 0; j < n; j++ {
            if mat[i][j] == 0 {
                q = append(q, pos{i, j})
            } else {
                dist[i][j] = -1
            }
        }
    }
    dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    for len(q) > 0 {
        cur := q[0]
        q = q[1:]
        for _, d := range dirs {
            nx, ny := cur.x+d[0], cur.y+d[1]
            if nx >= 0 && nx < m && ny >= 0 && ny < n && dist[nx][ny] == -1 {
                dist[nx][ny] = dist[cur.x][cur.y] + 1
                q = append(q, pos{nx, ny})
            }
        }
    }
    return dist
}
```

```js [JavaScript]
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const m = mat.length, n = mat[0].length;
    const dist = Array.from({ length: m }, () => new Array(n).fill(-1));
    const q = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                dist[i][j] = 0;
                q.push([i, j]);
            }
        }
    }
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (q.length) {
        const [x, y] = q.shift();
        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && dist[nx][ny] === -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push([nx, ny]);
            }
        }
    }
    return dist;
};
```

```c [C]
#include <stdlib.h>

int** updateMatrix(int** mat, int matSize, int* matColSize, int* returnSize, int** returnColumnSizes) {
    int m = matSize, n = matColSize[0];
    int** dist = (int**)malloc(m * sizeof(int*));
    for (int i = 0; i < m; i++) dist[i] = (int*)malloc(n * sizeof(int));
    int* qx = (int*)malloc(m * n * sizeof(int));
    int* qy = (int*)malloc(m * n * sizeof(int));
    int head = 0, tail = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (mat[i][j] == 0) {
                dist[i][j] = 0;
                qx[tail] = i; qy[tail] = j; tail++;
            } else {
                dist[i][j] = -1;
            }
        }
    }
    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    while (head < tail) {
        int x = qx[head], y = qy[head];
        head++;
        for (int d = 0; d < 4; d++) {
            int nx = x + dirs[d][0], ny = y + dirs[d][1];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                qx[tail] = nx; qy[tail] = ny; tail++;
            }
        }
    }
    free(qx); free(qy);
    *returnSize = m;
    *returnColumnSizes = matColSize;
    return dist;
}
```

```ts [TypeScript]
function updateMatrix(mat: number[][]): number[][] {
    const m = mat.length, n = mat[0].length;
    const dist: number[][] = Array.from({ length: m }, () => new Array(n).fill(-1));
    const q: [number, number][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                dist[i][j] = 0;
                q.push([i, j]);
            }
        }
    }
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    while (q.length) {
        const [x, y] = q.shift()!;
        for (const [dx, dy] of dirs) {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && dist[nx][ny] === -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push([nx, ny]);
            }
        }
    }
    return dist;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(mn)`。
- **空间复杂度**：`O(mn)`，队列。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 多源 BFS | `O(mn)` | `O(mn)` | 标准解法 |

所有 0 同时作为 BFS 起点，逐层向外扩散，首次到达的层数即最近距离。多源 BFS 把「求每个点到最近 0 的距离」转化为「单源最短路」的批量版本。

