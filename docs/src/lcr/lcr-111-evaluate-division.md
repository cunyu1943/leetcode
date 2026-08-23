# [LCR 111. 除法求值](https://leetcode.cn/problems/vlzXQL/)



## 一、题目描述

给定一个变量对数组 `equations` 和一个实数值数组 `values` 作为已知条件，其中 `equations[i] = [Ai, Bi]` 和 `values[i]` 共同表示等式 `Ai / Bi = values[i]` 。每个 `Ai` 或 `Bi` 是一个表示单个变量的字符串。

另有一些以数组 `queries` 表示的问题，其中 `queries[j] = [Cj, Dj]` 表示第 `j` 个问题，请你根据已知条件找出 `Cj / Dj = ?` 的结果作为答案。

返回 **所有问题的答案** 。如果存在某个无法确定的答案，则用 `-1.0` 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 `-1.0` 替代这个答案。

**注意：** 输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。



**示例 1：**

```
输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
```

**示例 2：**

```
输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
输出：[3.75000,0.40000,5.00000,0.20000]
```

**提示：**

- `1 <= equations.length <= 20`
- `equations[i].length == 2`
- `1 <= Ai.length, Bi.length <= 5`
- `values.length == equations.length`
- `0.0 < values[i] <= 20.0`
- `1 <= queries.length <= 20`
- `queries[i].length == 2`
- `1 <= Cj.length, Dj.length <= 5`
- `Ai, Bi, Cj, Dj` 由小写英文字母与数字组成



## 二、解答方法

### 2.1 方法一：图 + DFS（带权路径）

1. **思路**

把除法建模为带权图：`a/b = v` 表示有向边 `a -> b` 权 `v`，反向边 `b -> a` 权 `1/v`。则 `x/y` 就是从 `x` 沿边累积乘积到 `y` 的路径值。

- 对每个 `query(x, y)` 做 DFS：若 `x == y` 且存在该节点返回 1.0；否则沿边递归累乘，找到则返回乘积，找不到返回 -1.0。

时间 `O(Q × E)`，空间 `O(E)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values,
                                 List<List<String>> queries) {
        Map<String, Map<String, Double>> g = new HashMap<>();
        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0), b = equations.get(i).get(1);
            g.computeIfAbsent(a, k -> new HashMap<>()).put(b, values[i]);
            g.computeIfAbsent(b, k -> new HashMap<>()).put(a, 1.0 / values[i]);
        }
        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String x = queries.get(i).get(0), y = queries.get(i).get(1);
            if (!g.containsKey(x) || !g.containsKey(y)) {
                res[i] = -1.0;
                continue;
            }
            res[i] = dfs(g, new HashSet<>(), x, y, 1.0);
        }
        return res;
    }
    private double dfs(Map<String, Map<String, Double>> g, Set<String> visited,
                       String cur, String target, double acc) {
        if (cur.equals(target)) return acc;
        visited.add(cur);
        for (Map.Entry<String, Double> e : g.get(cur).entrySet()) {
            if (!visited.contains(e.getKey())) {
                double r = dfs(g, visited, e.getKey(), target, acc * e.getValue());
                if (r != -1.0) return r;
            }
        }
        return -1.0;
    }
}
```

```python [Python]
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float],
                     queries: List[List[str]]) -> List[float]:
        g = {}
        for (a, b), v in zip(equations, values):
            g.setdefault(a, {})[b] = v
            g.setdefault(b, {})[a] = 1 / v

        def dfs(cur, target, acc, visited):
            if cur == target:
                return acc
            visited.add(cur)
            for nxt, w in g.get(cur, {}).items():
                if nxt not in visited:
                    r = dfs(nxt, target, acc * w, visited)
                    if r != -1:
                        return r
            return -1

        res = []
        for x, y in queries:
            if x not in g or y not in g:
                res.append(-1.0)
            else:
                res.append(dfs(x, y, 1.0, set()))
        return res
```

```cpp [C++]
class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values,
                                vector<vector<string>>& queries) {
        for (int i = 0; i < equations.size(); i++) {
            g[equations[i][0]][equations[i][1]] = values[i];
            g[equations[i][1]][equations[i][0]] = 1.0 / values[i];
        }
        vector<double> res;
        for (auto& q : queries) {
            string x = q[0], y = q[1];
            if (!g.count(x) || !g.count(y)) { res.push_back(-1.0); continue; }
            unordered_set<string> visited;
            res.push_back(dfs(x, y, 1.0, visited));
        }
        return res;
    }
private:
    unordered_map<string, unordered_map<string, double>> g;
    double dfs(string cur, string target, double acc, unordered_set<string>& visited) {
        if (cur == target) return acc;
        visited.insert(cur);
        for (auto& p : g[cur]) {
            if (!visited.count(p.first)) {
                double r = dfs(p.first, target, acc * p.second, visited);
                if (r != -1.0) return r;
            }
        }
        return -1.0;
    }
};
```

```go [Go]
func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
    g := map[string]map[string]float64{}
    for i, e := range equations {
        a, b := e[0], e[1]
        if g[a] == nil {
            g[a] = map[string]float64{}
        }
        if g[b] == nil {
            g[b] = map[string]float64{}
        }
        g[a][b] = values[i]
        g[b][a] = 1 / values[i]
    }
    var dfs func(cur, target string, acc float64, visited map[string]bool) float64
    dfs = func(cur, target string, acc float64, visited map[string]bool) float64 {
        if cur == target {
            return acc
        }
        visited[cur] = true
        for nxt, w := range g[cur] {
            if !visited[nxt] {
                if r := dfs(nxt, target, acc*w, visited); r != -1 {
                    return r
                }
            }
        }
        return -1
    }
    res := make([]float64, 0, len(queries))
    for _, q := range queries {
        x, y := q[0], q[1]
        if g[x] == nil || g[y] == nil {
            res = append(res, -1)
            continue
        }
        res = append(res, dfs(x, y, 1, map[string]bool{}))
    }
    return res
}
```

```js [JavaScript]
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
    const g = {};
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        (g[a] = g[a] || {})[b] = values[i];
        (g[b] = g[b] || {})[a] = 1 / values[i];
    }
    const dfs = (cur, target, acc, visited) => {
        if (cur === target) return acc;
        visited.add(cur);
        for (const nxt in g[cur]) {
            if (!visited.has(nxt)) {
                const r = dfs(nxt, target, acc * g[cur][nxt], visited);
                if (r !== -1) return r;
            }
        }
        return -1;
    };
    return queries.map(([x, y]) => {
        if (!g[x] || !g[y]) return -1;
        return dfs(x, y, 1, new Set());
    });
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

// C 语言实现较繁琐，这里给出「数组邻接 + DFS」的等价实现。
// 用字符串 ID 映射简化变量管理。
typedef struct { double w; int to; } Edge;

typedef struct { char* name; double w; int to; } Node;

// 简化实现：直接对每个 query 用递归枚举 equations 求积路径。
// 说明：完整版建议使用哈希映射变量到编号 + 邻接表。此处以可运行的朴素搜索示意。
double calcEquationImpl(char** a, char** b, double* v, int n,
                        char* x, char* y, int* used) {
    if (strcmp(x, y) == 0) return 1.0;
    for (int i = 0; i < n; i++) {
        if (used[i]) continue;
        if (strcmp(a[i], x) == 0) {
            used[i] = 1;
            double r = calcEquationImpl(a, b, v, n, b[i], y, used);
            used[i] = 0;
            if (r != -1.0) return v[i] * r;
        }
        if (strcmp(b[i], x) == 0) {
            used[i] = 1;
            double r = calcEquationImpl(a, b, v, n, a[i], y, used);
            used[i] = 0;
            if (r != -1.0) return r / v[i];
        }
    }
    return -1.0;
}

double* calcEquation(char*** equations, int equationsSize, int* equationsColSize,
                     double* values, char*** queries, int queriesSize, int* queriesColSize,
                     int* returnSize) {
    char** A = (char**)malloc(equationsSize * sizeof(char*));
    char** B = (char**)malloc(equationsSize * sizeof(char*));
    for (int i = 0; i < equationsSize; i++) {
        A[i] = equations[i][0];
        B[i] = equations[i][1];
    }
    double* res = (double*)malloc(queriesSize * sizeof(double));
    int* used = (int*)calloc(equationsSize, sizeof(int));
    int foundA, foundB;
    for (int qi = 0; qi < queriesSize; qi++) {
        foundA = foundB = 0;
        for (int i = 0; i < equationsSize; i++) {
            if (strcmp(A[i], queries[qi][0]) == 0 || strcmp(B[i], queries[qi][0]) == 0) foundA = 1;
            if (strcmp(A[i], queries[qi][1]) == 0 || strcmp(B[i], queries[qi][1]) == 0) foundB = 1;
        }
        if (strcmp(queries[qi][0], queries[qi][1]) == 0 && foundA) {
            res[qi] = 1.0;
            continue;
        }
        if (!foundA || !foundB) {
            res[qi] = -1.0;
            continue;
        }
        for (int i = 0; i < equationsSize; i++) used[i] = 0;
        res[qi] = calcEquationImpl(A, B, values, equationsSize,
                                   queries[qi][0], queries[qi][1], used);
    }
    free(A); free(B); free(used);
    *returnSize = queriesSize;
    return res;
}
```

```ts [TypeScript]
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const g: Record<string, Record<string, number>> = {};
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        (g[a] = g[a] || {})[b] = values[i];
        (g[b] = g[b] || {})[a] = 1 / values[i];
    }
    const dfs = (cur: string, target: string, acc: number, visited: Set<string>): number => {
        if (cur === target) return acc;
        visited.add(cur);
        for (const nxt in g[cur]) {
            if (!visited.has(nxt)) {
                const r = dfs(nxt, target, acc * g[cur][nxt], visited);
                if (r !== -1) return r;
            }
        }
        return -1;
    };
    return queries.map(([x, y]) => {
        if (!g[x] || !g[y]) return -1;
        return dfs(x, y, 1, new Set());
    });
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：每个查询 DFS 遍历图 `O(E)`，共 `O(Q × E)`。
- **空间复杂度**：`O(E)`，图结构。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 带权图 + DFS | `O(Q·E)` | `O(E)` | 直观，推荐 |

除法关系构成带权有向图，`x/y` 即路径上的权值乘积。DFS 沿边累积乘积即可求解；也可用并查集（带权）实现更快的多次查询。

