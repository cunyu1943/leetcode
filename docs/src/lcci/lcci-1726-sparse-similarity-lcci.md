# [面试题 17.26. 稀疏相似度](https://leetcode.cn/problems/sparse-similarity-lcci/)

## 一、题目描述

两个（具有不同单词的）文档的交集（intersection）中元素的个数除以并集（union）中元素的个数，就是这两个文档的相似度。例如，如果文档 A 包含集合 `{a, b, c}` 而文档 B 包含集合 `{b, c, d}`，则它们的相似度为 `2/4 = 0.5`（交集中有两个共同元素，并集中有四个不同元素）。

给定一系列长文档（以字符串数组 `docs` 表示，每个文档是一组由空格分隔的单词），返回每对文档之间的相似度。以任意顺序返回一个字符串数组，每个字符串形如 `"i,j:0.50"`（`i < j` 且相似度保留两位小数）。相似度为 0 的文档对无需列出。

**示例：**

```
输入: docs = [
  "a b c d e f",   // 文档 0
  "a b c d e",     // 文档 1
  "a b c d",       // 文档 2
  "a b c",         // 文档 3
  "a b",           // 文档 4
]
输出:
[
  "0,1:0.80",
  "0,2:0.67",
  "0,3:0.57",
  "0,4:0.40",
  "1,2:0.80",
  "1,3:0.67",
  "1,4:0.50",
  "2,3:0.80",
  "2,4:0.67",
  "3,4:0.80"
]
```

---

## 二、解答方法

### 2.1 方法一：倒排索引（单词 → 文档列表）

**1. 思路**

建立倒排索引：每个单词映射到包含它的文档编号列表。对每个单词，将其对应文档列表中的两两组合计数（交集大小加 1）。最后对每个文档对 `(i,j)`，用交集大小除以并集大小 `|i| + |j| - 交集` 得到相似度。用倒排索引可避免 `O(n²)` 全比较。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public List<String> computeSimilarities(String[] docs) {
        int n = docs.length;
        Map<String, List<Integer>> inv = new HashMap<>();
        List<Set<String>> sets = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            Set<String> set = new HashSet<>();
            for (String w : docs[i].split(" ")) {
                set.add(w);
                inv.computeIfAbsent(w, k -> new ArrayList<>()).add(i);
            }
            sets.add(set);
        }
        Map<String, Integer> inter = new HashMap<>();
        for (List<Integer> list : inv.values()) {
            for (int a = 0; a < list.size(); a++)
                for (int b = a + 1; b < list.size(); b++) {
                    int i = list.get(a), j = list.get(b);
                    String key = i < j ? i + "," + j : j + "," + i;
                    inter.put(key, inter.getOrDefault(key, 0) + 1);
                }
        }
        List<String> res = new ArrayList<>();
        for (var e : inter.entrySet()) {
            String[] parts = e.getKey().split(",");
            int i = Integer.parseInt(parts[0]), j = Integer.parseInt(parts[1]);
            int union = sets.get(i).size() + sets.get(j).size() - e.getValue();
            double sim = (double) e.getValue() / union;
            res.add(e.getKey() + ":" + String.format("%.2f", sim));
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def computeSimilarities(self, docs: List[str]) -> List[str]:
        from collections import defaultdict
        n = len(docs)
        inv = defaultdict(list)
        sets = []
        for i, d in enumerate(docs):
            words = set(d.split())
            sets.append(words)
            for w in words:
                inv[w].append(i)
        inter = defaultdict(int)
        for lst in inv.values():
            for a in range(len(lst)):
                for b in range(a + 1, len(lst)):
                    i, j = lst[a], lst[b]
                    key = f"{i},{j}" if i < j else f"{j},{i}"
                    inter[key] += 1
        res = []
        for key, cnt in inter.items():
            i, j = map(int, key.split(","))
            union = len(sets[i]) + len(sets[j]) - cnt
            sim = cnt / union
            res.append(f"{key}:{sim:.2f}")
        return res
```

```go [Go]
func computeSimilarities(docs []string) []string {
    n := len(docs)
    inv := map[string][]int{}
    sets := make([]map[string]bool, n)
    for i, d := range docs {
        sets[i] = map[string]bool{}
        for _, w := range strings.Fields(d) {
            sets[i][w] = true
            inv[w] = append(inv[w], i)
        }
    }
    type pair struct{ i, j int }
    inter := map[pair]int{}
    for _, lst := range inv {
        for a := 0; a < len(lst); a++ {
            for b := a + 1; b < len(lst); b++ {
                i, j := lst[a], lst[b]
                if i > j { i, j = j, i }
                inter[pair{i, j}]++
            }
        }
    }
    res := []string{}
    for p, cnt := range inter {
        union := len(sets[p.i]) + len(sets[p.j]) - cnt
        sim := float64(cnt) / float64(union)
        res = append(res, fmt.Sprintf("%d,%d:%.2f", p.i, p.j, sim))
    }
    return res
}
```

```c [C]
// 倒排索引在 C 中需手动建哈希表，逻辑同上
```

```cpp [C++]
class Solution {
public:
    vector<string> computeSimilarities(vector<string>& docs) {
        int n = docs.size();
        unordered_map<string, vector<int>> inv;
        vector<unordered_set<string>> sets(n);
        for (int i = 0; i < n; i++) {
            stringstream ss(docs[i]); string w;
            while (ss >> w) { sets[i].insert(w); inv[w].push_back(i); }
        }
        map<pair<int,int>, int> inter;
        for (auto& kv : inv) {
            auto& lst = kv.second;
            for (int a = 0; a < lst.size(); a++)
                for (int b = a + 1; b < lst.size(); b++) {
                    int i = lst[a], j = lst[b];
                    if (i > j) swap(i, j);
                    inter[{i, j}]++;
                }
        }
        vector<string> res;
        for (auto& kv : inter) {
            int i = kv.first.first, j = kv.first.second;
            int unionSize = sets[i].size() + sets[j].size() - kv.second;
            double sim = (double)kv.second / unionSize;
            char buf[32];
            sprintf(buf, "%d,%d:%.2f", i, j, sim);
            res.push_back(buf);
        }
        return res;
    }
};
```

```javascript [JavaScript]
var computeSimilarities = function(docs) {
    const n = docs.length;
    const inv = {};
    const sets = [];
    docs.forEach((d, i) => {
        const s = new Set(d.split(' '));
        sets.push(s);
        for (const w of s) (inv[w] = inv[w] || []).push(i);
    });
    const inter = {};
    for (const w in inv) {
        const lst = inv[w];
        for (let a = 0; a < lst.length; a++)
            for (let b = a + 1; b < lst.length; b++) {
                let i = lst[a], j = lst[b];
                const key = i < j ? `${i},${j}` : `${j},${i}`;
                inter[key] = (inter[key] || 0) + 1;
            }
    }
    const res = [];
    for (const key in inter) {
        const [i, j] = key.split(',').map(Number);
        const union = sets[i].size + sets[j].size - inter[key];
        const sim = inter[key] / union;
        res.push(`${key}:${sim.toFixed(2)}`);
    }
    return res;
};
```

```typescript [TypeScript]
function computeSimilarities(docs: string[]): string[] {
    const n = docs.length;
    const inv: Record<string, number[]> = {};
    const sets: Set<string>[] = [];
    docs.forEach((d, i) => {
        const s = new Set(d.split(' '));
        sets.push(s);
        for (const w of s) (inv[w] = inv[w] || []).push(i);
    });
    const inter: Record<string, number> = {};
    for (const w in inv) {
        const lst = inv[w];
        for (let a = 0; a < lst.length; a++)
            for (let b = a + 1; b < lst.length; b++) {
                let i = lst[a], j = lst[b];
                const key = i < j ? `${i},${j}` : `${j},${i}`;
                inter[key] = (inter[key] || 0) + 1;
            }
    }
    const res: string[] = [];
    for (const key in inter) {
        const [i, j] = key.split(',').map(Number);
        const union = sets[i].size + sets[j].size - inter[key];
        const sim = inter[key] / union;
        res.push(`${key}:${sim.toFixed(2)}`);
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(W · d²)`，W 为不同单词数，d 为每个单词平均出现的文档数。
- **空间复杂度**：`O(W · d)`。

---

### 2.2 方法二：两两文档直接比较（暴力）

**1. 思路**

对每对文档 `(i,j)` 直接求集合交集与并集。实现最简单，但 `O(n² · L)`（L 为每文档平均词数），仅适合文档数极少。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def computeSimilarities(self, docs: List[str]) -> List[str]:
        n = len(docs)
        sets = [set(d.split()) for d in docs]
        res = []
        for i in range(n):
            for j in range(i + 1, n):
                inter = len(sets[i] & sets[j])
                if inter == 0: continue
                union = len(sets[i]) + len(sets[j]) - inter
                sim = inter / union
                res.append(f"{i},{j}:{sim:.2f}")
        return res
```

```cpp [C++]
class Solution {
public:
    vector<string> computeSimilarities(vector<string>& docs) {
        int n = docs.size();
        vector<unordered_set<string>> sets(n);
        for (int i = 0; i < n; i++) {
            stringstream ss(docs[i]); string w;
            while (ss >> w) sets[i].insert(w);
        }
        vector<string> res;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int inter = 0;
                for (auto& w : sets[i]) if (sets[j].count(w)) inter++;
                if (inter == 0) continue;
                int unionSize = sets[i].size() + sets[j].size() - inter;
                double sim = (double)inter / unionSize;
                char buf[32]; sprintf(buf, "%d,%d:%.2f", i, j, sim);
                res.push_back(buf);
            }
        return res;
    }
};
```

```javascript [JavaScript]
var computeSimilarities = function(docs) {
    const sets = docs.map(d => new Set(d.split(' ')));
    const n = docs.length, res = [];
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++) {
            let inter = 0;
            for (const w of sets[i]) if (sets[j].has(w)) inter++;
            if (inter === 0) continue;
            const union = sets[i].size + sets[j].size - inter;
            res.push(`${i},${j}:${(inter/union).toFixed(2)}`);
        }
    return res;
};
```

```typescript [TypeScript]
function computeSimilarities(docs: string[]): string[] {
    const sets = docs.map(d => new Set(d.split(' ')));
    const n = docs.length, res: string[] = [];
    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++) {
            let inter = 0;
            for (const w of sets[i]) if (sets[j].has(w)) inter++;
            if (inter === 0) continue;
            const union = sets[i].size + sets[j].size - inter;
            res.push(`${i},${j}:${(inter/union).toFixed(2)}`);
        }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(n² · L)`。
- **空间复杂度**：`O(n · L)`。

---

## 三、总结

| 方法           | 时间复杂度  | 空间复杂度 | 特点                       |
| -------------- | ----------- | ---------- | -------------------------- |
| 倒排索引       | `O(W·d²)`   | `O(W·d)`   | 高效，推荐                 |
| 两两直接比较   | `O(n²·L)`   | `O(n·L)`   | 简单，文档多超时           |

**推荐**：使用倒排索引，按单词聚合文档对，避免 `O(n²)` 全比较。
