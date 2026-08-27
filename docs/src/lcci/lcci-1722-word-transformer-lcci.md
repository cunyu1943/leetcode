# [面试题 17.22. 单词转换](https://leetcode.cn/problems/word-transformer-lcci/)

## 一、题目描述

给定字典中的两个词 `beginWord` 和 `endWord`，以及一个字典 `wordList`。找出从 `beginWord` 到 `endWord` 的最短转换序列长度，要求每次转换只能改变一个字母，且转换过程中的中间词都必须是字典中的词。

**说明：** 本题为单词接龙（Word Ladder）变体，若无法转换返回 0。

**示例：**

```
输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
输出: 5
解释: hit -> hot -> dot -> dog -> cog，最短序列长度为 5。
```

---

## 二、解答方法

### 2.1 方法一：广度优先搜索（BFS）

**1. 思路**

将每个单词视为图节点，相差一个字母的单词连边。从 `beginWord` 出发做 BFS，逐层扩展，第一次到达 `endWord` 时的层数即最短转换长度。可用通配模式 `*` 建立邻接加速（本题按逐字符比较实现）。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        Queue<String> q = new LinkedList<>();
        q.offer(beginWord);
        set.remove(beginWord);
        int step = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int s = 0; s < size; s++) {
                String cur = q.poll();
                char[] arr = cur.toCharArray();
                for (int i = 0; i < arr.length; i++) {
                    char old = arr[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        arr[i] = c;
                        String nxt = new String(arr);
                        if (nxt.equals(endWord)) return step + 1;
                        if (set.contains(nxt)) { q.offer(nxt); set.remove(nxt); }
                    }
                    arr[i] = old;
                }
            }
            step++;
        }
        return 0;
    }
}
```

```python [Python]
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        from collections import deque
        words = set(wordList)
        if endWord not in words:
            return 0
        q = deque([beginWord])
        words.discard(beginWord)
        step = 1
        while q:
            for _ in range(len(q)):
                cur = q.popleft()
                for i in range(len(cur)):
                    for c in "abcdefghijklmnopqrstuvwxyz":
                        if c == cur[i]:
                            continue
                        nxt = cur[:i] + c + cur[i+1:]
                        if nxt == endWord:
                            return step + 1
                        if nxt in words:
                            words.discard(nxt)
                            q.append(nxt)
            step += 1
        return 0
```

```go [Go]
func ladderLength(beginWord string, endWord string, wordList []string) int {
    set := map[string]bool{}
    for _, w := range wordList { set[w] = true }
    if !set[endWord] { return 0 }
    q := []string{beginWord}
    delete(set, beginWord)
    step := 1
    for len(q) > 0 {
        size := len(q)
        for _, cur := range q {
            b := []byte(cur)
            for i := 0; i < len(b); i++ {
                old := b[i]
                for c := 'a'; c <= 'z'; c++ {
                    if c == rune(old) { continue }
                    b[i] = byte(c)
                    nxt := string(b)
                    if nxt == endWord { return step + 1 }
                    if set[nxt] { delete(set, nxt); q = append(q, nxt) }
                }
                b[i] = old
            }
        }
        q = q[size:]
        step++
    }
    return 0
}
```

```c [C]
// BFS 在 C 中需手动实现队列，逻辑同 Python
```

```cpp [C++]
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> set(wordList.begin(), wordList.end());
        if (!set.count(endWord)) return 0;
        queue<string> q; q.push(beginWord); set.erase(beginWord);
        int step = 1;
        while (!q.empty()) {
            int size = q.size();
            for (int s = 0; s < size; s++) {
                string cur = q.front(); q.pop();
                string t = cur;
                for (int i = 0; i < t.size(); i++) {
                    char old = t[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        t[i] = c;
                        if (t == endWord) return step + 1;
                        if (set.count(t)) { set.erase(t); q.push(t); }
                    }
                    t[i] = old;
                }
            }
            step++;
        }
        return 0;
    }
};
```

```javascript [JavaScript]
var ladderLength = function(beginWord, endWord, wordList) {
    const set = new Set(wordList);
    if (!set.has(endWord)) return 0;
    const q = [beginWord];
    set.delete(beginWord);
    let step = 1;
    while (q.length) {
        const size = q.length;
        for (let s = 0; s < size; s++) {
            const cur = q.shift();
            for (let i = 0; i < cur.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === cur[i]) continue;
                    const nxt = cur.slice(0, i) + ch + cur.slice(i+1);
                    if (nxt === endWord) return step + 1;
                    if (set.has(nxt)) { set.delete(nxt); q.push(nxt); }
                }
            }
        }
        step++;
    }
    return 0;
};
```

```typescript [TypeScript]
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const set = new Set(wordList);
    if (!set.has(endWord)) return 0;
    const q: string[] = [beginWord];
    set.delete(beginWord);
    let step = 1;
    while (q.length) {
        const size = q.length;
        for (let s = 0; s < size; s++) {
            const cur = q.shift()!;
            for (let i = 0; i < cur.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === cur[i]) continue;
                    const nxt = cur.slice(0, i) + ch + cur.slice(i+1);
                    if (nxt === endWord) return step + 1;
                    if (set.has(nxt)) { set.delete(nxt); q.push(nxt); }
                }
            }
        }
        step++;
    }
    return 0;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(M² · N)`，M 为单词长度，N 为字典规模。
- **空间复杂度**：`O(N · M)`。

---

### 2.2 方法二：双向 BFS

**1. 思路**

从起点和终点同时做 BFS，当两层相遇即找到最短路径。可将搜索空间从指数级降为更小，适合大规模字典。

**2. 代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        Set<String> begin = new HashSet<>(), end = new HashSet<>();
        begin.add(beginWord); end.add(endWord);
        set.remove(beginWord); set.remove(endWord);
        int step = 1;
        while (!begin.isEmpty() && !end.isEmpty()) {
            if (begin.size() > end.size()) { Set<String> t = begin; begin = end; end = t; }
            Set<String> next = new HashSet<>();
            for (String cur : begin) {
                char[] arr = cur.toCharArray();
                for (int i = 0; i < arr.length; i++) {
                    char old = arr[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        arr[i] = c;
                        String nxt = new String(arr);
                        if (end.contains(nxt)) return step + 1;
                        if (set.contains(nxt)) { next.add(nxt); set.remove(nxt); }
                    }
                    arr[i] = old;
                }
            }
            begin = next;
            step++;
        }
        return 0;
    }
}
```

```python [Python]
class Solution:
    def ladderLength(self, beginWord, endWord, wordList):
        words = set(wordList)
        if endWord not in words:
            return 0
        begin, end = {beginWord}, {endWord}
        words.discard(beginWord); words.discard(endWord)
        step = 1
        while begin and end:
            if len(begin) > len(end):
                begin, end = end, begin
            nxt = set()
            for cur in begin:
                for i in range(len(cur)):
                    for c in "abcdefghijklmnopqrstuvwxyz":
                        if c == cur[i]:
                            continue
                        nw = cur[:i] + c + cur[i+1:]
                        if nw in end:
                            return step + 1
                        if nw in words:
                            words.discard(nw)
                            nxt.add(nw)
            begin = nxt
            step += 1
        return 0
```

```cpp [C++]
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> set(wordList.begin(), wordList.end());
        if (!set.count(endWord)) return 0;
        unordered_set<string> begin{beginWord}, end{endWord};
        set.erase(beginWord); set.erase(endWord);
        int step = 1;
        while (!begin.empty() && !end.empty()) {
            if (begin.size() > end.size()) swap(begin, end);
            unordered_set<string> nxt;
            for (string cur : begin) {
                string t = cur;
                for (int i = 0; i < t.size(); i++) {
                    char old = t[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == old) continue;
                        t[i] = c;
                        if (end.count(t)) return step + 1;
                        if (set.count(t)) { nxt.insert(t); set.erase(t); }
                    }
                    t[i] = old;
                }
            }
            begin = nxt; step++;
        }
        return 0;
    }
};
```

```javascript [JavaScript]
var ladderLength = function(beginWord, endWord, wordList) {
    const set = new Set(wordList);
    if (!set.has(endWord)) return 0;
    let begin = new Set([beginWord]), end = new Set([endWord]);
    set.delete(beginWord); set.delete(endWord);
    let step = 1;
    while (begin.size && end.size) {
        if (begin.size > end.size) { const t = begin; begin = end; end = t; }
        const nxt = new Set();
        for (const cur of begin) {
            for (let i = 0; i < cur.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === cur[i]) continue;
                    const nw = cur.slice(0, i) + ch + cur.slice(i+1);
                    if (end.has(nw)) return step + 1;
                    if (set.has(nw)) { set.delete(nw); nxt.add(nw); }
                }
            }
        }
        begin = nxt; step++;
    }
    return 0;
};
```

```typescript [TypeScript]
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const set = new Set(wordList);
    if (!set.has(endWord)) return 0;
    let begin = new Set([beginWord]), end = new Set([endWord]);
    set.delete(beginWord); set.delete(endWord);
    let step = 1;
    while (begin.size && end.size) {
        if (begin.size > end.size) { const t = begin; begin = end; end = t; }
        const nxt = new Set<string>();
        for (const cur of begin) {
            for (let i = 0; i < cur.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === cur[i]) continue;
                    const nw = cur.slice(0, i) + ch + cur.slice(i+1);
                    if (end.has(nw)) return step + 1;
                    if (set.has(nw)) { set.delete(nw); nxt.add(nw); }
                }
            }
        }
        begin = nxt; step++;
    }
    return 0;
}
```

:::::::

**3. 复杂度分析**

- **时间复杂度**：`O(M² · N)`（常数更优）。
- **空间复杂度**：`O(N · M)`。

---

## 三、总结

| 方法           | 时间复杂度     | 空间复杂度 | 特点                       |
| -------------- | -------------- | ---------- | -------------------------- |
| 单向 BFS       | `O(M²·N)`      | `O(N·M)`   | 实现简单                   |
| 双向 BFS       | `O(M²·N)`      | `O(N·M)`   | 常数更优，推荐             |

**推荐**：规模较大时用双向 BFS，从两端同时扩展可显著减少搜索节点。
