# [LCR 113. 课程表 II](https://leetcode.cn/problems/QA2IGt/)



## 一、题目描述

现在你总共有 `numCourses` 门课需要选，记为 `0` 到 `numCourses - 1`。给你一个数组 `prerequisites` ，其中 `prerequisites[i] = [ai, bi]` ，表示在选修课程 `ai` 前 **必须** 先选修 `bi` 。

- 例如，想要学习课程 `0` ，你需要先完成课程 `1` ，我们用一个匹配来表示：`[0,1]` 。

返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 **任意一种** 就可以了。如果不可能完成所有课程，返回 **一个空数组** 。



**示例 1：**

```
输入：numCourses = 2, prerequisites = [[1,0]]
输出：[0,1]
解释：总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
```

**示例 2：**

```
输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
输出：[0,2,1,3]
解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
```

**提示：**

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `ai != bi`
- 所有 `[ai, bi]` 互不相同



## 二、解答方法

### 2.1 方法一：拓扑排序（Kahn 算法）

1. **思路**

课程关系构成有向图，合法学习顺序即拓扑序：

- 统计每门课程的入度，建邻接表；
- 入度为 0 的课程先入队；
- 不断出队加入结果，并把其所有后继课程入度减 1，减到 0 时入队；
- 若结果长度不足 `numCourses`，说明存在环，返回空数组。

时间 `O(V + E)`，空间 `O(V + E)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<Integer>[] g = new List[numCourses];
        int[] indeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) g[i] = new ArrayList<>();
        for (int[] p : prerequisites) {
            g[p[1]].add(p[0]);
            indeg[p[0]]++;
        }
        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.offer(i);
        int[] res = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            res[idx++] = u;
            for (int v : g[u]) {
                if (--indeg[v] == 0) q.offer(v);
            }
        }
        return idx == numCourses ? res : new int[0];
    }
}
```

```python [Python]
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        from collections import deque
        g = [[] for _ in range(numCourses)]
        indeg = [0] * numCourses
        for a, b in prerequisites:
            g[b].append(a)
            indeg[a] += 1
        q = deque([i for i in range(numCourses) if indeg[i] == 0])
        res = []
        while q:
            u = q.popleft()
            res.append(u)
            for v in g[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return res if len(res) == numCourses else []
```

```cpp [C++]
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> g(numCourses);
        vector<int> indeg(numCourses, 0);
        for (auto& p : prerequisites) {
            g[p[1]].push_back(p[0]);
            indeg[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.push(i);
        vector<int> res;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            res.push_back(u);
            for (int v : g[u]) if (--indeg[v] == 0) q.push(v);
        }
        if ((int)res.size() != numCourses) res.clear();
        return res;
    }
};
```

```go [Go]
func findOrder(numCourses int, prerequisites [][]int) []int {
    g := make([][]int, numCourses)
    indeg := make([]int, numCourses)
    for _, p := range prerequisites {
        g[p[1]] = append(g[p[1]], p[0])
        indeg[p[0]]++
    }
    q := []int{}
    for i := 0; i < numCourses; i++ {
        if indeg[i] == 0 {
            q = append(q, i)
        }
    }
    res := make([]int, 0, numCourses)
    for len(q) > 0 {
        u := q[0]
        q = q[1:]
        res = append(res, u)
        for _, v := range g[u] {
            indeg[v]--
            if indeg[v] == 0 {
                q = append(q, v)
            }
        }
    }
    if len(res) != numCourses {
        return []int{}
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    const g = Array.from({ length: numCourses }, () => []);
    const indeg = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) {
        g[b].push(a);
        indeg[a]++;
    }
    const q = [];
    for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
    const res = [];
    while (q.length) {
        const u = q.shift();
        res.push(u);
        for (const v of g[u]) {
            if (--indeg[v] === 0) q.push(v);
        }
    }
    return res.length === numCourses ? res : [];
};
```

```c [C]
#include <stdlib.h>

int* findOrder(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize, int* returnSize) {
    int** g = (int**)malloc(numCourses * sizeof(int*));
    int* gSize = (int*)calloc(numCourses, sizeof(int));
    int* gCap = (int*)malloc(numCourses * sizeof(int));
    int* indeg = (int*)calloc(numCourses, sizeof(int));
    for (int i = 0; i < numCourses; i++) {
        gCap[i] = 4;
        g[i] = (int*)malloc(gCap[i] * sizeof(int));
    }
    for (int i = 0; i < prerequisitesSize; i++) {
        int a = prerequisites[i][0], b = prerequisites[i][1];
        if (gSize[b] == gCap[b]) {
            gCap[b] *= 2;
            g[b] = (int*)realloc(g[b], gCap[b] * sizeof(int));
        }
        g[b][gSize[b]++] = a;
        indeg[a]++;
    }
    int* q = (int*)malloc(numCourses * sizeof(int));
    int head = 0, tail = 0;
    for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q[tail++] = i;
    int* res = (int*)malloc(numCourses * sizeof(int));
    int idx = 0;
    while (head < tail) {
        int u = q[head++];
        res[idx++] = u;
        for (int k = 0; k < gSize[u]; k++) {
            int v = g[u][k];
            if (--indeg[v] == 0) q[tail++] = v;
        }
    }
    for (int i = 0; i < numCourses; i++) free(g[i]);
    free(g); free(gSize); free(gCap); free(indeg); free(q);
    *returnSize = idx == numCourses ? idx : 0;
    return res;
}
```

```ts [TypeScript]
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const g: number[][] = Array.from({ length: numCourses }, () => []);
    const indeg: number[] = new Array(numCourses).fill(0);
    for (const [a, b] of prerequisites) {
        g[b].push(a);
        indeg[a]++;
    }
    const q: number[] = [];
    for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
    const res: number[] = [];
    while (q.length) {
        const u = q.shift()!;
        res.push(u);
        for (const v of g[u]) {
            if (--indeg[v] === 0) q.push(v);
        }
    }
    return res.length === numCourses ? res : [];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(V + E)`。
- **空间复杂度**：`O(V + E)`，邻接表与队列。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| Kahn 拓扑排序 | `O(V+E)` | `O(V+E)` | 标准解法 |

拓扑排序的输出长度若小于课程总数，说明图中存在环（先修关系矛盾），返回空数组。这是课程安排的经典建模方式。

