# [126. 单词接龙 II](https://leetcode.cn/problems/word-ladder-ii/)



## 一、题目描述

按字典 `wordList` 完成从单词 `beginWord` 到 `wordEnd` 的转换，要求找出所有从 `beginWord` 到 `wordEnd` 的 **最短转换序列**。转换需遵循如下规则：

- 每次转换只能改变一个字母。
- 转换过程中的中间单词必须是字典 `wordList` 中的单词。
- `beginWord` 不需要在 `wordList` 中。

返回所有可达到 `wordEnd` 的 **最短** 转换序列；若不存在这样的序列，返回一个空列表。

**示例 1：**

```
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
```

**示例 2：**

```
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
输出：[]
```

**提示：**

-   `1 <= beginWord.length <= 5`
-   `beginWord`、`endWord` 和 `wordList[i]` 由小写英文字母组成
-   `1 <= wordList.length <= 500`



## 二、解答方法

### 2.1 方法一：BFS 建图 + DFS 回溯

1. **思路**

先用 BFS 从 `beginWord` 和 `endWord` 两端扩展，构建「每个单词在最短路径中的前驱集合」（记录每个节点在最短路径上的父节点）。然后从 `endWord` 用 DFS 回溯所有最短路径，收集成结果。

关键：BFS 需要记录每个单词的「最短距离」，当某层扩展出更短距离时才加入父集，避免路径变长。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        Set<String> words = new HashSet<>(wordList);
        List<List<String>> res = new ArrayList<>();
        if (!words.contains(endWord)) return res;
        Map<String, Integer> dist = new HashMap<>();
        Map<String, List<String>> parent = new HashMap<>();
        Queue<String> q = new LinkedList<>();
        q.offer(beginWord);
        dist.put(beginWord, 0);
        parent.put(beginWord, new ArrayList<>());
        words.add(endWord);
        int step = 0;
        boolean found = false;
        while (!q.isEmpty() && !found) {
            step++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                String cur = q.poll();
                char[] arr = cur.toCharArray();
                for (int p = 0; p < arr.length; p++) {
                    char old = arr[p];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        arr[p] = c;
                        String nxt = new String(arr);
                        if (words.contains(nxt)) {
                            if (!dist.containsKey(nxt)) {
                                dist.put(nxt, step);
                                parent.put(nxt, new ArrayList<>());
                                parent.get(nxt).add(cur);
                                q.offer(nxt);
                                if (nxt.equals(endWord)) found = true;
                            } else if (dist.get(nxt) == step) {
                                parent.get(nxt).add(cur);
                            }
                        }
                    }
                    arr[p] = old;
                }
            }
        }
        if (!dist.containsKey(endWord)) return res;
        Deque<String> path = new ArrayDeque<>();
        path.offerFirst(endWord);
        dfs(endWord, beginWord, parent, path, res);
        return res;
    }
    private void dfs(String cur, String begin, Map<String, List<String>> parent, Deque<String> path, List<List<String>> res) {
        if (cur.equals(begin)) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (String p : parent.get(cur)) {
            path.offerFirst(p);
            dfs(p, begin, parent, path, res);
            path.pollFirst();
        }
    }
}
```

```python [Python]
class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        from collections import defaultdict, deque
        words = set(wordList)
        res = []
        if endWord not in words:
            return res
        words.add(beginWord)
        dist = {beginWord: 0}
        parent = defaultdict(list)
        q = deque([beginWord])
        step = 0
        found = False
        while q and not found:
            step += 1
            for _ in range(len(q)):
                cur = q.popleft()
                arr = list(cur)
                for i in range(len(arr)):
                    old = arr[i]
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        if c == old:
                            continue
                        arr[i] = c
                        nxt = ''.join(arr)
                        if nxt in words:
                            if nxt not in dist:
                                dist[nxt] = step
                                parent[nxt].append(cur)
                                q.append(nxt)
                                if nxt == endWord:
                                    found = True
                            elif dist[nxt] == step:
                                parent[nxt].append(cur)
                    arr[i] = old
        if endWord not in dist:
            return res
        path = [endWord]
        def dfs(cur):
            if cur == beginWord:
                res.append(list(path))
                return
            for p in parent[cur]:
                path.insert(0, p)
                dfs(p)
                path.pop(0)
        dfs(endWord)
        return res
```

```go [Go]
func findLadders(beginWord string, endWord string, wordList []string) [][]string {
    words := make(map[string]bool)
    for _, w := range wordList { words[w] = true }
    res := [][]string{}
    if !words[endWord] { return res }
    words[beginWord] = true
    dist := map[string]int{beginWord: 0}
    parent := map[string][]string{}
    q := []string{beginWord}
    step := 0
    found := false
    for len(q) > 0 && !found {
        step++
        sz := len(q)
        for i := 0; i < sz; i++ {
            cur := q[0]; q = q[1:]
            b := []byte(cur)
            for p := 0; p < len(b); p++ {
                old := b[p]
                for c := byte('a'); c <= 'z'; c++ {
                    if c == old { continue }
                    b[p] = c
                    nxt := string(b)
                    if words[nxt] {
                        if _, ok := dist[nxt]; !ok {
                            dist[nxt] = step
                            parent[nxt] = append(parent[nxt], cur)
                            q = append(q, nxt)
                            if nxt == endWord { found = true }
                        } else if dist[nxt] == step {
                            parent[nxt] = append(parent[nxt], cur)
                        }
                    }
                }
                b[p] = old
            }
        }
    }
    if _, ok := dist[endWord]; !ok { return res }
    var path []string
    path = append(path, endWord)
    var dfs func(string)
    dfs = func(cur string) {
        if cur == beginWord {
            tmp := make([]string, len(path))
            copy(tmp, path)
            res = append(res, tmp)
            return
        }
        for _, p := range parent[cur] {
            path = append([]string{p}, path...)
            dfs(p)
            path = path[1:]
        }
    }
    dfs(endWord)
    return res
}
```

```c [C]
/* 本题 C 实现较复杂，核心思路与上方一致：BFS 建父集 + DFS 回溯。
   下面给出简化版接口骨架，完整实现可参考上述 Python/Java。 */
int** findLadders(char* beginWord, char* endWord, char** wordList, int wordListSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        vector<vector<string>> res;
        if (!words.count(endWord)) return res;
        words.insert(beginWord);
        unordered_map<string, int> dist;
        unordered_map<string, vector<string>> parent;
        queue<string> q;
        q.push(beginWord);
        dist[beginWord] = 0;
        int step = 0;
        bool found = false;
        while (!q.empty() && !found) {
            step++;
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                string cur = q.front(); q.pop();
                string s = cur;
                for (int p = 0; p < s.size(); p++) {
                    char old = s[p];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        s[p] = c;
                        if (words.count(s)) {
                            if (!dist.count(s)) {
                                dist[s] = step;
                                parent[s].push_back(cur);
                                q.push(s);
                                if (s == endWord) found = true;
                            } else if (dist[s] == step) {
                                parent[s].push_back(cur);
                            }
                        }
                    }
                    s[p] = old;
                }
            }
        }
        if (!dist.count(endWord)) return res;
        vector<string> path = {endWord};
        function<void(string)> dfs = [&](string cur) {
            if (cur == beginWord) { res.push_back(path); return; }
            for (auto& p : parent[cur]) {
                path.insert(path.begin(), p);
                dfs(p);
                path.erase(path.begin());
            }
        };
        dfs(endWord);
        return res;
    }
};
```

```js [JavaScript]
var findLadders = function (beginWord, endWord, wordList) {
    const words = new Set(wordList);
    const res = [];
    if (!words.has(endWord)) return res;
    words.add(beginWord);
    const dist = { [beginWord]: 0 };
    const parent = {};
    let q = [beginWord];
    let step = 0, found = false;
    while (q.length && !found) {
        step++;
        const sz = q.length;
        for (let i = 0; i < sz; i++) {
            const cur = q.shift();
            const arr = cur.split('');
            for (let p = 0; p < arr.length; p++) {
                const old = arr[p];
                for (let code = 97; code <= 122; code++) {
                    const c = String.fromCharCode(code);
                    if (c === old) continue;
                    arr[p] = c;
                    const nxt = arr.join('');
                    if (words.has(nxt)) {
                        if (!(nxt in dist)) {
                            dist[nxt] = step;
                            parent[nxt] = [cur];
                            q.push(nxt);
                            if (nxt === endWord) found = true;
                        } else if (dist[nxt] === step) {
                            parent[nxt].push(cur);
                        }
                    }
                }
                arr[p] = old;
            }
        }
    }
    if (!(endWord in dist)) return res;
    const path = [endWord];
    const dfs = (cur) => {
        if (cur === beginWord) { res.push([...path]); return; }
        for (const p of parent[cur]) {
            path.unshift(p);
            dfs(p);
            path.shift();
        }
    };
    dfs(endWord);
    return res;
};
```

```ts [TypeScript]
function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    const words = new Set(wordList);
    const res: string[][] = [];
    if (!words.has(endWord)) return res;
    words.add(beginWord);
    const dist: Record<string, number> = { [beginWord]: 0 };
    const parent: Record<string, string[]> = {};
    let q: string[] = [beginWord];
    let step = 0, found = false;
    while (q.length && !found) {
        step++;
        const sz = q.length;
        for (let i = 0; i < sz; i++) {
            const cur = q.shift()!;
            const arr = cur.split('');
            for (let p = 0; p < arr.length; p++) {
                const old = arr[p];
                for (let code = 97; code <= 122; code++) {
                    const c = String.fromCharCode(code);
                    if (c === old) continue;
                    arr[p] = c;
                    const nxt = arr.join('');
                    if (words.has(nxt)) {
                        if (!(nxt in dist)) {
                            dist[nxt] = step;
                            parent[nxt] = [cur];
                            q.push(nxt);
                            if (nxt === endWord) found = true;
                        } else if (dist[nxt] === step) {
                            parent[nxt].push(cur);
                        }
                    }
                }
                arr[p] = old;
            }
        }
    }
    if (!(endWord in dist)) return res;
    const path: string[] = [endWord];
    const dfs = (cur: string): void => {
        if (cur === beginWord) { res.push([...path]); return; }
        for (const p of parent[cur]) {
            path.unshift(p);
            dfs(p);
            path.shift();
        }
    };
    dfs(endWord);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(N * L * 26)`，其中 `N` 为单词数，`L` 为单词长度。BFS 每层枚举每个位置替换 26 个字母。
- **空间复杂度**：`O(N * L)`，存储距离、父集和队列。

### 2.2 方法二：双向 BFS + 回溯

1. **思路**

从 `beginWord` 和 `endWord` 同时做 BFS，当两端相遇即得到最短距离。双向 BFS 能显著减少搜索空间，再结合父集回溯得到所有最短路径。实现较复杂，适合数据规模较大时优化。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        Set<String> words = new HashSet<>(wordList);
        List<List<String>> res = new ArrayList<>();
        if (!words.contains(endWord)) return res;
        Map<String, Integer> dist = new HashMap<>();
        Map<String, List<String>> parent = new HashMap<>();
        Set<String> q1 = new HashSet<>(), q2 = new HashSet<>();
        q1.add(beginWord); q2.add(endWord);
        dist.put(beginWord, 0); dist.put(endWord, 0);
        parent.put(beginWord, new ArrayList<>());
        boolean found = false;
        while (!q1.isEmpty() && !q2.isEmpty() && !found) {
            if (q1.size() > q2.size()) { Set<String> t = q1; q1 = q2; q2 = t; }
            Set<String> next = new HashSet<>();
            for (String cur : q1) {
                char[] arr = cur.toCharArray();
                for (int p = 0; p < arr.length; p++) {
                    char old = arr[p];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        arr[p] = c;
                        String nxt = new String(arr);
                        if (!words.contains(nxt)) continue;
                        if (q2.contains(nxt)) {
                            found = true;
                            link(parent, cur, nxt);
                        } else if (!dist.containsKey(nxt)) {
                            dist.put(nxt, dist.get(cur) + 1);
                            parent.putIfAbsent(nxt, new ArrayList<>());
                            link(parent, cur, nxt);
                            next.add(nxt);
                        }
                    }
                    arr[p] = old;
                }
            }
            q1 = next;
        }
        if (!parent.containsKey(endWord)) return res;
        Deque<String> path = new ArrayDeque<>();
        path.offerFirst(endWord);
        dfs(endWord, beginWord, parent, path, res);
        return res;
    }
    private void link(Map<String, List<String>> parent, String cur, String nxt) {
        parent.putIfAbsent(nxt, new ArrayList<>());
        if (!parent.get(nxt).contains(cur)) parent.get(nxt).add(cur);
    }
    private void dfs(String cur, String begin, Map<String, List<String>> parent, Deque<String> path, List<List<String>> res) {
        if (cur.equals(begin)) { res.add(new ArrayList<>(path)); return; }
        for (String p : parent.get(cur)) {
            path.offerFirst(p); dfs(p, begin, parent, path, res); path.pollFirst();
        }
    }
}
```

```python [Python]
class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        from collections import defaultdict, deque
        words = set(wordList)
        res = []
        if endWord not in words:
            return res
        words.add(beginWord)
        parent = defaultdict(list)
        q1, q2 = {beginWord}, {endWord}
        dist = {beginWord: 0, endWord: 0}
        found = False
        while q1 and q2 and not found:
            if len(q1) > len(q2):
                q1, q2 = q2, q1
            nxt_set = set()
            for cur in q1:
                arr = list(cur)
                for i in range(len(arr)):
                    old = arr[i]
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        if c == old:
                            continue
                        arr[i] = c
                        nxt = ''.join(arr)
                        if nxt in words:
                            if nxt in q2:
                                found = True
                                parent[nxt].append(cur)
                            elif nxt not in dist:
                                dist[nxt] = dist[cur] + 1
                                parent[nxt].append(cur)
                                nxt_set.add(nxt)
                    arr[i] = old
            q1 = nxt_set
        if endWord not in parent:
            return res
        path = [endWord]
        def dfs(cur):
            if cur == beginWord:
                res.append(list(path)); return
            for p in parent[cur]:
                path.insert(0, p); dfs(p); path.pop(0)
        dfs(endWord)
        return res
```

```go [Go]
func findLaddersBi(beginWord string, endWord string, wordList []string) [][]string {
    words := make(map[string]bool)
    for _, w := range wordList { words[w] = true }
    res := [][]string{}
    if !words[endWord] { return res }
    words[beginWord] = true
    parent := map[string][]string{}
    q1 := map[string]bool{beginWord: true}
    q2 := map[string]bool{endWord: true}
    dist := map[string]int{beginWord: 0, endWord: 0}
    found := false
    for len(q1) > 0 && len(q2) > 0 && !found {
        if len(q1) > len(q2) { q1, q2 = q2, q1 }
        nxtset := map[string]bool{}
        for cur := range q1 {
            b := []byte(cur)
            for p := 0; p < len(b); p++ {
                old := b[p]
                for c := byte('a'); c <= 'z'; c++ {
                    if c == old { continue }
                    b[p] = c
                    nxt := string(b)
                    if words[nxt] {
                        if q2[nxt] { found = true; parent[nxt] = append(parent[nxt], cur) }
                        else if _, ok := dist[nxt]; !ok {
                            dist[nxt] = dist[cur] + 1
                            parent[nxt] = append(parent[nxt], cur)
                            nxtset[nxt] = true
                        }
                    }
                }
                b[p] = old
            }
        }
        q1 = nxtset
    }
    if _, ok := parent[endWord]; !ok { return res }
    path := []string{endWord}
    var dfs func(string)
    dfs = func(cur string) {
        if cur == beginWord { tmp := make([]string, len(path)); copy(tmp, path); res = append(res, tmp); return }
        for _, p := range parent[cur] {
            path = append([]string{p}, path...)
            dfs(p); path = path[1:]
        }
    }
    dfs(endWord)
    return res
}
```

```c [C]
/* C 语言下双向 BFS 实现复杂，思路同上（两个队列交替扩展 + 父集回溯），此处略去完整实现。 */
int** findLaddersBi(char* beginWord, char* endWord, char** wordList, int wordListSize, int* returnSize, int** returnColumnSizes) {
    *returnSize = 0;
    return NULL;
}
```

```cpp [C++]
class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        vector<vector<string>> res;
        if (!words.count(endWord)) return res;
        words.insert(beginWord);
        unordered_map<string, vector<string>> parent;
        unordered_set<string> q1{beginWord}, q2{endWord};
        unordered_map<string, int> dist{{beginWord, 0}, {endWord, 0}};
        bool found = false;
        while (!q1.empty() && !q2.empty() && !found) {
            if (q1.size() > q2.size()) swap(q1, q2);
            unordered_set<string> nxtset;
            for (auto cur : q1) {
                string s = cur;
                for (int p = 0; p < s.size(); p++) {
                    char old = s[p];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        s[p] = c;
                        if (words.count(s)) {
                            if (q2.count(s)) { found = true; parent[s].push_back(cur); }
                            else if (!dist.count(s)) {
                                dist[s] = dist[cur] + 1;
                                parent[s].push_back(cur);
                                nxtset.insert(s);
                            }
                        }
                    }
                    s[p] = old;
                }
            }
            q1 = nxtset;
        }
        if (parent.find(endWord) == parent.end()) return res;
        vector<string> path = {endWord};
        function<void(string)> dfs = [&](string cur) {
            if (cur == beginWord) { res.push_back(path); return; }
            for (auto& p : parent[cur]) { path.insert(path.begin(), p); dfs(p); path.erase(path.begin()); }
        };
        dfs(endWord);
        return res;
    }
};
```

```js [JavaScript]
var findLaddersBi = function (beginWord, endWord, wordList) {
    const words = new Set(wordList);
    const res = [];
    if (!words.has(endWord)) return res;
    words.add(beginWord);
    const parent = {};
    let q1 = new Set([beginWord]), q2 = new Set([endWord]);
    const dist = { [beginWord]: 0, [endWord]: 0 };
    let found = false;
    while (q1.size && q2.size && !found) {
        if (q1.size > q2.size) { [q1, q2] = [q2, q1]; }
        const nxtSet = new Set();
        for (const cur of q1) {
            const arr = cur.split('');
            for (let p = 0; p < arr.length; p++) {
                const old = arr[p];
                for (let code = 97; code <= 122; code++) {
                    const c = String.fromCharCode(code);
                    if (c === old) continue;
                    arr[p] = c;
                    const nxt = arr.join('');
                    if (words.has(nxt)) {
                        if (q2.has(nxt)) { found = true; (parent[nxt] = parent[nxt] || []).push(cur); }
                        else if (!(nxt in dist)) {
                            dist[nxt] = dist[cur] + 1;
                            (parent[nxt] = parent[nxt] || []).push(cur);
                            nxtSet.add(nxt);
                        }
                    }
                }
                arr[p] = old;
            }
        }
        q1 = nxtSet;
    }
    if (!(endWord in parent)) return res;
    const path = [endWord];
    const dfs = (cur) => {
        if (cur === beginWord) { res.push([...path]); return; }
        for (const p of parent[cur]) { path.unshift(p); dfs(p); path.shift(); }
    };
    dfs(endWord);
    return res;
};
```

```ts [TypeScript]
function findLaddersBi(beginWord: string, endWord: string, wordList: string[]): string[][] {
    const words = new Set(wordList);
    const res: string[][] = [];
    if (!words.has(endWord)) return res;
    words.add(beginWord);
    const parent: Record<string, string[]> = {};
    let q1 = new Set([beginWord]), q2 = new Set([endWord]);
    const dist: Record<string, number> = { [beginWord]: 0, [endWord]: 0 };
    let found = false;
    while (q1.size && q2.size && !found) {
        if (q1.size > q2.size) { [q1, q2] = [q2, q1]; }
        const nxtSet = new Set<string>();
        for (const cur of q1) {
            const arr = cur.split('');
            for (let p = 0; p < arr.length; p++) {
                const old = arr[p];
                for (let code = 97; code <= 122; code++) {
                    const c = String.fromCharCode(code);
                    if (c === old) continue;
                    arr[p] = c;
                    const nxt = arr.join('');
                    if (words.has(nxt)) {
                        if (q2.has(nxt)) { found = true; (parent[nxt] = parent[nxt] || []).push(cur); }
                        else if (!(nxt in dist)) {
                            dist[nxt] = dist[cur] + 1;
                            (parent[nxt] = parent[nxt] || []).push(cur);
                            nxtSet.add(nxt);
                        }
                    }
                }
                arr[p] = old;
            }
        }
        q1 = nxtSet;
    }
    if (!(endWord in parent)) return res;
    const path: string[] = [endWord];
    const dfs = (cur: string): void => {
        if (cur === beginWord) { res.push([...path]); return; }
        for (const p of parent[cur]) { path.unshift(p); dfs(p); path.shift(); }
    };
    dfs(endWord);
    return res;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(N * L * 26)`（双向 BFS 实际常数更小）。
- **空间复杂度**：`O(N * L)`。



## 三、总结

两种方法对比：

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| BFS 建图 + DFS 回溯 | `O(N*L*26)` | `O(N*L)` | 实现清晰，推荐 |
| 双向 BFS + 回溯 | `O(N*L*26)` | `O(N*L)` | 搜索空间更小，实现复杂 |
