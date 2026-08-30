# [399. 除法求值](https://leetcode.cn/problems/evaluate-division/)

## 一、题目描述

给你一个变量对数组 `equations` 和一个实数值数组 `values` 作为已知条件，其中 `equations[i] = [A_i, B_i]` 且 `values[i]` 表示 `A_i / B_i = values[i]`。

再给你若干 `queries[i] = [C_i, D_i]`，请计算出 `C_i / D_i` 的结果。

- 若无法由已知条件推出结果，则返回 `-1.0`。
- 输入总是有效的：不会出现 `0.0` 作除数，且若 `queries[j]` 中两数均未出现，返回 `-1.0`。

**示例 1：**

```
输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0]
queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
```

**示例 2：**

```
输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0]
queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
输出：[3.75000,0.40000,5.00000,0.20000]
```

**提示：**

- `1 <= equations.length <= 20`
- `values.length == equations.length`
- `2.0 <= values[i] <= 20.0`
- `1 <= equations[i].length, queries[i].length <= 5`
- `equations[i]` 和 `queries[i]` 仅由小写英文字母组成

## 二、解答方法

### 2.1 方法一：并查集（带权）

1. 思路

把每个变量视为节点，`A/B = w` 表示一条有向边。用并查集维护每个节点相对根节点的「比值权重」`weight[x] = x / root`。路径压缩时同步更新权重；查询时若两变量同根则比值 = `weight[c] / weight[d]`，否则不可达返回 `-1.0`。

2. 代码实现

:::::: code-group

```java [Java]
class Solution {
    Map<String, String> parent = new HashMap<>();
    Map<String, Double> weight = new HashMap<>();
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        for (List<String> e : equations) {
            parent.putIfAbsent(e.get(0), e.get(0));
            parent.putIfAbsent(e.get(1), e.get(1));
            weight.putIfAbsent(e.get(0), 1.0);
            weight.putIfAbsent(e.get(1), 1.0);
        }
        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0), b = equations.get(i).get(1);
            union(a, b, values[i]);
        }
        double[] res = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            String c = queries.get(i).get(0), d = queries.get(i).get(1);
            if (!parent.containsKey(c) || !parent.containsKey(d)) { res[i] = -1.0; continue; }
            String rc = find(c), rd = find(d);
            if (!rc.equals(rd)) res[i] = -1.0;
            else res[i] = weight.get(c) / weight.get(d);
        }
        return res;
    }
    private void union(String a, String b, double v) {
        String ra = find(a), rb = find(b);
        if (ra.equals(rb)) return;
        parent.put(ra, rb);
        weight.put(ra, weight.get(b) * v / weight.get(a));
    }
    private String find(String x) {
        if (!parent.get(x).equals(x)) {
            String p = parent.get(x);
            String root = find(p);
            weight.put(x, weight.get(x) * weight.get(p));
            parent.put(x, root);
        }
        return parent.get(x);
    }
}
```

```python [Python]
class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        parent, weight = {}, {}
        def find(x):
            if parent[x] != x:
                root = find(parent[x])
                weight[x] *= weight[parent[x]]
                parent[x] = root
            return parent[x]
        def union(a, b, v):
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            parent[ra] = rb
            weight[ra] = weight[b] * v / weight[a]
        for i, (a, b) in enumerate(equations):
            if a not in parent:
                parent[a] = a; weight[a] = 1.0
            if b not in parent:
                parent[b] = b; weight[b] = 1.0
            union(a, b, values[i])
        res = []
        for c, d in queries:
            if c not in parent or d not in parent:
                res.append(-1.0)
            elif find(c) != find(d):
                res.append(-1.0)
            else:
                res.append(weight[c] / weight[d])
        return res
```

```cpp [C++]
class Solution {
    unordered_map<string, string> parent;
    unordered_map<string, double> weight;
    string find(string x) {
        if (parent[x] != x) {
            string root = find(parent[x]);
            weight[x] *= weight[parent[x]];
            parent[x] = root;
        }
        return parent[x];
    }
    void unite(string a, string b, double v) {
        string ra = find(a), rb = find(b);
        if (ra == rb) return;
        parent[ra] = rb;
        weight[ra] = weight[b] * v / weight[a];
    }
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        for (auto& e : equations) {
            if (!parent.count(e[0])) { parent[e[0]] = e[0]; weight[e[0]] = 1.0; }
            if (!parent.count(e[1])) { parent[e[1]] = e[1]; weight[e[1]] = 1.0; }
        }
        for (int i = 0; i < equations.size(); i++) unite(equations[i][0], equations[i][1], values[i]);
        vector<double> res;
        for (auto& q : queries) {
            if (!parent.count(q[0]) || !parent.count(q[1])) { res.push_back(-1.0); continue; }
            if (find(q[0]) != find(q[1])) res.push_back(-1.0);
            else res.push_back(weight[q[0]] / weight[q[1]]);
        }
        return res;
    }
};
```

```go [Go]
func calcEquation(equations [][]string, values []float64, queries [][]string) []float64 {
	parent := map[string]string{}
	weight := map[string]float64{}
	var find func(string) string
	find = func(x string) string {
		if parent[x] != x {
			root := find(parent[x])
			weight[x] *= weight[parent[x]]
			parent[x] = root
		}
		return parent[x]
	}
	union := func(a, b string, v float64) {
		ra, rb := find(a), find(b)
		if ra == rb {
			return
		}
		parent[ra] = rb
		weight[ra] = weight[b] * v / weight[a]
	}
	for i, e := range equations {
		if _, ok := parent[e[0]]; !ok {
			parent[e[0]] = e[0]
			weight[e[0]] = 1.0
		}
		if _, ok := parent[e[1]]; !ok {
			parent[e[1]] = e[1]
			weight[e[1]] = 1.0
		}
		union(e[0], e[1], values[i])
	}
	res := make([]float64, len(queries))
	for i, q := range queries {
		if _, ok := parent[q[0]]; !ok {
			res[i] = -1.0
			continue
		}
		if _, ok := parent[q[1]]; !ok {
			res[i] = -1.0
			continue
		}
		if find(q[0]) != find(q[1]) {
			res[i] = -1.0
		} else {
			res[i] = weight[q[0]] / weight[q[1]]
		}
	}
	return res
}
```

```javascript [JavaScript]
var calcEquation = function (equations, values, queries) {
    const parent = {}, weight = {};
    const find = (x) => {
        if (parent[x] !== x) {
            const root = find(parent[x]);
            weight[x] *= weight[parent[x]];
            parent[x] = root;
        }
        return parent[x];
    };
    const union = (a, b, v) => {
        const ra = find(a), rb = find(b);
        if (ra === rb) return;
        parent[ra] = rb;
        weight[ra] = weight[b] * v / weight[a];
    };
    for (let i = 0; i < equations.length; i++) {
        const [a, b] = equations[i];
        if (!(a in parent)) { parent[a] = a; weight[a] = 1.0; }
        if (!(b in parent)) { parent[b] = b; weight[b] = 1.0; }
        union(a, b, values[i]);
    }
    return queries.map(([c, d]) => {
        if (!(c in parent) || !(d in parent)) return -1.0;
        if (find(c) !== find(d)) return -1.0;
        return weight[c] / weight[d];
    });
};
```

::::::

3. 复杂度分析

- 时间复杂度：$O((E + Q) \cdot \alpha(N))$，并查集近似常数。
- 空间复杂度：$O(N)$，变量集合。

### 2.2 方法二： Floyd / 图最短路（建图）

1. 思路

把变量当节点，`a/b = w` 建两条有向边 `a->b (w)` 与 `b->a (1/w)`，再用 Floyd 或 BFS 求任意两点比值。适用于需要反复查询所有对的场景。

2. 代码实现（Floyd 思路，Python 示例）

:::::: code-group

```python [Python]
class Solution:
    def calcEquation(self, equations, values, queries):
        g = {}
        for (a, b), v in zip(equations, values):
            g.setdefault(a, {})[b] = v
            g.setdefault(b, {})[a] = 1.0 / v
        nodes = list(g.keys())
        # Floyd
        for k in nodes:
            for i in nodes:
                if k in g[i]:
                    for j in nodes:
                        if i in g and k in g and j in g[k]:
                            g[i][j] = g[i][k] * g[k][j]
        res = []
        for c, d in queries:
            if c in g and d in g.get(c, {}):
                res.append(g[c][d])
            else:
                res.append(-1.0)
        return res
```

::::::

3. 复杂度分析

- 时间复杂度：$O(N^3 + Q)$。
- 空间复杂度：$O(N^2)$。

## 三、总结

并查集带权解法优雅且高效，是本题首选。图的视角（Floyd / BFS）更直观但复杂度更高。相关并查集题目：130、261、323、547 等。
