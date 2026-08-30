# [323. 无向图中连通分量的数目](https://leetcode.cn/problems/number-of-connected-components-in-an-undirected-graph/) [🔒 会员题]

## 一、题目描述

给定 `n` 个节点（编号 `0 ~ n-1`）和边列表 `edges`（无向图），返回图中 **连通分量的数量**。

**示例：**
```
输入：n = 5, edges = [[0,1],[1,2],[3,4]]
输出：2（分量：{0,1,2} 和 {3,4}）
```

**提示：** `1 <= n <= 2000`，`0 <= edges.length <= 5000`，图无重边/自环。

## 二、解答方法

### 方法一：并查集（DSU）

**思路：** 初始化 `n` 个集合，`count = n`。遍历每条边，若两端 `find` 不同则 `union` 并 `count--`。最终 `count` 即连通分量数。

:::::: code-group

```java [Java]
class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        for (int i=0;i<n;i++) parent[i]=i;
        int count = n;
        for (int[] e : edges) {
            int ra = find(parent, e[0]), rb = find(parent, e[1]);
            if (ra != rb) { parent[ra] = rb; count--; }
        }
        return count;
    }
    int find(int[] p, int x) { while (p[x]!=x) { p[x]=p[p[x]]; x=p[x]; } return x; }
}
```

```python [Python]
class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))
        def find(x):
            while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]
            return x
        count = n
        for u, v in edges:
            ru, rv = find(u), find(v)
            if ru != rv: parent[ru] = rv; count -= 1
        return count
```

```cpp [C++]
class Solution {
    int find(vector<int>& p,int x){ while(p[x]!=x){p[x]=p[p[x]];x=p[x];} return x; }
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<int> parent(n); for(int i=0;i<n;i++) parent[i]=i;
        int cnt=n;
        for(auto&e:edges){ int ra=find(parent,e[0]),rb=find(parent,e[1]); if(ra!=rb){parent[ra]=rb;cnt--;} }
        return cnt;
    }
};
```

```go [Go]
func countComponents(n int, edges [][]int) int {
    parent := make([]int, n)
    for i := range parent { parent[i] = i }
    find := func(x int) int { for parent[x] != x { parent[x] = parent[parent[x]]; x = parent[x] }; return x }
    cnt := n
    for _, e := range edges {
        ra, rb := find(e[0]), find(e[1])
        if ra != rb { parent[ra] = rb; cnt-- }
    }
    return cnt
}
```

```js [JavaScript]
var countComponents = function (n, edges) {
    const parent = Array.from({length: n}, (_, i) => i);
    const find = x => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    let cnt = n;
    for (const [u, v] of edges) {
        const ru = find(u), rv = find(v);
        if (ru !== rv) { parent[ru] = rv; cnt--; }
    }
    return cnt;
};
```

::::::

**复杂度：** 时间 `O(E·α(n))`，空间 `O(n)`。

## 三、总结

连通分量数 = 并查集经典。初始每点一个分量，每合并一条有效边减 1。也可用 BFS/DFS 遍历（每找到一个未访问点就开始一次遍历，遍历次数即分量数）。本题是 `261 以图判树`（判断恰好一个分量且无环）的兄弟题。
