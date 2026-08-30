# [305. 岛屿数量 II](https://leetcode.cn/problems/number-of-islands-ii/) [🔒 会员题]

## 一、题目描述

给定一个 `m × n` 的初始全 `0` 网格，以及一系列位置 `positions`，依次把每个位置变为陆地（1）。每次操作后，返回 **当前网格中岛屿的数量**。

**示例：**
```
输入：m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1],[1,1]]
输出：[1,1,2,3,1]
```

**提示：** `1 <= m, n < 10⁴`，`1 <= positions.length <= 1000`，`0 <= r < m, 0 <= c < n`。位置可能重复（已为陆地则跳过）。

## 二、解答方法

### 方法一：并查集（DSU）动态维护

**思路：** 每加一块陆地，先岛屿数 +1；再检查其 4 个邻居中已是陆地的，用并查集合并（若两块原本属于不同集合，合并后岛屿数 -1）。用 `Set`/数组标记某格是否已成陆地，避免重复加。

:::::: code-group

```java [Java]
class Solution {
    int[] parent;
    int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
    public List<Integer> numIslands2(int m, int n, int[][] positions) {
        parent = new int[m * n];
        for (int i = 0; i < m * n; i++) parent[i] = -1;   // -1 表示仍是水
        List<Integer> res = new ArrayList<>();
        int[][] dir = {{1,0},{-1,0},{0,1},{0,-1}};
        int count = 0;
        for (int[] p : positions) {
            int id = p[0] * n + p[1];
            if (parent[id] != -1) { res.add(count); continue; }  // 重复
            parent[id] = id; count++;
            for (int[] d : dir) {
                int nr = p[0] + d[0], nc = p[1] + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int nid = nr * n + nc;
                    if (parent[nid] != -1) {
                        int ra = find(id), rb = find(nid);
                        if (ra != rb) { parent[ra] = rb; count--; }
                    }
                }
            }
            res.add(count);
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        parent = {}
        def find(x):
            parent.setdefault(x, x)
            while parent[x] != x:
                parent[x] = parent[parent[x]]; x = parent[x]
            return x
        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb: parent[ra] = rb; return True
            return False
        res, count = [], 0
        seen = set()
        dirs = [(1,0),(-1,0),(0,1),(0,-1)]
        for r, c in positions:
            if (r,c) in seen: res.append(count); continue
            seen.add((r,c))
            parent[(r,c)] = (r,c); count += 1
            for dr, dc in dirs:
                nr, nc = r+dr, c+dc
                if (nr,nc) in seen and union((r,c),(nr,nc)): count -= 1
            res.append(count)
        return res
```

```cpp [C++]
class Solution {
    vector<int> parent;
    int find(int x){ return parent[x]==x?x:(parent[x]=find(parent[x])); }
public:
    vector<int> numIslands2(int m, int n, vector<vector<int>>& pos) {
        parent.assign(m*n, -1);
        vector<int> res; int cnt = 0;
        int dir[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        for (auto& p : pos) {
            int id = p[0]*n + p[1];
            if (parent[id] != -1) { res.push_back(cnt); continue; }
            parent[id] = id; cnt++;
            for (auto& d : dir) {
                int nr = p[0]+d[0], nc = p[1]+d[1];
                if (nr>=0 && nr<m && nc>=0 && nc<n) {
                    int nid = nr*n+nc;
                    if (parent[nid] != -1) {
                        int ra = find(id), rb = find(nid);
                        if (ra != rb) { parent[ra] = rb; cnt--; }
                    }
                }
            }
            res.push_back(cnt);
        }
        return res;
    }
};
```

```go [Go]
func numIslands2(m int, n int, positions [][]int) []int {
    parent := make([]int, m*n)
    for i := range parent { parent[i] = -1 }
    find := func(x int) int { for parent[x] != x { parent[x] = parent[parent[x]]; x = parent[x] }; return x }
    res := []int{}; cnt := 0
    dirs := [][]int{{1,0},{-1,0},{0,1},{0,-1}}
    for _, p := range positions {
        id := p[0]*n + p[1]
        if parent[id] != -1 { res = append(res, cnt); continue }
        parent[id] = id; cnt++
        for _, d := range dirs {
            nr, nc := p[0]+d[0], p[1]+d[1]
            if nr>=0 && nr<m && nc>=0 && nc<n {
                nid := nr*n+nc
                if parent[nid] != -1 {
                    ra, rb := find(id), find(nid)
                    if ra != rb { parent[ra] = rb; cnt-- }
                }
            }
        }
        res = append(res, cnt)
    }
    return res
}
```

```js [JavaScript]
var numIslands2 = function (m, n, positions) {
    const parent = new Array(m*n).fill(-1);
    const find = x => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
    const res = []; let cnt = 0;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    for (const [r,c] of positions) {
        const id = r*n+c;
        if (parent[id] !== -1) { res.push(cnt); continue; }
        parent[id] = id; cnt++;
        for (const [dr,dc] of dirs) {
            const nr=r+dr, nc=c+dc;
            if (nr>=0 && nr<m && nc>=0 && nc<n) {
                const nid = nr*n+nc;
                if (parent[nid] !== -1) {
                    const ra=find(id), rb=find(nid);
                    if (ra !== rb) { parent[ra]=rb; cnt--; }
                }
            }
        }
        res.push(cnt);
    }
    return res;
};
```

::::::

**复杂度：** 时间 `O(k · α(mn))`（k=操作数），空间 `O(mn)`。

## 三、总结

动态岛屿 = 并查集经典应用。每加陆地：先 +1，再与已是陆地的邻居合并（每次成功合并 -1）。用 `-1`/`seen` 标记水域与重复。是 `200 岛屿数量`（BFS）的动态版。注意重复 position 直接返回当前 count。
