# [310. 最小高度树](https://leetcode.cn/problems/minimum-height-trees/)

## 一、题目描述

给定一个无向无环连通图（树），节点编号 `0 ~ n-1`，`edges` 为边列表。选择一个节点作为树根，使得整棵树的高度最小。返回所有可能成为最小高度树根的所有节点。

**示例：**
```
输入：n = 4, edges = [[1,0],[1,2],[1,3]]
输出：[1]（以 1 为根高度最小=1）
输入：n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
输出：[3,4]
```

**提示：** `1 <= n <= 2×10⁴`，`edges.length == n-1`，图为合法树。

## 二、解答方法

### 方法一：剥叶子（拓扑/剥洋葱）

**思路：** 最小高度树的根一定在「树的直径中点」。做法：反复剥离当前所有叶子节点（度=1），同时删除它们及其边；最后剩下的 1~2 个节点即为答案。每轮剥一层，直到剩余 ≤ 2 个节点。

:::::: code-group

```java [Java]
class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        if (n == 1) return List.of(0);
        List<Set<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new HashSet<>());
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); adj.get(e[1]).add(e[0]); }
        List<Integer> leaves = new ArrayList<>();
        for (int i = 0; i < n; i++) if (adj.get(i).size() == 1) leaves.add(i);
        while (n > 2) {
            n -= leaves.size();
            List<Integer> newLeaves = new ArrayList<>();
            for (int u : leaves) {
                int v = adj.get(u).iterator().next();
                adj.get(v).remove(u);
                if (adj.get(v).size() == 1) newLeaves.add(v);
            }
            leaves = newLeaves;
        }
        return leaves;
    }
}
```

```python [Python]
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1: return [0]
        adj = [set() for _ in range(n)]
        for u, v in edges:
            adj[u].add(v); adj[v].add(u)
        leaves = [i for i in range(n) if len(adj[i]) == 1]
        while n > 2:
            n -= len(leaves)
            newLeaves = []
            for u in leaves:
                v = adj[u].pop()
                adj[v].discard(u)
                if len(adj[v]) == 1: newLeaves.append(v)
            leaves = newLeaves
        return leaves
```

```cpp [C++]
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};
        vector<unordered_set<int>> adj(n);
        for (auto& e : edges) { adj[e[0]].insert(e[1]); adj[e[1]].insert(e[0]); }
        vector<int> leaves;
        for (int i=0;i<n;i++) if (adj[i].size()==1) leaves.push_back(i);
        while (n > 2) {
            n -= leaves.size();
            vector<int> nxt;
            for (int u : leaves) {
                int v = *adj[u].begin();
                adj[v].erase(u);
                if (adj[v].size()==1) nxt.push_back(v);
            }
            leaves = nxt;
        }
        return leaves;
    }
};
```

```go [Go]
func findMinHeightTrees(n int, edges [][]int) []int {
    if n == 1 { return []int{0} }
    adj := make([]map[int]bool, n)
    for i := range adj { adj[i] = map[int]bool{} }
    for _, e := range edges { adj[e[0]][e[1]] = true; adj[e[1]][e[0]] = true }
    leaves := []int{}
    for i := 0; i < n; i++ { if len(adj[i]) == 1 { leaves = append(leaves, i) } }
    for n > 2 {
        n -= len(leaves)
        nxt := []int{}
        for _, u := range leaves {
            for v := range adj[u] {
                delete(adj[v], u)
                if len(adj[v]) == 1 { nxt = append(nxt, v) }
                break
            }
        }
        leaves = nxt
    }
    return leaves
}
```

```js [JavaScript]
var findMinHeightTrees = function (n, edges) {
    if (n === 1) return [0];
    const adj = Array.from({length: n}, () => new Set());
    for (const [u, v] of edges) { adj[u].add(v); adj[v].add(u); }
    let leaves = [];
    for (let i=0;i<n;i++) if (adj[i].size === 1) leaves.push(i);
    while (n > 2) {
        n -= leaves.length;
        const nxt = [];
        for (const u of leaves) {
            const v = adj[u].values().next().value;
            adj[v].delete(u);
            if (adj[v].size === 1) nxt.push(v);
        }
        leaves = nxt;
    }
    return leaves;
};
```

::::::

**复杂度：** 时间 `O(n)`，空间 `O(n)`。

## 三、总结

「剥叶子」本质是求树直径中点。每轮删去所有叶子（度=1），树高度减一，最终剩 1 个（奇数直径）或 2 个（偶数直径）节点即最小高度树根。比逐一以每个点为根算高度 `O(n²)` 优得多。注意用 `Set/邻接表` 维护度数。
