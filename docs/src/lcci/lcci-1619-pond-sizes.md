# [面试题 16.19. 水域大小](https://leetcode.cn/problems/pond-sizes-lcci/)

## 一、题目描述

你有一个用于表示一片土地的整数矩阵 `land`，其中每个格子表示一个区域，`0` 表示水域，`1` 表示陆地。水域是由相邻（上、下、左、右、以及对角线方向）的 `0` 连通组成的。请返回所有水域的大小，大小按**从大到小**排序。

**示例 1：**

```
输入：
[
  [0,2,1,0],
  [0,1,0,1],
  [1,1,0,1],
  [0,1,0,1]
]
输出： [1,1,2,4]
解释：水域大小分别为 1、1、2、4。
```

**提示：**

- `0 < len(land) <= 1000`
- `0 < len(land[0]) <= 1000`
- `0 <= land[i][j] <= 1`（实际上题目可能有 2，但水域只计 0，其他数字视为陆地）

## 二、解答方法

### 2.1 方法一：深度优先搜索（DFS）

**1. 思路**

遍历整个矩阵，遇到 `0` 时启动 DFS（或 BFS），统计该水域连通块的大小，并将访问过的 `0` 标记为已访问（例如改为 `-1` 或其他非零值）。将每个水域大小加入结果列表，最后排序并返回。

DFS 使用递归，检查当前格子的 8 个方向（上、下、左、右、左上、右上、左下、右下）。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] pondSizes(int[][] land) {
        int m = land.length, n = land[0].length;
        List<Integer> sizes = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (land[i][j] == 0) {
                    sizes.add(dfs(land, i, j));
                }
            }
        }
        Collections.sort(sizes, Collections.reverseOrder());
        return sizes.stream().mapToInt(Integer::intValue).toArray();
    }
    private int dfs(int[][] land, int i, int j) {
        int m = land.length, n = land[0].length;
        if (i < 0 || i >= m || j < 0 || j >= n || land[i][j] != 0) return 0;
        land[i][j] = -1; // 标记已访问
        int size = 1;
        for (int di = -1; di <= 1; di++) {
            for (int dj = -1; dj <= 1; dj++) {
                if (di == 0 && dj == 0) continue;
                size += dfs(land, i + di, j + dj);
            }
        }
        return size;
    }
}
```

```python [Python]
class Solution:
    def pondSizes(self, land: List[List[int]]) -> List[int]:
        m, n = len(land), len(land[0])
        def dfs(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or land[i][j] != 0:
                return 0
            land[i][j] = -1
            size = 1
            for di in (-1, 0, 1):
                for dj in (-1, 0, 1):
                    if di == 0 and dj == 0:
                        continue
                    size += dfs(i + di, j + dj)
            return size
        sizes = []
        for i in range(m):
            for j in range(n):
                if land[i][j] == 0:
                    sizes.append(dfs(i, j))
        sizes.sort(reverse=True)
        return sizes
```

```go [Go]
func pondSizes(land [][]int) []int {
    m, n := len(land), len(land[0])
    var dfs func(int, int) int
    dfs = func(i, j int) int {
        if i < 0 || i >= m || j < 0 || j >= n || land[i][j] != 0 {
            return 0
        }
        land[i][j] = -1
        size := 1
        for di := -1; di <= 1; di++ {
            for dj := -1; dj <= 1; dj++ {
                if di == 0 && dj == 0 { continue }
                size += dfs(i+di, j+dj)
            }
        }
        return size
    }
    sizes := []int{}
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if land[i][j] == 0 {
                sizes = append(sizes, dfs(i, j))
            }
        }
    }
    sort.Slice(sizes, func(a, b int) bool { return sizes[a] > sizes[b] })
    return sizes
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>
int m, n;
int dfs(int** land, int i, int j) {
    if (i < 0 || i >= m || j < 0 || j >= n || land[i][j] != 0) return 0;
    land[i][j] = -1;
    int size = 1;
    for (int di = -1; di <= 1; di++) {
        for (int dj = -1; dj <= 1; dj++) {
            if (di == 0 && dj == 0) continue;
            size += dfs(land, i+di, j+dj);
        }
    }
    return size;
}
int cmp(const void* a, const void* b) { return *(int*)b - *(int*)a; }
int* pondSizes(int** land, int landSize, int* landColSize, int* returnSize) {
    m = landSize;
    n = *landColSize;
    int* sizes = (int*)malloc(landSize * n * sizeof(int));
    int count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (land[i][j] == 0) {
                sizes[count++] = dfs(land, i, j);
            }
        }
    }
    *returnSize = count;
    qsort(sizes, count, sizeof(int), cmp);
    return sizes;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> pondSizes(vector<vector<int>>& land) {
        int m = land.size(), n = land[0].size();
        vector<int> sizes;
        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (i < 0 || i >= m || j < 0 || j >= n || land[i][j] != 0) return 0;
            land[i][j] = -1;
            int size = 1;
            for (int di = -1; di <= 1; di++) {
                for (int dj = -1; dj <= 1; dj++) {
                    if (di == 0 && dj == 0) continue;
                    size += dfs(i+di, j+dj);
                }
            }
            return size;
        };
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (land[i][j] == 0) {
                    sizes.push_back(dfs(i, j));
                }
            }
        }
        sort(sizes.begin(), sizes.end(), greater<int>());
        return sizes;
    }
};
```

```javascript [JavaScript]
var pondSizes = function(land) {
    const m = land.length, n = land[0].length;
    const dfs = (i, j) => {
        if (i < 0 || i >= m || j < 0 || j >= n || land[i][j] !== 0) return 0;
        land[i][j] = -1;
        let size = 1;
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) continue;
                size += dfs(i+di, j+dj);
            }
        }
        return size;
    };
    const sizes = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (land[i][j] === 0) {
                sizes.push(dfs(i, j));
            }
        }
    }
    sizes.sort((a, b) => b - a);
    return sizes;
};
```

```typescript [TypeScript]
function pondSizes(land: number[][]): number[] {
    const m = land.length, n = land[0].length;
    const dfs = (i: number, j: number): number => {
        if (i < 0 || i >= m || j < 0 || j >= n || land[i][j] !== 0) return 0;
        land[i][j] = -1;
        let size = 1;
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                if (di === 0 && dj === 0) continue;
                size += dfs(i+di, j+dj);
            }
        }
        return size;
    };
    const sizes: number[] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (land[i][j] === 0) {
                sizes.push(dfs(i, j));
            }
        }
    }
    sizes.sort((a, b) => b - a);
    return sizes;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m * n)`，每个格子最多被访问一次。
- **空间复杂度**：`O(m * n)`，最坏情况下递归栈深度可达格子数。

---

### 2.2 方法二：广度优先搜索（BFS）

**1. 思路**

与 DFS 类似，但使用队列进行 BFS 遍历连通区域。同样标记已访问，统计大小。BFS 可以避免递归栈溢出，适合矩阵较大时使用。

**2. 代码实现**

:::::: code-group

```java [Java]
class Solution {
    public int[] pondSizes(int[][] land) {
        int m = land.length, n = land[0].length;
        List<Integer> sizes = new ArrayList<>();
        int[][] dirs = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (land[i][j] == 0) {
                    Queue<int[]> q = new LinkedList<>();
                    q.offer(new int[]{i, j});
                    land[i][j] = -1;
                    int size = 0;
                    while (!q.isEmpty()) {
                        int[] cur = q.poll();
                        size++;
                        for (int[] d : dirs) {
                            int ni = cur[0] + d[0], nj = cur[1] + d[1];
                            if (ni >= 0 && ni < m && nj >= 0 && nj < n && land[ni][nj] == 0) {
                                land[ni][nj] = -1;
                                q.offer(new int[]{ni, nj});
                            }
                        }
                    }
                    sizes.add(size);
                }
            }
        }
        Collections.sort(sizes, Collections.reverseOrder());
        return sizes.stream().mapToInt(Integer::intValue).toArray();
    }
}
```

```python [Python]
from collections import deque
class Solution:
    def pondSizes(self, land: List[List[int]]) -> List[int]:
        m, n = len(land), len(land[0])
        dirs = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
        sizes = []
        for i in range(m):
            for j in range(n):
                if land[i][j] == 0:
                    q = deque([(i, j)])
                    land[i][j] = -1
                    size = 0
                    while q:
                        x, y = q.popleft()
                        size += 1
                        for dx, dy in dirs:
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < m and 0 <= ny < n and land[nx][ny] == 0:
                                land[nx][ny] = -1
                                q.append((nx, ny))
                    sizes.append(size)
        sizes.sort(reverse=True)
        return sizes
```

```go [Go]
func pondSizes(land [][]int) []int {
    m, n := len(land), len(land[0])
    dirs := [][2]int{{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}}
    sizes := []int{}
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if land[i][j] == 0 {
                q := [][2]int{{i, j}}
                land[i][j] = -1
                size := 0
                for len(q) > 0 {
                    cur := q[0]
                    q = q[1:]
                    size++
                    for _, d := range dirs {
                        ni, nj := cur[0]+d[0], cur[1]+d[1]
                        if ni >= 0 && ni < m && nj >= 0 && nj < n && land[ni][nj] == 0 {
                            land[ni][nj] = -1
                            q = append(q, [2]int{ni, nj})
                        }
                    }
                }
                sizes = append(sizes, size)
            }
        }
    }
    sort.Slice(sizes, func(a, b int) bool { return sizes[a] > sizes[b] })
    return sizes
}
```

```c [C]
#include <stdlib.h>
#include <stdbool.h>
int m, n;
int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
int* pondSizes(int** land, int landSize, int* landColSize, int* returnSize) {
    m = landSize; n = *landColSize;
    int* sizes = (int*)malloc(m * n * sizeof(int));
    int count = 0;
    int q[1000000][2]; // 足够大
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (land[i][j] == 0) {
                int head = 0, tail = 0;
                q[tail][0] = i; q[tail][1] = j; tail++;
                land[i][j] = -1;
                int size = 0;
                while (head < tail) {
                    int x = q[head][0], y = q[head][1];
                    head++;
                    size++;
                    for (int d = 0; d < 8; d++) {
                        int nx = x + dirs[d][0], ny = y + dirs[d][1];
                        if (nx >= 0 && nx < m && ny >= 0 && ny < n && land[nx][ny] == 0) {
                            land[nx][ny] = -1;
                            q[tail][0] = nx; q[tail][1] = ny; tail++;
                        }
                    }
                }
                sizes[count++] = size;
            }
        }
    }
    *returnSize = count;
    // 排序（从大到小）省略，可参考DFS中的排序
    return sizes;
}
```

```cpp [C++]
class Solution {
public:
    vector<int> pondSizes(vector<vector<int>>& land) {
        int m = land.size(), n = land[0].size();
        vector<int> sizes;
        int dirs[8][2] = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (land[i][j] == 0) {
                    queue<pair<int,int>> q;
                    q.push({i, j});
                    land[i][j] = -1;
                    int size = 0;
                    while (!q.empty()) {
                        auto [x, y] = q.front(); q.pop();
                        size++;
                        for (auto& d : dirs) {
                            int nx = x + d[0], ny = y + d[1];
                            if (nx >= 0 && nx < m && ny >= 0 && ny < n && land[nx][ny] == 0) {
                                land[nx][ny] = -1;
                                q.push({nx, ny});
                            }
                        }
                    }
                    sizes.push_back(size);
                }
            }
        }
        sort(sizes.begin(), sizes.end(), greater<int>());
        return sizes;
    }
};
```

```javascript [JavaScript]
var pondSizes = function(land) {
    const m = land.length, n = land[0].length;
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const sizes = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (land[i][j] === 0) {
                const q = [[i, j]];
                land[i][j] = -1;
                let size = 0;
                while (q.length) {
                    const [x, y] = q.shift();
                    size++;
                    for (const [dx, dy] of dirs) {
                        const nx = x + dx, ny = y + dy;
                        if (nx >= 0 && nx < m && ny >= 0 && ny < n && land[nx][ny] === 0) {
                            land[nx][ny] = -1;
                            q.push([nx, ny]);
                        }
                    }
                }
                sizes.push(size);
            }
        }
    }
    sizes.sort((a, b) => b - a);
    return sizes;
};
```

```typescript [TypeScript]
function pondSizes(land: number[][]): number[] {
    const m = land.length, n = land[0].length;
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const sizes: number[] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (land[i][j] === 0) {
                const q: [number, number][] = [[i, j]];
                land[i][j] = -1;
                let size = 0;
                while (q.length) {
                    const [x, y] = q.shift()!;
                    size++;
                    for (const [dx, dy] of dirs) {
                        const nx = x + dx, ny = y + dy;
                        if (nx >= 0 && nx < m && ny >= 0 && ny < n && land[nx][ny] === 0) {
                            land[nx][ny] = -1;
                            q.push([nx, ny]);
                        }
                    }
                }
                sizes.push(size);
            }
        }
    }
    sizes.sort((a, b) => b - a);
    return sizes;
}
```

::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m * n)`，每个格子最多入队一次。
- **空间复杂度**：`O(min(m, n))` 或 `O(m * n)`，队列大小最坏为 `O(m * n)`。

---

## 三、总结

| 方法        | 时间复杂度 | 空间复杂度 | 特点                       |
| ----------- | ---------- | ---------- | -------------------------- |
| DFS（递归） | `O(m * n)` | `O(m * n)` | 实现简单，但递归可能栈溢出 |
| BFS（队列） | `O(m * n)` | `O(m * n)` | 避免递归，适合大矩阵       |

两种方法均可通过，推荐在矩阵较大时使用 BFS，避免递归深度限制。注意对已访问的格子进行标记，防止重复计数。