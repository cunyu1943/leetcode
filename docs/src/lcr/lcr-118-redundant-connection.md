# [LCR 118. 冗余连接](https://leetcode.cn/problems/7LpjUW/)



## 一、题目描述

树可以看成是一个连通且 **无环** 的 **无向** 图。

给定往一棵 `n` 个节点 (节点值 `1～n`) 的树中添加一条边后的图。添加的边的两个顶点包含在 `1` 到 `n` 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 `n` 的二维数组 `edges` ，`edges[i] = [ai, bi]` 表示图中在 `ai` 和 `bi` 之间存在一条边。

请找出一条可以删去的边，删除后可使得剩余部分是一个有着 `n` 个节点的树。如果有多个答案，则返回数组 `edges` 中最后出现的那个。



**示例 1：**

```
输入: edges = [[1,2], [1,3], [2,3]]
输出: [2,3]
```

**示例 2：**

```
输入: edges = [[1,2], [2,3], [3,4], [1,4], [1,5]]
输出: [1,4]
```

**提示：**

- `n == edges.length`
- `3 <= n <= 1000`
- `1 <= ai < bi <= edges.length`
- `ai != bi`
- `edges` 中无重复元素
- 给定的图是连通的



## 二、解答方法

### 2.1 方法一：并查集

1. **思路**

树中任意两个节点之间只有一条路径，多加一条边必然使某两个已连通的节点再次相连，形成环。依次处理每条边：

- 用并查集维护已连接的节点；
- 若 `a`、`b` 已同根，说明这条边是冗余边（成环的那条），直接返回；
- 否则 `union(a, b)`。

题目要求返回最后出现的冗余边，而并查集顺序扫描自然满足（返回第一个成环的边；因为可能有多条冗余边时要求最后出现的——在无向连通图中唯一成环的边就是答案，若同时存在多条构成环的边，顺序处理返回第一个成环的即为符合「最后出现」语义的答案）。

时间 `O(n α(n))`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        int[] parent = new int[n + 1];
        for (int i = 1; i <= n; i++) parent[i] = i;
        for (int[] e : edges) {
            int ra = find(parent, e[0]), rb = find(parent, e[1]);
            if (ra == rb) return e;
            parent[ra] = rb;
        }
        return new int[0];
    }
    private int find(int[] parent, int x) {
        if (parent[x] != x) parent[x] = find(parent, parent[x]);
        return parent[x];
    }
}
```

```python [Python]
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        parent = list(range(n + 1))

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        for a, b in edges:
            ra, rb = find(a), find(b)
            if ra == rb:
                return [a, b]
            parent[ra] = rb
        return []
```

```cpp [C++]
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1);
        iota(parent.begin(), parent.end(), 0);
        function<int(int)> find = [&](int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        };
        for (auto& e : edges) {
            int ra = find(e[0]), rb = find(e[1]);
            if (ra == rb) return e;
            parent[ra] = rb;
        }
        return {};
    }
};
```

```go [Go]
func findRedundantConnection(edges [][]int) []int {
    n := len(edges)
    parent := make([]int, n+1)
    for i := 1; i <= n; i++ {
        parent[i] = i
    }
    var find func(x int) int
    find = func(x int) int {
        if parent[x] != x {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }
    for _, e := range edges {
        ra, rb := find(e[0]), find(e[1])
        if ra == rb {
            return e
        }
        parent[ra] = rb
    }
    return nil
}
```

```js [JavaScript]
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    const n = edges.length;
    const parent = Array.from({ length: n + 1 }, (_, i) => i);
    const find = (x) => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };
    for (const [a, b] of edges) {
        const ra = find(a), rb = find(b);
        if (ra === rb) return [a, b];
        parent[ra] = rb;
    }
    return [];
};
```

```c [C]
#include <stdlib.h>

static int find(int* parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}

int* findRedundantConnection(int** edges, int edgesSize, int* edgesColSize, int* returnSize) {
    int n = edgesSize;
    int* parent = (int*)malloc((n + 1) * sizeof(int));
    for (int i = 1; i <= n; i++) parent[i] = i;
    int* res = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < n; i++) {
        int a = edges[i][0], b = edges[i][1];
        int ra = find(parent, a), rb = find(parent, b);
        if (ra == rb) {
            res[0] = a;
            res[1] = b;
            free(parent);
            *returnSize = 2;
            return res;
        }
        parent[ra] = rb;
    }
    free(parent);
    *returnSize = 0;
    return res;
}
```

```ts [TypeScript]
function findRedundantConnection(edges: number[][]): number[] {
    const n = edges.length;
    const parent: number[] = Array.from({ length: n + 1 }, (_, i) => i);
    const find = (x: number): number => {
        if (parent[x] !== x) parent[x] = find(parent[x]);
        return parent[x];
    };
    for (const [a, b] of edges) {
        const ra = find(a), rb = find(b);
        if (ra === rb) return [a, b];
        parent[ra] = rb;
    }
    return [];
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n α(n))`。
- **空间复杂度**：`O(n)`，并查集。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 并查集 | `O(nα(n))` | `O(n)` | 标准解法 |

依次把边加入并查集：若一条边的两端已连通，说明它使图成环，即冗余边。顺序扫描保证返回的是符合题意的那条边。

