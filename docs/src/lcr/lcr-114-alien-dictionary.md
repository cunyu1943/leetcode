# [LCR 114. 火星词典](https://leetcode.cn/problems/Jf1JuT/)



## 一、题目描述

现有一种使用英语字母的外星文语言，这门语言的字母顺序与英语顺序不同。

给定一个字符串列表 `words` ，作为这门语言的词典，`words` 中的字符串已经 **按这门新语言字母顺序进行了排序** 。

请你根据该词典还原出此语言中字母的顺序，并以 **字符串** 形式返回。如果不存在满足字典序的排列，返回空字符串 `""` ；如果存在多种可能的合法排列，返回其中 **任意一种** 即可。

- 字符串 `s` 字典顺序小于 字符串 `t` 有两种情况：
  - 在第一个不同字母处，如果 `s` 中字母在这门外星语言的字母顺序中位于 `t` 中字母之前，那么 `s` 的字典顺序小于 `t` 。
  - 如果前面 `min(s.length, t.length)` 字母都相同，那么 `s.length < t.length` 时，`s` 的字典顺序也小于 `t` 。



**示例 1：**

```
输入：words = ["wrt","wrf","er","ett","rftt"]
输出："wertf"
```

**示例 2：**

```
输入：words = ["z","x"]
输出："zx"
```

**示例 3：**

```
输入：words = ["z","x","z"]
输出：""
解释：不存在合法字母顺序，因此返回 ""。
```

**提示：**

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` 仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：拓扑排序（字母间建图）

1. **思路**

相邻两个单词首次不同的字母给出「先后」关系：`words[i][j] 排在 words[i+1][j] 之前`。据此建 26 字母 DAG：

- 若 `words[i+1]` 是 `words[i]` 的前缀且更短，则字典序矛盾，直接返回空；
- 对每条边 `a -> b`（a 先于 b），统计入度；
- Kahn 拓扑排序，若排序结果长度 < 出现的字母数，说明有环，返回空。

时间 `O(Σ len + 26)`，空间 `O(26)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public String alienOrder(String[] words) {
        boolean[] exist = new boolean[26];
        for (String w : words)
            for (char c : w.toCharArray()) exist[c - 'a'] = true;
        List<Integer>[] g = new List[26];
        int[] indeg = new int[26];
        for (int i = 0; i < 26; i++) g[i] = new ArrayList<>();
        for (int i = 0; i + 1 < words.length; i++) {
            String a = words[i], b = words[i + 1];
            int len = Math.min(a.length(), b.length());
            int j = 0;
            while (j < len && a.charAt(j) == b.charAt(j)) j++;
            if (j == len && a.length() > b.length()) return ""; // 矛盾
            if (j < len) {
                int u = a.charAt(j) - 'a', v = b.charAt(j) - 'a';
                g[u].add(v);
                indeg[v]++;
            }
        }
        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < 26; i++) if (exist[i] && indeg[i] == 0) q.offer(i);
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            int u = q.poll();
            sb.append((char) ('a' + u));
            for (int v : g[u]) {
                if (--indeg[v] == 0) q.offer(v);
            }
        }
        int cnt = 0;
        for (int i = 0; i < 26; i++) if (exist[i]) cnt++;
        return sb.length() == cnt ? sb.toString() : "";
    }
}
```

```python [Python]
class Solution:
    def alienOrder(self, words: List[str]) -> str:
        exist = {c for w in words for c in w}
        g = {c: [] for c in exist}
        indeg = {c: 0 for c in exist}
        for a, b in zip(words, words[1:]):
            for x, y in zip(a, b):
                if x != y:
                    if y not in g[x]:
                        g[x].append(y)
                        indeg[y] += 1
                    break
            else:
                if len(a) > len(b):
                    return ''
        from collections import deque
        q = deque([c for c in exist if indeg[c] == 0])
        res = []
        while q:
            u = q.popleft()
            res.append(u)
            for v in g[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    q.append(v)
        return ''.join(res) if len(res) == len(exist) else ''
```

```cpp [C++]
class Solution {
public:
    string alienOrder(vector<string>& words) {
        bool exist[26] = {false};
        for (string& w : words) for (char c : w) exist[c - 'a'] = true;
        vector<int> g[26];
        int indeg[26] = {0};
        for (int i = 0; i + 1 < words.size(); i++) {
            string& a = words[i];
            string& b = words[i + 1];
            int len = min(a.size(), b.size());
            int j = 0;
            while (j < len && a[j] == b[j]) j++;
            if (j == len && a.size() > b.size()) return "";
            if (j < len) {
                int u = a[j] - 'a', v = b[j] - 'a';
                g[u].push_back(v);
                indeg[v]++;
            }
        }
        queue<int> q;
        for (int i = 0; i < 26; i++) if (exist[i] && indeg[i] == 0) q.push(i);
        string res;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            res += (char)('a' + u);
            for (int v : g[u]) if (--indeg[v] == 0) q.push(v);
        }
        int cnt = 0;
        for (int i = 0; i < 26; i++) if (exist[i]) cnt++;
        return res.size() == cnt ? res : "";
    }
};
```

```go [Go]
func alienOrder(words []string) string {
    exist := [26]bool{}
    for _, w := range words {
        for i := 0; i < len(w); i++ {
            exist[w[i]-'a'] = true
        }
    }
    g := make([][]int, 26)
    indeg := [26]int{}
    for i := 0; i+1 < len(words); i++ {
        a, b := words[i], words[i+1]
        l := len(a)
        if len(b) < l {
            l = len(b)
        }
        j := 0
        for j < l && a[j] == b[j] {
            j++
        }
        if j == l && len(a) > len(b) {
            return ""
        }
        if j < l {
            u, v := int(a[j]-'a'), int(b[j]-'a')
            g[u] = append(g[u], v)
            indeg[v]++
        }
    }
    q := []int{}
    cnt := 0
    for i := 0; i < 26; i++ {
        if exist[i] {
            cnt++
            if indeg[i] == 0 {
                q = append(q, i)
            }
        }
    }
    res := []byte{}
    for len(q) > 0 {
        u := q[0]
        q = q[1:]
        res = append(res, byte('a'+u))
        for _, v := range g[u] {
            indeg[v]--
            if indeg[v] == 0 {
                q = append(q, v)
            }
        }
    }
    if len(res) != cnt {
        return ""
    }
    return string(res)
}
```

```js [JavaScript]
/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
    const exist = new Set(words.join(''));
    const g = {};
    const indeg = {};
    for (const c of exist) { g[c] = []; indeg[c] = 0; }
    for (let i = 0; i + 1 < words.length; i++) {
        const a = words[i], b = words[i + 1];
        const len = Math.min(a.length, b.length);
        let j = 0;
        while (j < len && a[j] === b[j]) j++;
        if (j === len && a.length > b.length) return '';
        if (j < len) {
            const u = a[j], v = b[j];
            if (!g[u].includes(v)) {
                g[u].push(v);
                indeg[v]++;
            }
        }
    }
    const q = [];
    for (const c of exist) if (indeg[c] === 0) q.push(c);
    let res = '';
    while (q.length) {
        const u = q.shift();
        res += u;
        for (const v of g[u]) {
            if (--indeg[v] === 0) q.push(v);
        }
    }
    return res.length === exist.size ? res : '';
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

char* alienOrder(char** words, int wordsSize) {
    int exist[26] = {0};
    for (int i = 0; i < wordsSize; i++)
        for (int k = 0; words[i][k]; k++) exist[words[i][k] - 'a'] = 1;
    int g[26][26] = {0};
    int gSize[26] = {0};
    int indeg[26] = {0};
    for (int i = 0; i + 1 < wordsSize; i++) {
        char* a = words[i];
        char* b = words[i + 1];
        int la = (int)strlen(a), lb = (int)strlen(b);
        int len = la < lb ? la : lb;
        int j = 0;
        while (j < len && a[j] == b[j]) j++;
        if (j == len && la > lb) return strdup("");
        if (j < len) {
            int u = a[j] - 'a', v = b[j] - 'a';
            int dup = 0;
            for (int k = 0; k < gSize[u]; k++) if (g[u][k] == v) dup = 1;
            if (!dup) { g[u][gSize[u]++] = v; indeg[v]++; }
        }
    }
    int q[26], head = 0, tail = 0, cnt = 0;
    for (int i = 0; i < 26; i++) {
        if (exist[i]) {
            cnt++;
            if (indeg[i] == 0) q[tail++] = i;
        }
    }
    char* res = (char*)malloc(27 * sizeof(char));
    int idx = 0;
    while (head < tail) {
        int u = q[head++];
        res[idx++] = 'a' + u;
        for (int k = 0; k < gSize[u]; k++) {
            int v = g[u][k];
            if (--indeg[v] == 0) q[tail++] = v;
        }
    }
    res[idx] = '\0';
    if (idx != cnt) return strdup("");
    return res;
}
```

```ts [TypeScript]
function alienOrder(words: string[]): string {
    const exist = new Set(words.join(''));
    const g: Record<string, string[]> = {};
    const indeg: Record<string, number> = {};
    for (const c of exist) { g[c] = []; indeg[c] = 0; }
    for (let i = 0; i + 1 < words.length; i++) {
        const a = words[i], b = words[i + 1];
        const len = Math.min(a.length, b.length);
        let j = 0;
        while (j < len && a[j] === b[j]) j++;
        if (j === len && a.length > b.length) return '';
        if (j < len) {
            const u = a[j], v = b[j];
            if (!g[u].includes(v)) {
                g[u].push(v);
                indeg[v]++;
            }
        }
    }
    const q: string[] = [];
    for (const c of exist) if (indeg[c] === 0) q.push(c);
    let res = '';
    while (q.length) {
        const u = q.shift()!;
        res += u;
        for (const v of g[u]) {
            if (--indeg[v] === 0) q.push(v);
        }
    }
    return res.length === exist.size ? res : '';
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(Σ len + 26)`。
- **空间复杂度**：`O(26)`，字母节点有限。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 拓扑排序 | `O(Σlen+26)` | `O(26)` | 标准解法 |

相邻单词的第一个不同字母蕴含字母先后关系，据此建图后拓扑排序即得字母顺序。前缀矛盾（短词在前却应更小）或拓扑结果缺失都说明无合法排列，返回空串。

