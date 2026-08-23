# [LCR 106. 判断二分图](https://leetcode.cn/problems/vEAB3K/)



## 一、题目描述

存在一个 **无向图** ，图中有 `n` 个节点。其中每个节点都有一个介于 `0` 到 `n - 1` 之间的唯一编号。给你一个二维数组 `graph` ，其中 `graph[u]` 是一个节点数组，由节点 `u` 的邻接节点组成。形式上，对于 `graph[u]` 中的每个 `v` ，都存在一条位于节点 `u` 和节点 `v` 之间的无向边。该无向图同时具有以下属性：

- 不存在自环（`graph[u]` 不包含 `u`）。
- 不存在平行边（`graph[u]` 不包含重复值）。
- 如果 `v` 在 `graph[u]` 内，那么 `u` 也应该在 `graph[v]` 内（该图是无向图）。
- 这个图可能不是连通图，也就是说两个节点 `u` 和 `v` 之间可能不存在一条连通彼此的路径。

**二分图** 定义：如果能将一个图的节点集合分割成两个独立的子集 `A` 和 `B` ，并使图中的每一条边的两个节点一个来自 `A` 集合，一个来自 `B` 集合，就将这个图称为 **二分图** 。

如果图是二分图，返回 `true`；否则，返回 `false` 。



**示例 1：**

```
输入：graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
输出：false
```

**示例 2：**

```
输入：graph = [[1,3],[0,2],[1,3],[0,2]]
输出：true
```

**提示：**

- `n == graph.length`
- `1 <= n <= 100`
- `0 <= graph[u].length < n`
- `0 <= graph[u][i] <= n - 1`
- `graph[u]` 不会包含 `u`
- `graph[u]` 的所有值 **互不相同**
- 如果 `graph[u]` 包含 `v`，那么 `graph[v]` 也会包含 `u`



## 二、解答方法

### 2.1 方法一：染色法（BFS/DFS）

1. **思路**

二分图判定 = 能否给每个节点染两种颜色之一，使所有边两端颜色不同（无奇环）。

- `color[]`：0 未染色，1/-1 两种颜色；
- 对每个未染色的节点，BFS/DFS 染成 1，邻接节点染成 -1；
- 若某邻接节点已染色且与当前节点同色，说明冲突，返回 `false`。

图可能不连通，需遍历所有节点。时间 `O(V+E)`，空间 `O(V)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            Deque<Integer> q = new ArrayDeque<>();
            q.offer(i);
            color[i] = 1;
            while (!q.isEmpty()) {
                int u = q.poll();
                for (int v : graph[u]) {
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        q.offer(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        color = [0] * n
        from collections import deque
        for i in range(n):
            if color[i] != 0:
                continue
            q = deque([i])
            color[i] = 1
            while q:
                u = q.popleft()
                for v in graph[u]:
                    if color[v] == 0:
                        color[v] = -color[u]
                        q.append(v)
                    elif color[v] == color[u]:
                        return False
        return True
```

```cpp [C++]
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0);
        for (int i = 0; i < n; i++) {
            if (color[i]) continue;
            queue<int> q;
            q.push(i);
            color[i] = 1;
            while (!q.empty()) {
                int u = q.front(); q.pop();
                for (int v : graph[u]) {
                    if (!color[v]) { color[v] = -color[u]; q.push(v); }
                    else if (color[v] == color[u]) return false;
                }
            }
        }
        return true;
    }
};
```

```go [Go]
func isBipartite(graph [][]int) bool {
    n := len(graph)
    color := make([]int, n)
    for i := 0; i < n; i++ {
        if color[i] != 0 {
            continue
        }
        q := []int{i}
        color[i] = 1
        for len(q) > 0 {
            u := q[0]
            q = q[1:]
            for _, v := range graph[u] {
                if color[v] == 0 {
                    color[v] = -color[u]
                    q = append(q, v)
                } else if color[v] == color[u] {
                    return false
                }
            }
        }
    }
    return true
}
```

```js [JavaScript]
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
    const n = graph.length;
    const color = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (color[i] !== 0) continue;
        const q = [i];
        color[i] = 1;
        while (q.length) {
            const u = q.shift();
            for (const v of graph[u]) {
                if (color[v] === 0) {
                    color[v] = -color[u];
                    q.push(v);
                } else if (color[v] === color[u]) {
                    return false;
                }
            }
        }
    }
    return true;
};
```

```c [C]
#include <stdlib.h>

int isBipartite(int** graph, int graphSize, int* graphColSize) {
    int* color = (int*)calloc(graphSize, sizeof(int));
    int* q = (int*)malloc(graphSize * sizeof(int));
    for (int i = 0; i < graphSize; i++) {
        if (color[i] != 0) continue;
        int head = 0, tail = 0;
        q[tail++] = i;
        color[i] = 1;
        while (head < tail) {
            int u = q[head++];
            for (int k = 0; k < graphColSize[u]; k++) {
                int v = graph[u][k];
                if (color[v] == 0) {
                    color[v] = -color[u];
                    q[tail++] = v;
                } else if (color[v] == color[u]) {
                    free(color);
                    free(q);
                    return 0;
                }
            }
        }
    }
    free(color);
    free(q);
    return 1;
}
```

```ts [TypeScript]
function isBipartite(graph: number[][]): boolean {
    const n = graph.length;
    const color: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (color[i] !== 0) continue;
        const q: number[] = [i];
        color[i] = 1;
        while (q.length) {
            const u = q.shift()!;
            for (const v of graph[u]) {
                if (color[v] === 0) {
                    color[v] = -color[u];
                    q.push(v);
                } else if (color[v] === color[u]) {
                    return false;
                }
            }
        }
    }
    return true;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(V + E)`。
- **空间复杂度**：`O(V)`，颜色数组与队列。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 染色 BFS | `O(V+E)` | `O(V)` | 标准解法 |

二分图判定的本质是「相邻节点异色」：BFS 染色，遇到同色相邻即冲突。注意图可能不连通，要对每个连通分量分别染色。

