# [261. 以图判树](https://leetcode.cn/problems/graph-valid-tree/) [🔒 会员题]



## 一、题目描述

给定编号从 `0` 到 `n - 1` 的 `n` 个结点，和一个 **无向** 边列表 `edges`（每条边以一对结点表示），请编写一个函数用来 **判断这些边是否能够形成一个合法有效的树结构** 。

**示例 1：**

```
输入：n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
输出：true
```

**示例 2：**

```
输入：n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
输出：false
解释：存在环 [1,2,3]。
```

**提示：**

-   `1 <= n <= 2000`
-   `0 <= edges.length <= 5000`
-   `edges[i].length == 2`
-   `0 <= ai, bi < n`
-   `ai != bi`
-   不存在自环或重复的边

**进阶：** 你能否在不使用额外空间的情况下解决此问题？（提示：使用并查集）



## 二、解答方法

### 2.1 方法一：并查集（Union-Find）

1. **思路**

一棵合法的树必须同时满足两个条件：

1. **无环** —— 遍历所有边，若某条边的两个端点已经连通，则说明形成环，返回 `false`；
2. **连通（边数 = 节点数 - 1）** —— 若 `edges.length != n - 1`，必然不连通或有多余边，返回 `false`。
3. **所有节点最终属于同一个集合**（等价于上面的边数条件，但显式检查更稳妥）。

并查集用 `parent` 数组表示，路径压缩 + 按秩/大小合并可让复杂度接近 `O(1)`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    private int[] parent;

    public boolean validTree(int n, int[][] edges) {
        // 条件一：边数必须等于 n - 1
        if (edges.length != n - 1) return false;

        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        for (int[] edge : edges) {
            int rootA = find(edge[0]);
            int rootB = find(edge[1]);
            if (rootA == rootB) return false;      // 已连通 → 有环
            parent[rootA] = rootB;                 // 合并
        }
        return true;                               // 无环且边数正确 → 连通
    }

    private int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);           // 路径压缩
        }
        return parent[x];
    }
}
```

```python [Python]
class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) != n - 1:            # 边数必须等于 n-1
            return False

        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]     # 路径压缩
                x = parent[x]
            return x

        for a, b in edges:
            root_a, root_b = find(a), find(b)
            if root_a == root_b:
                return False               # 已连通 → 有环
            parent[root_a] = root_b        # 合并

        return True
```

```go [Go]
func validTree(n int, edges [][]int) bool {
    if len(edges) != n-1 {
        return false
    }
    parent := make([]int, n)
    for i := range parent {
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
        rootA, rootB := find(e[0]), find(e[1])
        if rootA == rootB {
            return false
        }
        parent[rootA] = rootB
    }
    return true
}
```

```cpp [C++]
class Solution {
public:
    vector<int> parent;

    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() != n - 1) return false;
        parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
        for (auto& e : edges) {
            int rootA = find(e[0]), rootB = find(e[1]);
            if (rootA == rootB) return false;
            parent[rootA] = rootB;
        }
        return true;
    }
private:
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
};
```

```js [JavaScript]
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
    if (edges.length !== n - 1) return false;
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x) => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];      // 路径压缩
            x = parent[x];
        }
        return x;
    };
    for (const [a, b] of edges) {
        const rootA = find(a), rootB = find(b);
        if (rootA === rootB) return false;      // 有环
        parent[rootA] = rootB;
    }
    return true;
};
```

```ts [TypeScript]
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function validTree(n: number, edges: number[][]): boolean {
    if (edges.length !== n - 1) return false;
    const parent = Array.from({ length: n }, (_, i) => i);
    const find = (x: number): number => {
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    for (const [a, b] of edges) {
        const rootA = find(a), rootB = find(b);
        if (rootA === rootB) return false;
        parent[rootA] = rootB;
    }
    return true;
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(n + E × α(n))`，`α` 为反阿克曼函数，近似 `O(1)`。
- **空间复杂度**：`O(n)`（parent 数组）。

### 2.2 方法二：DFS 检测环 + 连通性

1. **思路**

1. 建邻接表；
2. 从节点 0 开始 DFS，用 `visited` 记录访问过的节点，同时传入「父节点」避免把「父子边」误判为环；
3. 若遇到已访问且非父节点的邻居 → 有环；
4. DFS 结束后，若访问节点数 `!= n` → 不连通。

2. **代码实现（Python）**

```python
class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        from collections import defaultdict
        graph = defaultdict(list)
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)

        visited = set()

        def dfs(node, parent):
            if node in visited:
                return False                  # 遇到已访问节点（非父）→ 有环
            visited.add(node)
            for neighbor in graph[node]:
                if neighbor == parent:
                    continue                  # 跳过父节点
                if not dfs(neighbor, node):
                    return False
            return True

        # 无环 且 全部连通
        return dfs(0, -1) and len(visited) == n
```

3. **复杂度分析**

- **时间复杂度**：`O(n + E)`。
- **空间复杂度**：`O(n + E)`（邻接表 + 递归栈）。

## 三、总结

| 方法 | 时间 | 空间 |
| ---- | ---- | ---- |
| 并查集 | `O(n + E·α(n))` | `O(n)` |
| DFS/BFS | `O(n + E)` | `O(n + E)` |

判断图是否为树的 **两个充要条件**：

1. **无环**；
2. **连通**（边数恰好 `n - 1`）。

并查集是最优雅的解法：合并过程中若发现两端点已连通即判定有环，配合「边数 = n-1」的检查即可覆盖连通性（注意：单独的「无环」不充分，如 n=4 只有 2 条边时无环但不连通）。

DFS 法需注意 **父子边的处理**：无向图中 `(u,v)` 与 `(v,u)` 是同一条边，遍历时必须跳过父节点，否则会误判成环。
