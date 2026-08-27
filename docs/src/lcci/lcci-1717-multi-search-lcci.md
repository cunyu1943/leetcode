# [面试题 17.17. 多次搜索](https://leetcode.cn/problems/multi-search-lcci/)

## 一、题目描述

给定一个较长字符串 `big` 和一个包含较短字符串的数组 `smalls`，设计一个方法，根据 `smalls` 中的每一个较短字符串，对 `big` 进行搜索。输出 `smalls` 中的字符串在 `big` 里出现的所有位置下标，下标从 0 开始。返回结果的顺序应与 `smalls` 中的字符串顺序一致。

**示例：**

```
输入:
big = "mississippi"
smalls = ["is","ppi","hi","sis","i","ssippi"]
输出: [[1,4],[3,6],[],[2],[1,4,7,10],[5]]
```

**提示：**

- `0 <= len(big) <= 1000`
- `0 <= len(smalls[i]) <= 1000`
- `smalls` 的总字符数不会超过 100000。

---

## 二、解答方法

### 2.1 方法一：构建前缀树 + 枚举所有起点

**1. 思路**

将 `smalls` 全部插入 Trie。对 `big` 的每个起点 `i`，沿 Trie 匹配，经过的所有「词尾」节点对应的单词记录下下标 `i`。一次遍历即可收集所有结果，避免对每个 `small` 单独扫描 `big`。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    class Node { Node[] children = new Node[26]; boolean end = false; int idx = -1; }
    public int[][] multiSearch(String big, String[] smalls) {
        Node root = new Node();
        for (int i = 0; i < smalls.length; i++) {
            Node cur = root;
            for (char c : smalls[i].toCharArray()) {
                int k = c - 'a';
                if (cur.children[k] == null) cur.children[k] = new Node();
                cur = cur.children[k];
            }
            cur.end = true; cur.idx = i;
        }
        Map<Integer, List<Integer>> map = new HashMap<>();
        for (int i = 0; i < big.length(); i++) {
            Node cur = root;
            for (int j = i; j < big.length(); j++) {
                int k = big.charAt(j) - 'a';
                if (cur.children[k] == null) break;
                cur = cur.children[k];
                if (cur.end) map.computeIfAbsent(cur.idx, x -> new ArrayList<>()).add(i);
            }
        }
        int[][] res = new int[smalls.length][];
        for (int i = 0; i < smalls.length; i++) {
            List<Integer> list = map.getOrDefault(i, new ArrayList<>());
            res[i] = list.stream().mapToInt(x -> x).toArray();
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def multiSearch(self, big: str, smalls: List[str]) -> List[List[int]]:
        root = {}
        for idx, w in enumerate(smalls):
            cur = root
            for ch in w:
                cur = cur.setdefault(ch, {})
            cur['#'] = idx
        mp = {i: [] for i in range(len(smalls))}
        for i in range(len(big)):
            cur = root
            for j in range(i, len(big)):
                ch = big[j]
                if ch not in cur: break
                cur = cur[ch]
                if '#' in cur: mp[cur['#']].append(i)
        return [mp[i] for i in range(len(smalls))]
```

```go [Go]
func multiSearch(big string, smalls []string) [][]int {
    type node struct {
        children [26]*node
        end      bool
        idx      int
    }
    root := &node{}
    for i, w := range smalls {
        cur := root
        for _, c := range w {
            k := c - 'a'
            if cur.children[k] == nil { cur.children[k] = &node{} }
            cur = cur.children[k]
        }
        cur.end, cur.idx = true, i
    }
    mp := make([]map[int]bool, len(smalls))
    for i := range mp { mp[i] = map[int]bool{} }
    for i := 0; i < len(big); i++ {
        cur := root
        for j := i; j < len(big); j++ {
            k := big[j] - 'a'
            if cur.children[k] == nil { break }
            cur = cur.children[k]
            if cur.end { mp[cur.idx][i] = true }
        }
    }
    res := make([][]int, len(smalls))
    for i := range res {
        for p := range mp[i] { res[i] = append(res[i], p) }
        sort.Ints(res[i])
    }
    return res
}
```

```c [C]
// Trie 多模式匹配在 C 中实现较长，逻辑同上：所有 small 建 Trie 后枚举 big 起点
```

```cpp [C++]
class Solution {
    struct Node { Node* children[26] = {nullptr}; bool end = false; int idx = -1; };
public:
    vector<vector<int>> multiSearch(string big, vector<string>& smalls) {
        Node* root = new Node();
        for (int i = 0; i < smalls.size(); i++) {
            Node* cur = root;
            for (char c : smalls[i]) {
                int k = c - 'a';
                if (!cur->children[k]) cur->children[k] = new Node();
                cur = cur->children[k];
            }
            cur->end = true; cur->idx = i;
        }
        vector<vector<int>> res(smalls.size());
        for (int i = 0; i < big.size(); i++) {
            Node* cur = root;
            for (int j = i; j < big.size(); j++) {
                int k = big[j] - 'a';
                if (!cur->children[k]) break;
                cur = cur->children[k];
                if (cur->end) res[cur->idx].push_back(i);
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
var multiSearch = function(big, smalls) {
    const root = {};
    smalls.forEach((w, idx) => {
        let cur = root;
        for (const ch of w) cur = cur[ch] = cur[ch] || {};
        cur['#'] = idx;
    });
    const res = smalls.map(() => []);
    for (let i = 0; i < big.length; i++) {
        let cur = root;
        for (let j = i; j < big.length; j++) {
            const ch = big[j];
            if (!(ch in cur)) break;
            cur = cur[ch];
            if ('#' in cur) res[cur['#']].push(i);
        }
    }
    return res;
};
```

```typescript [TypeScript]
function multiSearch(big: string, smalls: string[]): number[][] {
    const root: any = {};
    smalls.forEach((w, idx) => {
        let cur = root;
        for (const ch of w) cur = cur[ch] = cur[ch] || {};
        cur['#'] = idx;
    });
    const res: number[][] = smalls.map(() => []);
    for (let i = 0; i < big.length; i++) {
        let cur = root;
        for (let j = i; j < big.length; j++) {
            const ch = big[j];
            if (!(ch in cur)) break;
            cur = cur[ch];
            if ('#' in cur) res[cur['#']].push(i);
        }
    }
    return res;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(len(big) · L)`，L 为最长 `small`。
- **空间复杂度**：`O(total_len(smalls))`。

---

### 2.2 方法二：逐个子串暴力匹配

**1. 思路**

对每个 `small`，在 `big` 中枚举所有起点用 `startsWith` / `substr` 匹配。实现最简单，但复杂度较高。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int[][] multiSearch(String big, String[] smalls) {
        int[][] res = new int[smalls.length][];
        for (int i = 0; i < smalls.length; i++) {
            List<Integer> list = new ArrayList<>();
            String s = smalls[i];
            for (int j = 0; j + s.length() <= big.length(); j++) {
                if (big.startsWith(s, j)) list.add(j);
            }
            res[i] = list.stream().mapToInt(x -> x).toArray();
        }
        return res;
    }
}
```

```python [Python]
class Solution:
    def multiSearch(self, big: str, smalls: List[str]) -> List[List[int]]:
        res = []
        for s in smalls:
            idxs = [i for i in range(len(big) - len(s) + 1) if big.startswith(s, i)]
            res.append(idxs)
        return res
```

```cpp [C++]
class Solution {
public:
    vector<vector<int>> multiSearch(string big, vector<string>& smalls) {
        vector<vector<int>> res(smalls.size());
        for (int i = 0; i < smalls.size(); i++) {
            string s = smalls[i];
            for (int j = 0; j + s.size() <= big.size(); j++) {
                if (big.substr(j, s.size()) == s) res[i].push_back(j);
            }
        }
        return res;
    }
};
```

```javascript [JavaScript]
var multiSearch = function(big, smalls) {
    return smalls.map(s => {
        const idxs = [];
        for (let j = 0; j + s.length <= big.length; j++) {
            if (big.startsWith(s, j)) idxs.push(j);
        }
        return idxs;
    });
};
```

```typescript [TypeScript]
function multiSearch(big: string, smalls: string[]): number[][] {
    return smalls.map(s => {
        const idxs: number[] = [];
        for (let j = 0; j + s.length <= big.length; j++) {
            if (big.startsWith(s, j)) idxs.push(j);
        }
        return idxs;
    });
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(m · len(big) · L)`，m 为 smalls 长度。
- **空间复杂度**：`O(1)` 额外（不计结果）。

---

## 三、总结

| 方法           | 时间复杂度        | 空间复杂度      | 特点                       |
| -------------- | ----------------- | --------------- | -------------------------- |
| Trie + 枚举起点| `O(len(big)·L)`   | `O(total_len)`  | 最优，推荐                 |
| 逐个暴力匹配   | `O(m·len(big)·L)` | `O(1)`          | 简单，规模大超时           |

**推荐**：使用 Trie 多模式匹配，单次扫描 `big` 的每条起点即可收集全部结果。
