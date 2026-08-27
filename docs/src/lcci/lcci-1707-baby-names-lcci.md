# [面试题 17.07. 婴儿名字](https://leetcode.cn/problems/baby-names-lcci/)

## 一、题目描述

每年，政府都会公布一万个最常见的婴儿名字和它们出现的频率，也就是同名婴儿的数量。有些名字有多种拼法，例如 John 和 Jon 本质上是相同的，Jack 和 Jackie 是婴儿版本的相同名字。我们要求你统计每个名字（等效名字集合）的频率。

给定一个名字列表 `names` 和对应的频率 `frequencies`，再给定一个表示同义名字对的 `synonyms` 列表。请输出合并后的名字及其频率，按字典序排列。

**示例：**

```
输入:
names = ["John(15)","Jon(12)","Chris(13)","Kris(4)","Christopher(19)"]
synonyms = ["(Jon,John)","(John,Johnny)","(Chris,Kris)","(Chris,Christopher)"]

输出:
["John(27)","Chris(36)"]
```

---

## 二、解答方法

### 2.1 方法一：并查集（Union-Find）

**1. 思路**

将每个名字视为图的节点，`synonyms` 给出边的连接关系。用并查集把所有同义名字合并到同一集合中。遍历所有名字，把频率累加到各自集合的代表元（取字典序最小者作为代表）。最后输出每个集合的总频率。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    Map<String, String> parent = new HashMap<>();
    Map<String, Integer> rank = new HashMap<>();

    private String find(String x) {
        if (!parent.get(x).equals(x)) parent.put(x, find(parent.get(x)));
        return parent.get(x);
    }
    private void union(String a, String b) {
        String ra = find(a), rb = find(b);
        if (ra.equals(rb)) return;
        if (rank.get(ra) < rank.get(rb)) parent.put(ra, rb);
        else if (rank.get(ra) > rank.get(rb)) parent.put(rb, ra);
        else { parent.put(rb, ra); rank.put(ra, rank.get(ra) + 1); }
    }

    public String[] trulyMostPopular(String[] names, String[] synonyms) {
        Map<String, Integer> freq = new HashMap<>();
        for (String s : names) {
            int idx = s.indexOf('(');
            String name = s.substring(0, idx);
            int f = Integer.parseInt(s.substring(idx + 1, s.length() - 1));
            freq.put(name, f);
            parent.put(name, name);
            rank.put(name, 0);
        }
        for (String s : synonyms) {
            String[] parts = s.replace("(", "").replace(")", "").split(",");
            String a = parts[0], b = parts[1];
            parent.putIfAbsent(a, a); rank.putIfAbsent(a, 0);
            parent.putIfAbsent(b, b); rank.putIfAbsent(b, 0);
            union(a, b);
        }
        Map<String, Integer> total = new HashMap<>();
        for (String name : freq.keySet()) {
            String root = find(name);
            // 用字典序最小名字作代表
            total.put(root, total.getOrDefault(root, 0) + freq.get(name));
        }
        List<String> res = new ArrayList<>();
        for (Map.Entry<String, Integer> e : total.entrySet()) {
            res.add(e.getKey() + "(" + e.getValue() + ")");
        }
        // 确保代表为集合内字典序最小
        Map<String, String> minName = new HashMap<>();
        for (String name : parent.keySet()) {
            String r = find(name);
            if (!minName.containsKey(r) || name.compareTo(minName.get(r)) < 0) minName.put(r, name);
        }
        List<String> out = new ArrayList<>();
        for (String r : total.keySet()) out.add(minName.get(r) + "(" + total.get(r) + ")");
        Collections.sort(out);
        return out.toArray(new String[0]);
    }
}
```

```python [Python]
class Solution:
    def trulyMostPopular(self, names: List[str], synonyms: List[str]) -> List[str]:
        parent = {}
        def find(x):
            parent.setdefault(x, x)
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x
        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                if ra < rb: parent[rb] = ra
                else: parent[ra] = rb

        freq = {}
        for s in names:
            i = s.index('(')
            name = s[:i]
            freq[name] = int(s[i + 1:-1])
            parent.setdefault(name, name)
        for s in synonyms:
            a, b = s[1:-1].split(',')
            parent.setdefault(a, a)
            parent.setdefault(b, b)
            union(a, b)
        from collections import defaultdict
        total = defaultdict(int)
        for name, f in freq.items():
            total[find(name)] += f
        rep = {}
        for name in parent:
            r = find(name)
            if r not in rep or name < rep[r]:
                rep[r] = name
        out = [f"{rep[r]}({total[r]})" for r in total]
        return sorted(out)
```

```go [Go]
func trulyMostPopular(names []string, synonyms []string) []string {
    parent := map[string]string{}
    var find func(string) string
    find = func(x string) string {
        if parent[x] == "" { parent[x] = x }
        for parent[x] != x {
            parent[x] = parent[parent[x]]
            x = parent[x]
        }
        return x
    }
    union := func(a, b string) {
        ra, rb := find(a), find(b)
        if ra != rb {
            if ra < rb { parent[rb] = ra } else { parent[ra] = rb }
        }
    }
    freq := map[string]int{}
    for _, s := range names {
        i := strings.Index(s, "(")
        name := s[:i]
        f, _ := strconv.Atoi(s[i+1 : len(s)-1])
        freq[name] = f
        parent[name] = name
    }
    for _, s := range synonyms {
        s = s[1 : len(s)-1]
        parts := strings.Split(s, ",")
        parent[parts[0]] = parts[0]
        parent[parts[1]] = parts[1]
        union(parts[0], parts[1])
    }
    total := map[string]int{}
    for name, f := range freq {
        total[find(name)] += f
    }
    rep := map[string]string{}
    for name := range parent {
        r := find(name)
        if rep[r] == "" || name < rep[r] { rep[r] = name }
    }
    out := []string{}
    for r, t := range total {
        out = append(out, fmt.Sprintf("%s(%d)", rep[r], t))
    }
    sort.Strings(out)
    return out
}
```

```c [C]
// 并查集在 C 中实现较长，思路同上方：建立字符串并查集后聚合频率
```

```cpp [C++]
class Solution {
    unordered_map<string, string> parent;
    string find(string x) {
        if (parent.find(x) == parent.end()) parent[x] = x;
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void unite(string a, string b) {
        string ra = find(a), rb = find(b);
        if (ra != rb) parent[rb] = ra < rb ? ra : rb;
    }
public:
    vector<string> trulyMostPopular(vector<string>& names, vector<string>& synonyms) {
        unordered_map<string, int> freq;
        for (auto& s : names) {
            int i = s.find('(');
            string name = s.substr(0, i);
            int f = stoi(s.substr(i + 1, s.size() - i - 2));
            freq[name] = f;
            parent[name] = name;
        }
        for (auto& s : synonyms) {
            string t = s.substr(1, s.size() - 2);
            int c = t.find(',');
            string a = t.substr(0, c), b = t.substr(c + 1);
            parent[a] = a; parent[b] = b;
            unite(a, b);
        }
        unordered_map<string, int> total;
        for (auto& p : freq) total[find(p.first)] += p.second;
        unordered_map<string, string> rep;
        for (auto& p : parent) {
            string r = find(p.first);
            if (rep.find(r) == rep.end() || p.first < rep[r]) rep[r] = p.first;
        }
        vector<string> out;
        for (auto& p : total) out.push_back(rep[p.first] + "(" + to_string(p.second) + ")");
        sort(out.begin(), out.end());
        return out;
    }
};
```

```javascript [JavaScript]
var trulyMostPopular = function(names, synonyms) {
    const parent = {};
    const find = x => {
        if (!(x in parent)) parent[x] = x;
        while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    };
    const union = (a, b) => {
        const ra = find(a), rb = find(b);
        if (ra !== rb) parent[rb] = ra < rb ? ra : rb;
    };
    const freq = {};
    for (const s of names) {
        const i = s.indexOf('(');
        const name = s.slice(0, i);
        freq[name] = +s.slice(i + 1, -1);
        parent[name] = name;
    }
    for (const s of synonyms) {
        const [a, b] = s.slice(1, -1).split(',');
        parent[a] = a; parent[b] = b;
        union(a, b);
    }
    const total = {};
    for (const name in freq) total[find(name)] = (total[find(name)] || 0) + freq[name];
    const rep = {};
    for (const name in parent) {
        const r = find(name);
        if (!(r in rep) || name < rep[r]) rep[r] = name;
    }
    const out = [];
    for (const r in total) out.push(`${rep[r]}(${total[r]})`);
    return out.sort();
};
```

```typescript [TypeScript]
function trulyMostPopular(names: string[], synonyms: string[]): string[] {
    const parent: Record<string, string> = {};
    const find = (x: string): string => {
        if (!(x in parent)) parent[x] = x;
        while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    };
    const union = (a: string, b: string) => {
        const ra = find(a), rb = find(b);
        if (ra !== rb) parent[rb] = ra < rb ? ra : rb;
    };
    const freq: Record<string, number> = {};
    for (const s of names) {
        const i = s.indexOf('(');
        const name = s.slice(0, i);
        freq[name] = +s.slice(i + 1, -1);
        parent[name] = name;
    }
    for (const s of synonyms) {
        const [a, b] = s.slice(1, -1).split(',');
        parent[a] = a; parent[b] = b;
        union(a, b);
    }
    const total: Record<string, number> = {};
    for (const name in freq) {
        const r = find(name);
        total[r] = (total[r] || 0) + freq[name];
    }
    const rep: Record<string, string> = {};
    for (const name in parent) {
        const r = find(name);
        if (!(r in rep) || name < rep[r]) rep[r] = name;
    }
    const out: string[] = [];
    for (const r in total) out.push(`${rep[r]}(${total[r]})`);
    return out.sort();
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(N α(N))`，α 为反阿克曼函数，近似常数。
- **空间复杂度**：`O(N)`。

---

### 2.2 方法二：DFS / BFS 划分子图

**1. 思路**

将同义关系建成邻接表，对每个未访问名字做 DFS 收集连通分量，分量内名字频率求和，代表名取字典序最小。本质与并查集等价。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def trulyMostPopular(self, names: List[str], synonyms: List[str]) -> List[str]:
        from collections import defaultdict
        g = defaultdict(set)
        all_names = set()
        for s in names:
            all_names.add(s[:s.index('(')])
        for s in synonyms:
            a, b = s[1:-1].split(',')
            g[a].add(b); g[b].add(a)
            all_names.add(a); all_names.add(b)
        freq = {s[:s.index('(')]: int(s[s.index('(')+1:-1]) for s in names}
        visited = set()
        res = []
        for name in all_names:
            if name in visited: continue
            stack = [name]; visited.add(name); total = 0; rep = name
            while stack:
                cur = stack.pop()
                total += freq.get(cur, 0)
                if cur < rep: rep = cur
                for nxt in g[cur]:
                    if nxt not in visited:
                        visited.add(nxt); stack.append(nxt)
            res.append(f"{rep}({total})")
        return sorted(res)
```

```cpp [C++]
class Solution {
public:
    vector<string> trulyMostPopular(vector<string>& names, vector<string>& synonyms) {
        unordered_map<string, unordered_set<string>> g;
        unordered_map<string, int> freq;
        for (auto& s : names) {
            int i = s.find('(');
            string name = s.substr(0, i);
            freq[name] = stoi(s.substr(i + 1, s.size() - i - 2));
            g[name];
        }
        for (auto& s : synonyms) {
            string t = s.substr(1, s.size() - 2);
            int c = t.find(',');
            string a = t.substr(0, c), b = t.substr(c + 1);
            g[a].insert(b); g[b].insert(a);
        }
        unordered_set<string> visited;
        vector<string> res;
        for (auto& p : g) {
            string start = p.first;
            if (visited.count(start)) continue;
            unordered_set<string> comp;
            stack<string> st; st.push(start); visited.insert(start);
            while (!st.empty()) {
                string cur = st.top(); st.pop();
                comp.insert(cur);
                for (auto& nxt : g[cur]) if (!visited.count(nxt)) { visited.insert(nxt); st.push(nxt); }
            }
            string rep = *comp.begin(); int total = 0;
            for (auto& nm : comp) { if (nm < rep) rep = nm; total += freq[nm]; }
            res.push_back(rep + "(" + to_string(total) + ")");
        }
        sort(res.begin(), res.end());
        return res;
    }
};
```

```javascript [JavaScript]
var trulyMostPopular = function(names, synonyms) {
    const g = {}, freq = {};
    for (const s of names) {
        const i = s.indexOf('(');
        const name = s.slice(0, i);
        freq[name] = +s.slice(i + 1, -1);
        g[name] = g[name] || new Set();
    }
    for (const s of synonyms) {
        const [a, b] = s.slice(1, -1).split(',');
        g[a] = g[a] || new Set(); g[b] = g[b] || new Set();
        g[a].add(b); g[b].add(a);
    }
    const visited = new Set();
    const res = [];
    for (const name in g) {
        if (visited.has(name)) continue;
        const stack = [name]; visited.add(name);
        let total = 0, rep = name; const comp = new Set();
        while (stack.length) {
            const cur = stack.pop();
            comp.add(cur);
            total += freq[cur] || 0;
            if (cur < rep) rep = cur;
            for (const nxt of g[cur]) if (!visited.has(nxt)) { visited.add(nxt); stack.push(nxt); }
        }
        res.push(`${rep}(${total})`);
    }
    return res.sort();
};
```

```typescript [TypeScript]
function trulyMostPopular(names: string[], synonyms: string[]): string[] {
    const g: Record<string, Set<string>> = {}, freq: Record<string, number> = {};
    for (const s of names) {
        const i = s.indexOf('(');
        const name = s.slice(0, i);
        freq[name] = +s.slice(i + 1, -1);
        g[name] = g[name] || new Set();
    }
    for (const s of synonyms) {
        const [a, b] = s.slice(1, -1).split(',');
        g[a] = g[a] || new Set(); g[b] = g[b] || new Set();
        g[a].add(b); g[b].add(a);
    }
    const visited = new Set<string>();
    const res: string[] = [];
    for (const name in g) {
        if (visited.has(name)) continue;
        const stack = [name]; visited.add(name);
        let total = 0, rep = name;
        while (stack.length) {
            const cur = stack.pop()!;
            total += freq[cur] || 0;
            if (cur < rep) rep = cur;
            for (const nxt of g[cur]) if (!visited.has(nxt)) { visited.add(nxt); stack.push(nxt); }
        }
        res.push(`${rep}(${total})`);
    }
    return res.sort();
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(N)`，遍历所有名字与边。
- **空间复杂度**：`O(N)`。

---

## 三、总结

| 方法           | 时间复杂度 | 空间复杂度 | 特点                       |
| -------------- | ---------- | ---------- | -------------------------- |
| 并查集         | `O(N α N)` | `O(N)`     | 推荐，聚合高效             |
| DFS 划分子图   | `O(N)`     | `O(N)`     | 直观，代表名取最小         |

**推荐**：并查集在最坏情况下更稳定高效，是处理等价类的标准做法。
