# [269. 火星词典](https://leetcode.cn/problems/alien-dictionary/) [🔒 会员题]



## 一、题目描述

现有一种使用火星语言的字典，里面的单词使用的字母和地球上的一样，但字母的 **顺序** 不同。

给你一个字符串列表 `words` ，作为这门语言的词典，`words` 中的字符串已经 **按这门新语言的字母顺序进行了排序** 。

请你根据该词典 **还原出此语言中已知的字母顺序** ，并 **按字母递增顺序** 排列。若不存在合法字母顺序，返回 `""` 。若存在多种可能的合法字母顺序，返回 **其中任意一种** 顺序即可。

注意，可能存在 **前缀关系** ：如果 `word1` 是 `word2` 的前缀，那么 `word1` 一定排在 `word2` 之前。

此外，所有字母都是小写英文字母，并且可能不按地球上的顺序排列。

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

-   `1 <= words.length <= 100`
-   `1 <= words[i].length <= 100`
-   `words[i]` 仅由小写英文字母组成



## 二、解答方法

### 2.1 方法一：拓扑排序（BFS / Kahn）

1. **思路**

这是一道 **由偏序关系推导全序** 的问题，本质是 **拓扑排序**：

1. **建图**：对 **相邻的两个单词** `w1`、`w2`，找到它们 **第一个不相同的字符** `c1`、`c2`，说明 `c1 < c2`（在本语言中），添加有向边 `c1 → c2`，并把 `c2` 的入度 +1。
2. **特判非法前缀**：若 `w1` 是 `w2` 的前缀且 `w1 != w2` 更长关系反了（即 `w2` 是 `w1` 的前缀但 `w2` 更长 —— 实际是：比较完 `min(len)` 个字符都相同，且 `len(w1) > len(w2)`），则排序矛盾，返回 `""`。
3. **拓扑排序**：把所有入度为 0 的字符入队，依次出队并加入结果，同时把它指向的字符入度 -1（若减到 0 则入队）。
4. **判环**：若结果长度 ≠ 出现的字符总数，说明有环，返回 `""`。

2. **代码实现**

:::::: code-group

```java [Java]
class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> graph = new HashMap<>();
        Map<Character, Integer> indegree = new HashMap<>();
        // 初始化所有出现过的字符
        for (String word : words) {
            for (char c : word.toCharArray()) {
                graph.putIfAbsent(c, new HashSet<>());
                indegree.putIfAbsent(c, 0);
            }
        }
        // 建图：比较相邻单词
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int len = Math.min(w1.length(), w2.length());
            boolean found = false;
            for (int j = 0; j < len; j++) {
                char c1 = w1.charAt(j), c2 = w2.charAt(j);
                if (c1 != c2) {
                    if (!graph.get(c1).contains(c2)) {   // 避免重复加边
                        graph.get(c1).add(c2);
                        indegree.put(c2, indegree.get(c2) + 1);
                    }
                    found = true;
                    break;                                // 只取第一个不同字符
                }
            }
            // 前缀矛盾：前面单词更长却完全相同
            if (!found && w1.length() > w2.length()) return "";
        }
        // 拓扑排序
        Queue<Character> queue = new ArrayDeque<>();
        for (char c : indegree.keySet()) {
            if (indegree.get(c) == 0) queue.offer(c);
        }
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            char c = queue.poll();
            sb.append(c);
            for (char next : graph.get(c)) {
                indegree.put(next, indegree.get(next) - 1);
                if (indegree.get(next) == 0) queue.offer(next);
            }
        }
        return sb.length() == indegree.size() ? sb.toString() : "";
    }
}
```

```python [Python]
class Solution:
    def alienOrder(self, words: List[str]) -> str:
        from collections import defaultdict, deque
        # 初始化所有出现过的字符
        graph = {c: set() for word in words for c in word}
        indegree = {c: 0 for word in words for c in word}

        # 建图
        for w1, w2 in zip(words, words[1:]):
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    if c2 not in graph[c1]:      # 去重，避免重复计入度
                        graph[c1].add(c2)
                        indegree[c2] += 1
                    break
            else:
                # 前缀关系：w2 是 w1 的前缀但 w1 更长 → 矛盾
                if len(w1) > len(w2):
                    return ""

        # 拓扑排序
        queue = deque(c for c in indegree if indegree[c] == 0)
        order = []
        while queue:
            c = queue.popleft()
            order.append(c)
            for nxt in graph[c]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)

        return ''.join(order) if len(order) == len(indegree) else ""
```

```go [Go]
func alienOrder(words []string) string {
    graph := make(map[byte]map[byte]bool)
    indegree := make(map[byte]int)
    for _, word := range words {
        for i := 0; i < len(word); i++ {
            if graph[word[i]] == nil {
                graph[word[i]] = make(map[byte]bool)
            }
            indegree[word[i]] = indegree[word[i]] // 确保 key 存在
        }
    }
    for i := 0; i < len(words)-1; i++ {
        w1, w2 := words[i], words[i+1]
        n := len(w1)
        if len(w2) < n {
            n = len(w2)
        }
        found := false
        for j := 0; j < n; j++ {
            c1, c2 := w1[j], w2[j]
            if c1 != c2 {
                if !graph[c1][c2] {
                    graph[c1][c2] = true
                    indegree[c2]++
                }
                found = true
                break
            }
        }
        if !found && len(w1) > len(w2) {
            return ""
        }
    }
    queue := []byte{}
    for c := range indegree {
        if indegree[c] == 0 {
            queue = append(queue, c)
        }
    }
    var order []byte
    for len(queue) > 0 {
        c := queue[0]
        queue = queue[1:]
        order = append(order, c)
        for nxt := range graph[c] {
            indegree[nxt]--
            if indegree[nxt] == 0 {
                queue = append(queue, nxt)
            }
        }
    }
    if len(order) != len(indegree) {
        return ""
    }
    return string(order)
}
```

```cpp [C++]
class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> graph;
        unordered_map<char, int> indegree;
        for (auto& word : words) {
            for (char c : word) {
                if (!graph.count(c)) graph[c] = {};
                indegree[c] += 0;
            }
        }
        for (int i = 0; i + 1 < words.size(); i++) {
            string& w1 = words[i], &w2 = words[i + 1];
            int len = min(w1.size(), w2.size());
            bool found = false;
            for (int j = 0; j < len; j++) {
                if (w1[j] != w2[j]) {
                    if (!graph[w1[j]].count(w2[j])) {
                        graph[w1[j]].insert(w2[j]);
                        indegree[w2[j]]++;
                    }
                    found = true;
                    break;
                }
            }
            if (!found && w1.size() > w2.size()) return "";
        }
        queue<char> q;
        for (auto& kv : indegree) {
            if (kv.second == 0) q.push(kv.first);
        }
        string order;
        while (!q.empty()) {
            char c = q.front(); q.pop();
            order += c;
            for (char nxt : graph[c]) {
                if (--indegree[nxt] == 0) q.push(nxt);
            }
        }
        return order.size() == indegree.size() ? order : "";
    }
};
```

```js [JavaScript]
/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
    const graph = new Map();
    const indegree = new Map();
    for (const word of words) {
        for (const c of word) {
            if (!graph.has(c)) graph.set(c, new Set());
            if (!indegree.has(c)) indegree.set(c, 0);
        }
    }
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i], w2 = words[i + 1];
        const len = Math.min(w1.length, w2.length);
        let found = false;
        for (let j = 0; j < len; j++) {
            if (w1[j] !== w2[j]) {
                const set = graph.get(w1[j]);
                if (!set.has(w2[j])) {
                    set.add(w2[j]);
                    indegree.set(w2[j], indegree.get(w2[j]) + 1);
                }
                found = true;
                break;
            }
        }
        if (!found && w1.length > w2.length) return '';
    }
    const queue = [];
    for (const [c, d] of indegree) if (d === 0) queue.push(c);
    let order = '';
    while (queue.length) {
        const c = queue.shift();
        order += c;
        for (const nxt of graph.get(c)) {
            indegree.set(nxt, indegree.get(nxt) - 1);
            if (indegree.get(nxt) === 0) queue.push(nxt);
        }
    }
    return order.length === indegree.size ? order : '';
};
```

```ts [TypeScript]
/**
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words: string[]): string {
    const graph = new Map<string, Set<string>>();
    const indegree = new Map<string, number>();
    for (const word of words) {
        for (const c of word) {
            if (!graph.has(c)) graph.set(c, new Set());
            if (!indegree.has(c)) indegree.set(c, 0);
        }
    }
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i], w2 = words[i + 1];
        const len = Math.min(w1.length, w2.length);
        let found = false;
        for (let j = 0; j < len; j++) {
            if (w1[j] !== w2[j]) {
                const set = graph.get(w1[j])!;
                if (!set.has(w2[j])) {
                    set.add(w2[j]);
                    indegree.set(w2[j], indegree.get(w2[j])! + 1);
                }
                found = true;
                break;
            }
        }
        if (!found && w1.length > w2.length) return '';
    }
    const queue: string[] = [];
    for (const [c, d] of indegree) if (d === 0) queue.push(c);
    let order = '';
    while (queue.length) {
        const c = queue.shift()!;
        order += c;
        for (const nxt of graph.get(c)!) {
            indegree.set(nxt, indegree.get(nxt)! - 1);
            if (indegree.get(nxt) === 0) queue.push(nxt);
        }
    }
    return order.length === indegree.size ? order : '';
}
```

::::::

3. **复杂度分析**

- **时间复杂度**：`O(C)`，C 为所有单词的字符总数（建图 `O(C)` + 拓扑排序 `O(V + E)`，字符集最多 26）。
- **空间复杂度**：`O(V + E)`，最多 `O(26 + 26²)` = `O(1)`。

## 三、总结

火星词典是 **拓扑排序** 的经典应用题，三步走：

| 步骤 | 要点 |
| ---- | ---- |
| 1. 建图 | 比较 **相邻单词** 的 **第一个不同字符** `c1 != c2` → 加边 `c1 → c2` |
| 2. 特判 | 若两词前缀相同且前者更长 → 无解 |
| 3. 拓扑排序 | 入度为 0 入队；结果长度 ≠ 字符数 → 有环，无解 |

两个易错点：
1. **只比较相邻单词**，且 **只取第一个不同的字符**（后面的字符无法提供顺序信息）；
2. **加边要去重**（用 `Set` 或判重），否则同一对边被多次计入，入度统计错误。

注意 Python 的 `for...else` 用法：`for` 正常结束（未被 `break`）时执行 `else` 分支，正好用来处理「前缀关系」的情况。
