# [LCR 110. 所有可能的路径](https://leetcode.cn/problems/bP4bmD/)



## 一、题目描述

给定一个有 `n` 个节点的有向无环图，用二维数组 `graph` 表示，请找出所有从节点 `0` 到节点 `n - 1` 的路径并输出（不要求按特定顺序）。

`graph[i]` 是一个从节点 `i` 可以访问的所有节点的列表（即从节点 `i` 到节点 `graph[i][j]` 存在一条有向边）。



**示例 1：**

```
输入：graph = [[1,2],[3],[3],[]]
输出：[[0,1,3],[0,2,3]]
解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3
```

**示例 2：**

```
输入：graph = [[4,3,1],[3,2,4],[3],[4],[]]
输出：[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
```

**提示：**

- `n == graph.length`
- `2 <= n <= 15`
- `0 <= graph[i][j] < n`
- `graph[i][j] != i`
- 保证输入为 **有向无环图** (DAG)



## 二、解答方法

### 2.1 方法一：DFS 回溯

1. **思路**

从节点 0 出发深度优先遍历，记录当前路径：

- 到达节点 `n-1` 时把路径加入结果；
- 否则遍历 `graph[cur]` 的所有邻接节点继续递归（DAG 无需判重，不会成环）；
- 回溯时移除最后加入的节点。

时间 `O(路径数 × 节点数)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(graph, 0, new ArrayList<>(List.of(0)), res);
        return res;
    }
    private void dfs(int[][] graph, int cur, List<Integer> path, List<List<Integer>> res) {
        if (cur == graph.length - 1) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int nxt : graph[cur]) {
            path.add(nxt);
            dfs(graph, nxt, path, res);
            path.remove(path.size() - 1);
        }
    }
}
```

```python [Python]
class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        res = []
        n = len(graph)

        def dfs(cur, path):
            if cur == n - 1:
                res.append(path[:])
                return
            for nxt in graph[cur]:
                path.append(nxt)
                dfs(nxt, path)
                path.pop()

        dfs(0, [0])
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        vector<vector<int>> res;
        vector<int> path = {0};
        dfs(graph, 0, path, res);
        return res;
    }
private:
    void dfs(vector<vector<int>>& g, int cur, vector<int>& path, vector<vector<int>>& res) {
        if (cur == g.size() - 1) { res.push_back(path); return; }
        for (int nxt : g[cur]) {
            path.push_back(nxt);
            dfs(g, nxt, path, res);
            path.pop_back();
        }
    }
};
```

```go [Go]
func allPathsSourceTarget(graph [][]int) [][]int {
    var res [][]int
    n := len(graph)
    path := []int{0}
    var dfs func(cur int)
    dfs = func(cur int) {
        if cur == n-1 {
            tmp := make([]int, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for _, nxt := range graph[cur] {
            path = append(path, nxt)
            dfs(nxt)
            path = path[:len(path)-1]
        }
    }
    dfs(0)
    return res
}
```

```js [JavaScript]
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
    const res = [];
    const n = graph.length;
    const path = [0];
    const dfs = (cur) => {
        if (cur === n - 1) {
            res.push([...path]);
            return;
        }
        for (const nxt of graph[cur]) {
            path.push(nxt);
            dfs(nxt);
            path.pop();
        }
    };
    dfs(0);
    return res;
};
```

```c [C]
#include <stdlib.h>

int** res;
int* cols;
int cnt;

static void dfs(int** graph, int* graphColSize, int cur, int n, int* path, int len) {
    if (cur == n - 1) {
        res[cnt] = (int*)malloc(len * sizeof(int));
        for (int i = 0; i < len; i++) res[cnt][i] = path[i];
        cols[cnt] = len;
        cnt++;
        return;
    }
    for (int i = 0; i < graphColSize[cur]; i++) {
        path[len] = graph[cur][i];
        dfs(graph, graphColSize, graph[cur][i], n, path, len + 1);
    }
}

int** allPathsSourceTarget(int** graph, int graphSize, int* graphColSize, int* returnSize, int** returnColumnSizes) {
    res = (int**)malloc(500 * sizeof(int*));
    cols = (int*)malloc(500 * sizeof(int));
    cnt = 0;
    int* path = (int*)malloc(graphSize * sizeof(int));
    path[0] = 0;
    dfs(graph, graphColSize, 0, graphSize, path, 1);
    free(path);
    *returnSize = cnt;
    *returnColumnSizes = cols;
    return res;
}
```

```ts [TypeScript]
function allPathsSourceTarget(graph: number[][]): number[][] {
    const res: number[][] = [];
    const n = graph.length;
    const path: number[] = [0];
    const dfs = (cur: number) => {
        if (cur === n - 1) {
            res.push([...path]);
            return;
        }
        for (const nxt of graph[cur]) {
            path.push(nxt);
            dfs(nxt);
            path.pop();
        }
    };
    dfs(0);
    return res;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(路径数 × 节点数)`。
- **空间复杂度**：`O(n)`，递归栈。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| DFS 回溯 | `O(P·n)` | `O(n)` | 标准解法 |

DAG 上求所有路径只需 DFS 回溯：到达终点记录路径，否则向每个邻接节点扩展。由于无环，无需 `visited` 标记。

