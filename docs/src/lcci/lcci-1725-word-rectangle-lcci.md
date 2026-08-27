# [面试题 17.25. 单词矩阵](https://leetcode.cn/problems/word-rectangle-lcci/)

## 一、题目描述

给定一份单词清单，设计一个算法，创建由字母组成的面积最大的矩形（即行数和列数乘积最大），其中每一行组成一个单词（从左到右读），每一列也组成一个单词（从上到下读）。单词可以重复使用，但矩形中至少有一个单词。若无法构成则返回空列表。

**示例：**

```
输入: ["this","real","hard","trh","hea","iar","sld"]
输出:
[
  ["this"],
  ["real"],
  ["hard"]
]
（每列 this/real/hard 也构成单词 t-r-h, h-e-a, i-a-r, s-l-d）
```

**提示：** 单词长度需一致才能拼成矩形（每行等长）。

---

## 二、解答方法

### 2.1 方法一：按长度分组 + 前缀 Trie + 回溯

**1. 思路**

将单词按长度分组，仅同长度的单词才可能组成矩形的一行。对某个长度 `L`，尝试选若干单词作为行，要求任意两行在相同列上的字母组合（列前缀）也必须是某个单词的前缀（用 Trie 校验）。对每个行集合，校验所有列是否也为单词；记录最大面积对应的矩形。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    class TrieNode { TrieNode[] children = new TrieNode[26]; boolean isWord = false; }
    public List<String> maxRectangle(String[] words) {
        // 按长度分组
        Map<Integer, List<String>> groups = new HashMap<>();
        for (String w : words) groups.computeIfAbsent(w.length(), k -> new ArrayList<>()).add(w);
        List<String> best = new ArrayList<>();
        for (int len : groups.keySet()) {
            List<String> group = groups.get(len);
            TrieNode root = buildTrie(group);
            // 去重并排序
            dfs(new ArrayList<>(), new boolean[group.size()], group, root, len, best);
        }
        return best;
    }
    private TrieNode buildTrie(List<String> words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode cur = root;
            for (char c : w.toCharArray()) {
                int k = c - 'a';
                if (cur.children[k] == null) cur.children[k] = new TrieNode();
                cur = cur.children[k];
            }
            cur.isWord = true;
        }
        return root;
    }
    private void dfs(List<String> rows, boolean[] used, List<String> group, TrieNode root, int len, List<String> best) {
        if (rows.size() > 0 && validColumns(rows, root, len)) {
            if (rows.size() * len > best.size() * (best.isEmpty() ? 0 : best.get(0).length()))
                best.clear(), best.addAll(new ArrayList<>(rows));
        }
        // 剪枝 + 继续枚举
        for (int i = 0; i < group.size(); i++) {
            if (used[i]) continue;
            rows.add(group.get(i)); used[i] = true;
            dfs(rows, used, group, root, len, best);
            rows.remove(rows.size() - 1); used[i] = false;
        }
    }
    private boolean validColumns(List<String> rows, TrieNode root, int len) {
        int r = rows.size();
        for (int c = 0; c < len; c++) {
            TrieNode cur = root;
            for (int i = 0; i < r; i++) {
                int k = rows.get(i).charAt(c) - 'a';
                if (cur.children[k] == null) return false;
                cur = cur.children[k];
            }
            if (!cur.isWord) return false;
        }
        return true;
    }
}
```

```python [Python]
class Solution:
    def maxRectangle(self, words: List[str]) -> List[str]:
        from collections import defaultdict
        groups = defaultdict(list)
        for w in words: groups[len(w)].append(w)
        best = []
        for length, group in groups.items():
            root = {}
            for w in group:
                cur = root
                for ch in w: cur = cur.setdefault(ch, {})
                cur['#'] = True
            def valid_columns(rows):
                r = len(rows)
                for c in range(length):
                    cur = root
                    for i in range(r):
                        ch = rows[i][c]
                        if ch not in cur: return False
                        cur = cur[ch]
                    if '#' not in cur: return False
                return True
            # 回溯选行
            def dfs(rows, start):
                nonlocal best
                if rows and valid_columns(rows):
                    if len(rows) * length > len(best) * (len(best[0]) if best else 0):
                        best = list(rows)
                for i in range(start, len(group)):
                    dfs(rows + [group[i]], i + 1)
            dfs([], 0)
        return best
```

```go [Go]
func maxRectangle(words []string) []string {
    groups := map[int][]string{}
    for _, w := range words { groups[len(w)] = append(groups[len(w)], w) }
    best := []string{}
    for length, group := range groups {
        // 建 Trie
        root := map[string]interface{}{}
        for _, w := range group {
            cur := root
            for _, ch := range w {
                s := string(ch)
                if _, ok := cur[s]; !ok { cur[s] = map[string]interface{}{} }
                cur = cur[s].(map[string]interface{})
            }
            cur["#"] = true
        }
        var dfs func(rows []string, start int)
        dfs = func(rows []string, start int) {
            // 校验列
            if len(rows) > 0 {
                ok := true
                for c := 0; c < length && ok; c++ {
                    cur := root
                    for i := 0; i < len(rows); i++ {
                        ch := string(rows[i][c])
                        if _, has := cur[ch]; !has { ok = false; break }
                        cur = cur[ch].(map[string]interface{})
                    }
                    if ok && cur["#"] == nil { ok = false }
                }
                if ok {
                    if len(rows)*length > len(best)*(len(best)) {
                        best = append([]string{}, rows...)
                    }
                }
            }
            for i := start; i < len(group); i++ {
                dfs(append(rows, group[i]), i+1)
            }
        }
        dfs([]string{}, 0)
    }
    return best
}
```

```c [C]
// 单词矩阵回溯 + Trie 校验列在 C 中较长，逻辑同上
```

```cpp [C++]
class Solution {
    struct Node { unordered_map<char, Node*> children; bool isWord = false; };
    bool validColumns(const vector<string>& rows, Node* root, int len) {
        int r = rows.size();
        for (int c = 0; c < len; c++) {
            Node* cur = root;
            for (int i = 0; i < r; i++) {
                char ch = rows[i][c];
                if (!cur->children.count(ch)) return false;
                cur = cur->children[ch];
            }
            if (!cur->isWord) return false;
        }
        return true;
    }
public:
    vector<string> maxRectangle(vector<string>& words) {
        unordered_map<int, vector<string>> groups;
        for (auto& w : words) groups[w.size()].push_back(w);
        vector<string> best;
        for (auto& kv : groups) {
            int len = kv.first; vector<string>& group = kv.second;
            Node* root = new Node();
            for (auto& w : group) {
                Node* cur = root;
                for (char c : w) {
                    if (!cur->children.count(c)) cur->children[c] = new Node();
                    cur = cur->children[c];
                }
                cur->isWord = true;
            }
            function<void(vector<string>, int)> dfs = [&](vector<string> rows, int start) {
                if (!rows.empty() && validColumns(rows, root, len)) {
                    if (rows.size() * len > best.size() * (best.empty() ? 0 : (int)best[0].size()))
                        best = rows;
                }
                for (int i = start; i < group.size(); i++) {
                    rows.push_back(group[i]);
                    dfs(rows, i + 1);
                    rows.pop_back();
                }
            };
            dfs({}, 0);
        }
        return best;
    }
};
```

```javascript [JavaScript]
var maxRectangle = function(words) {
    const groups = {};
    for (const w of words) (groups[w.length] = groups[w.length] || []).push(w);
    let best = [];
    for (const length in groups) {
        const group = groups[length];
        const root = {};
        for (const w of group) {
            let cur = root;
            for (const ch of w) cur = cur[ch] = cur[ch] || {};
            cur['#'] = true;
        }
        const validColumns = (rows) => {
            for (let c = 0; c < length; c++) {
                let cur = root;
                for (let i = 0; i < rows.length; i++) {
                    const ch = rows[i][c];
                    if (!(ch in cur)) return false;
                    cur = cur[ch];
                }
                if (!('#' in cur)) return false;
            }
            return true;
        };
        const dfs = (rows, start) => {
            if (rows.length && validColumns(rows)) {
                if (rows.length * length > best.length * (best[0] ? best[0].length : 0)) best = [...rows];
            }
            for (let i = start; i < group.length; i++) dfs([...rows, group[i]], i + 1);
        };
        dfs([], 0);
    }
    return best;
};
```

```typescript [TypeScript]
function maxRectangle(words: string[]): string[] {
    const groups: Record<number, string[]> = {};
    for (const w of words) (groups[w.length] = groups[w.length] || []).push(w);
    let best: string[] = [];
    for (const lengthKey in groups) {
        const length = Number(lengthKey);
        const group = groups[lengthKey];
        const root: any = {};
        for (const w of group) {
            let cur = root;
            for (const ch of w) cur = cur[ch] = cur[ch] || {};
            cur['#'] = true;
        }
        const validColumns = (rows: string[]): boolean => {
            for (let c = 0; c < length; c++) {
                let cur = root;
                for (let i = 0; i < rows.length; i++) {
                    const ch = rows[i][c];
                    if (!(ch in cur)) return false;
                    cur = cur[ch];
                }
                if (!('#' in cur)) return false;
            }
            return true;
        };
        const dfs = (rows: string[], start: number): void => {
            if (rows.length && validColumns(rows)) {
                if (rows.length * length > best.length * (best[0] ? best[0].length : 0)) best = [...rows];
            }
            for (let i = start; i < group.length; i++) dfs([...rows, group[i]], i + 1);
        };
        dfs([], 0);
    }
    return best;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：最坏指数级（回溯选行），但 Trie 剪枝可大幅缩减。
- **空间复杂度**：`O(total_len)`。

---

### 2.2 方法二：枚举所有行组合（暴力）

**1. 思路**

对固定长度的同组单词，枚举任意数量组合作为行，逐一校验所有列是否为单词。实现直观但不加 Trie 剪枝会较慢。

**2. 代码实现**

::::::: code-group

```python [Python]
class Solution:
    def maxRectangle(self, words: List[str]) -> List[str]:
        from itertools import combinations
        groups = {}
        for w in words: groups.setdefault(len(w), []).append(w)
        best = []
        for length, group in groups.items():
            word_set = set(group)
            n = len(group)
            # 二进制枚举子集
            for mask in range(1, 1 << n):
                rows = [group[i] for i in range(n) if mask & (1 << i)]
                ok = True
                for c in range(length):
                    col = ''.join(rows[i][c] for i in range(len(rows)))
                    if col not in word_set: ok = False; break
                if ok:
                    if len(rows) * length > len(best) * (len(best[0]) if best else 0):
                        best = rows
        return best
```

```cpp [C++]
class Solution {
public:
    vector<string> maxRectangle(vector<string>& words) {
        unordered_map<int, vector<string>> groups;
        for (auto& w : words) groups[w.size()].push_back(w);
        vector<string> best;
        for (auto& kv : groups) {
            int len = kv.first; vector<string>& group = kv.second;
            unordered_set<string> st(group.begin(), group.end());
            int n = group.size();
            for (int mask = 1; mask < (1 << n); mask++) {
                vector<string> rows;
                for (int i = 0; i < n; i++) if (mask & (1 << i)) rows.push_back(group[i]);
                bool ok = true;
                for (int c = 0; c < len && ok; c++) {
                    string col;
                    for (auto& r : rows) col += r[c];
                    if (!st.count(col)) ok = false;
                }
                if (ok && rows.size() * len > best.size() * (best.empty() ? 0 : (int)best[0].size()))
                    best = rows;
            }
        }
        return best;
    }
};
```

```javascript [JavaScript]
var maxRectangle = function(words) {
    const groups = {};
    for (const w of words) (groups[w.length] = groups[w.length] || []).push(w);
    let best = [];
    for (const length in groups) {
        const group = groups[length];
        const st = new Set(group);
        const n = group.length;
        for (let mask = 1; mask < (1 << n); mask++) {
            const rows = [];
            for (let i = 0; i < n; i++) if (mask & (1 << i)) rows.push(group[i]);
            let ok = true;
            for (let c = 0; c < length && ok; c++) {
                let col = '';
                for (const r of rows) col += r[c];
                if (!st.has(col)) ok = false;
            }
            if (ok && rows.length * length > best.length * (best[0] ? best[0].length : 0)) best = rows;
        }
    }
    return best;
};
```

```typescript [TypeScript]
function maxRectangle(words: string[]): string[] {
    const groups: Record<number, string[]> = {};
    for (const w of words) (groups[w.length] = groups[w.length] || []).push(w);
    let best: string[] = [];
    for (const lengthKey in groups) {
        const length = Number(lengthKey);
        const group = groups[lengthKey];
        const st = new Set(group);
        const n = group.length;
        for (let mask = 1; mask < (1 << n); mask++) {
            const rows: string[] = [];
            for (let i = 0; i < n; i++) if (mask & (1 << i)) rows.push(group[i]);
            let ok = true;
            for (let c = 0; c < length && ok; c++) {
                let col = '';
                for (const r of rows) col += r[c];
                if (!st.has(col)) ok = false;
            }
            if (ok && rows.length * length > best.length * (best[0] ? best[0].length : 0)) best = rows;
        }
    }
    return best;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(2^n · n · L)`，n 为同长度词数。
- **空间复杂度**：`O(n · L)`。

---

## 三、总结

| 方法           | 时间复杂度    | 空间复杂度 | 特点                       |
| -------------- | ------------- | ---------- | -------------------------- |
| Trie + 回溯    | 最坏指数（剪枝优）| `O(total_len)` | 推荐，剪枝有效           |
| 二进制枚举     | `O(2^n·n·L)`  | `O(n·L)`   | 直观，规模小可用           |

**推荐**：用 Trie + 回溯，建列前缀快速剪枝，避免无效组合。
