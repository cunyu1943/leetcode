# [127. 单词接龙](https://leetcode.cn/problems/word-ladder/)



## 一、题目描述

字典 `wordList` 中从单词 `beginWord` 和 `endWord` 的 **转换序列** 是一个按下述规格形成的序列 `beginWord -> s1 -> s2 -> ... -> sk`：

- 每一对相邻的单词只差一个字母。
- 对于 `1 <= i <= k` 时，每个 `si` 都在 `wordList` 中。注意，`beginWord` 不需要在 `wordList` 中。
- `sk == endWord`。

给你两个单词 `beginWord` 和 `endWord` 和一个字典 `wordList`，返回 **从 `beginWord` 到 `endWord` 的 最短转换序列 中的 单词数目**。如果不存在这样的转换序列，返回 `0`。



**示例 1：**

```
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：5
解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog"，返回它的长度 5。
```

**示例 2：**

```
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
输出：0
解释：endWord "cog" 不在字典中，所以无法进行转换。
```

**提示：**

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord`、`endWord` 和 `wordList[i]` 由小写英文字母组成
- `beginWord != endWord`
- `wordList` 中的所有字符串 **互不相同**



## 二、解答方法

### 2.1 方法一：广度优先搜索（BFS）

1. **思路**

把每个单词看作图中的一个节点，如果两个单词之间只相差一个字母，则在它们之间连一条边。问题就转化成了：从 `beginWord` 这个节点出发，找到到达 `endWord` 节点的最短路径（边数 + 1 即为单词数目）。

由于要求「最短」转换序列，自然使用 **广度优先搜索（BFS）**：

- 将所有 `wordList` 放入哈希集合，便于 `O(1)` 判断一个单词是否在字典中；
- 使用队列进行 BFS，每层代表一次转换（距离 + 1）；
- 对于当前单词的每一个位置，尝试把该位置的字母替换成 `a~z` 中任意一个，生成新单词；
- 若新单词在字典中，说明可以一步转换，将其加入队列并从字典中删除（避免重复访问）；
- 若新单词等于 `endWord`，直接返回当前层数 + 1。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;

        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);
        Set<String> visited = new HashSet<>();
        visited.add(beginWord);

        int level = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String word = queue.poll();
                char[] chs = word.toCharArray();
                for (int j = 0; j < chs.length; j++) {
                    char original = chs[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        chs[j] = c;
                        String next = new String(chs);
                        if (wordSet.contains(next)) {
                            if (next.equals(endWord)) return level + 1;
                            if (!visited.contains(next)) {
                                visited.add(next);
                                queue.offer(next);
                            }
                        }
                    }
                    chs[j] = original;
                }
            }
            level++;
        }
        return 0;
    }
}
```

```python [Python]
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        from collections import deque
        word_set = set(wordList)
        if endWord not in word_set:
            return 0

        queue = deque([beginWord])
        visited = {beginWord}
        level = 1

        while queue:
            for _ in range(len(queue)):
                word = queue.popleft()
                for j in range(len(word)):
                    for c in "abcdefghijklmnopqrstuvwxyz":
                        if c == word[j]:
                            continue
                        nxt = word[:j] + c + word[j + 1:]
                        if nxt in word_set:
                            if nxt == endWord:
                                return level + 1
                            if nxt not in visited:
                                visited.add(nxt)
                                queue.append(nxt)
            level += 1
        return 0
```

```cpp [C++]
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        if (!wordSet.count(endWord)) return 0;

        queue<string> q;
        q.push(beginWord);
        unordered_set<string> visited{beginWord};

        int level = 1;
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                string word = q.front(); q.pop();
                for (int j = 0; j < word.size(); j++) {
                    char origin = word[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == origin) continue;
                        word[j] = c;
                        if (wordSet.count(word)) {
                            if (word == endWord) return level + 1;
                            if (!visited.count(word)) {
                                visited.insert(word);
                                q.push(word);
                            }
                        }
                    }
                    word[j] = origin;
                }
            }
            level++;
        }
        return 0;
    }
};
```

```go [Go]
func ladderLength(beginWord string, endWord string, wordList []string) int {
    wordSet := make(map[string]bool)
    for _, w := range wordList {
        wordSet[w] = true
    }
    if !wordSet[endWord] {
        return 0
    }

    queue := []string{beginWord}
    visited := map[string]bool{beginWord: true}
    level := 1

    for len(queue) > 0 {
        sz := len(queue)
        for i := 0; i < sz; i++ {
            word := []byte(queue[0])
            queue = queue[1:]
            for j := 0; j < len(word); j++ {
                origin := word[j]
                for c := byte('a'); c <= 'z'; c++ {
                    if c == origin {
                        continue
                    }
                    word[j] = c
                    nxt := string(word)
                    if wordSet[nxt] {
                        if nxt == endWord {
                            return level + 1
                        }
                        if !visited[nxt] {
                            visited[nxt] = true
                            queue = append(queue, nxt)
                        }
                    }
                }
                word[j] = origin
            }
        }
        level++
    }
    return 0
}
```

```js [JavaScript]
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue = [beginWord];
    const visited = new Set([beginWord]);
    let level = 1;

    while (queue.length) {
        const sz = queue.length;
        for (let i = 0; i < sz; i++) {
            const word = queue.shift();
            for (let j = 0; j < word.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === word[j]) continue;
                    const nxt = word.slice(0, j) + ch + word.slice(j + 1);
                    if (wordSet.has(nxt)) {
                        if (nxt === endWord) return level + 1;
                        if (!visited.has(nxt)) {
                            visited.add(nxt);
                            queue.push(nxt);
                        }
                    }
                }
            }
        }
        level++;
    }
    return 0;
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {
    int endIdx = -1;
    for (int i = 0; i < wordListSize; i++)
        if (strcmp(wordList[i], endWord) == 0) { endIdx = i; break; }
    if (endIdx == -1) return 0;

    char** queue = (char**)malloc((wordListSize + 1) * sizeof(char*));
    int qh = 0, qt = 0;
    queue[qt++] = beginWord;
    bool* visited = (bool*)calloc(wordListSize, sizeof(bool));

    int level = 1;
    while (qh < qt) {
        int sz = qt - qh;
        for (int i = 0; i < sz; i++) {
            char* word = queue[qh++];
            int len = strlen(word);
            char* wb = (char*)malloc((len + 1) * sizeof(char));
            strcpy(wb, word);
            for (int j = 0; j < len; j++) {
                char origin = wb[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == origin) continue;
                    wb[j] = c;
                    for (int k = 0; k < wordListSize; k++) {
                        if (strcmp(wordList[k], wb) == 0) {
                            if (k == endIdx) { free(wb); free(queue); free(visited); return level + 1; }
                            if (!visited[k]) {
                                visited[k] = true;
                                queue[qt++] = wordList[k];
                            }
                        }
                    }
                }
                wb[j] = origin;
            }
            free(wb);
        }
        level++;
    }
    free(queue); free(visited);
    return 0;
}
```

```ts [TypeScript]
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue: string[] = [beginWord];
    const visited = new Set<string>([beginWord]);
    let level = 1;

    while (queue.length) {
        const sz = queue.length;
        for (let i = 0; i < sz; i++) {
            const word = queue.shift()!;
            for (let j = 0; j < word.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === word[j]) continue;
                    const nxt = word.slice(0, j) + ch + word.slice(j + 1);
                    if (wordSet.has(nxt)) {
                        if (nxt === endWord) return level + 1;
                        if (!visited.has(nxt)) {
                            visited.add(nxt);
                            queue.push(nxt);
                        }
                    }
                }
            }
        }
        level++;
    }
    return 0;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(M² × N)`，其中 `N` 为 `wordList` 长度，`M` 为单词长度。每个单词生成 `M × 26` 个新单词，每个新单词比较需 `O(M)`。
- **空间复杂度**：`O(M × N)`，哈希集合与队列最多存储 `N` 个长度为 `M` 的单词。

### 2.2 方法二：双向 BFS

1. **思路**

单向 BFS 在两端不平衡时会访问大量无用节点。可以改为 **双向 BFS**：同时从 `beginWord` 和 `endWord` 出发，向中间搜索，当两边的访问集合相遇时即找到最短路径。

- 维护两个集合 `startSet` 与 `endSet`，每次选择较小的一边进行扩展；
- 把当前层所有单词按 2.1 的方式扩展一层，得到 `nextSet`；
- 若 `nextSet` 与对面集合有交集，说明相遇，返回总层数；
- 否则用 `nextSet` 替换当前集合，继续搜索。

双向 BFS 在最坏情况下能把搜索空间从指数级降低约一半。

2. **代码实现**

::::: code-group

```java [Java]
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;

        Set<String> startSet = new HashSet<>(), endSet = new HashSet<>();
        startSet.add(beginWord);
        endSet.add(endWord);
        Set<String> visited = new HashSet<>();
        visited.add(beginWord);
        visited.add(endWord);

        int level = 1;
        while (!startSet.isEmpty() && !endSet.isEmpty()) {
            if (startSet.size() > endSet.size()) {
                Set<String> tmp = startSet; startSet = endSet; endSet = tmp;
            }
            Set<String> nextSet = new HashSet<>();
            for (String word : startSet) {
                char[] chs = word.toCharArray();
                for (int j = 0; j < chs.length; j++) {
                    char origin = chs[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == origin) continue;
                        chs[j] = c;
                        String nxt = new String(chs);
                        if (endSet.contains(nxt)) return level + 1;
                        if (wordSet.contains(nxt) && !visited.contains(nxt)) {
                            visited.add(nxt);
                            nextSet.add(nxt);
                        }
                    }
                    chs[j] = origin;
                }
            }
            level++;
            startSet = nextSet;
        }
        return 0;
    }
}
```

```python [Python]
class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        word_set = set(wordList)
        if endWord not in word_set:
            return 0

        start_set, end_set = {beginWord}, {endWord}
        visited = {beginWord, endWord}
        level = 1

        while start_set and end_set:
            if len(start_set) > len(end_set):
                start_set, end_set = end_set, start_set
            next_set = set()
            for word in start_set:
                for j in range(len(word)):
                    for c in "abcdefghijklmnopqrstuvwxyz":
                        if c == word[j]:
                            continue
                        nxt = word[:j] + c + word[j + 1:]
                        if nxt in end_set:
                            return level + 1
                        if nxt in word_set and nxt not in visited:
                            visited.add(nxt)
                            next_set.add(nxt)
            level += 1
            start_set = next_set
        return 0
```

```cpp [C++]
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        if (!wordSet.count(endWord)) return 0;

        unordered_set<string> startSet{beginWord}, endSet{endWord};
        unordered_set<string> visited{beginWord, endWord};
        int level = 1;

        while (!startSet.empty() && !endSet.empty()) {
            if (startSet.size() > endSet.size())
                swap(startSet, endSet);
            unordered_set<string> nextSet;
            for (string word : startSet) {
                for (int j = 0; j < word.size(); j++) {
                    char origin = word[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == origin) continue;
                        word[j] = c;
                        if (endSet.count(word)) return level + 1;
                        if (wordSet.count(word) && !visited.count(word)) {
                            visited.insert(word);
                            nextSet.insert(word);
                        }
                    }
                    word[j] = origin;
                }
            }
            level++;
            startSet = nextSet;
        }
        return 0;
    }
};
```

```go [Go]
func ladderLength(beginWord string, endWord string, wordList []string) int {
    wordSet := make(map[string]bool)
    for _, w := range wordList {
        wordSet[w] = true
    }
    if !wordSet[endWord] {
        return 0
    }

    startSet := map[string]bool{beginWord: true}
    endSet := map[string]bool{endWord: true}
    visited := map[string]bool{beginWord: true, endWord: true}
    level := 1

    for len(startSet) > 0 && len(endSet) > 0 {
        if len(startSet) > len(endSet) {
            startSet, endSet = endSet, startSet
        }
        nextSet := make(map[string]bool)
        for word := range startSet {
            wb := []byte(word)
            for j := 0; j < len(wb); j++ {
                origin := wb[j]
                for c := byte('a'); c <= 'z'; c++ {
                    if c == origin {
                        continue
                    }
                    wb[j] = c
                    nxt := string(wb)
                    if endSet[nxt] {
                        return level + 1
                    }
                    if wordSet[nxt] && !visited[nxt] {
                        visited[nxt] = true
                        nextSet[nxt] = true
                    }
                }
                wb[j] = origin
            }
        }
        level++
        startSet = nextSet
    }
    return 0
}
```

```js [JavaScript]
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    let startSet = new Set([beginWord]);
    let endSet = new Set([endWord]);
    const visited = new Set([beginWord, endWord]);
    let level = 1;

    while (startSet.size && endSet.size) {
        if (startSet.size > endSet.size) {
            const tmp = startSet; startSet = endSet; endSet = tmp;
        }
        const nextSet = new Set();
        for (const word of startSet) {
            for (let j = 0; j < word.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === word[j]) continue;
                    const nxt = word.slice(0, j) + ch + word.slice(j + 1);
                    if (endSet.has(nxt)) return level + 1;
                    if (wordSet.has(nxt) && !visited.has(nxt)) {
                        visited.add(nxt);
                        nextSet.add(nxt);
                    }
                }
            }
        }
        level++;
        startSet = nextSet;
    }
    return 0;
};
```

```c [C]
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {
    int endIdx = -1;
    for (int i = 0; i < wordListSize; i++)
        if (strcmp(wordList[i], endWord) == 0) { endIdx = i; break; }
    if (endIdx == -1) return 0;

    int* startSet = (int*)malloc((wordListSize + 1) * sizeof(int));
    int* endSet = (int*)malloc((wordListSize + 1) * sizeof(int));
    int* visited = (int*)calloc(wordListSize, sizeof(int));
    int scnt = 0, ecnt = 0;
    startSet[scnt++] = -1;       // -1 表示 beginWord
    endSet[ecnt++] = endIdx;
    visited[endIdx] = 1;

    int level = 1;
    while (scnt > 0 && ecnt > 0) {
        if (scnt > ecnt) {
            int* t = startSet; startSet = endSet; endSet = t;
            int tc = scnt; scnt = ecnt; ecnt = tc;
        }
        int* nextSet = (int*)malloc((wordListSize + 1) * sizeof(int));
        int ncnt = 0;
        for (int s = 0; s < scnt; s++) {
            char* word = (startSet[s] == -1) ? beginWord : wordList[startSet[s]];
            int len = strlen(word);
            char* wb = (char*)malloc((len + 1) * sizeof(char));
            strcpy(wb, word);
            for (int j = 0; j < len; j++) {
                char origin = wb[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == origin) continue;
                    wb[j] = c;
                    bool inEnd = false;
                    for (int e = 0; e < ecnt; e++) {
                        char* ew = (endSet[e] == -1) ? beginWord : wordList[endSet[e]];
                        if (strcmp(ew, wb) == 0) { inEnd = true; break; }
                    }
                    if (inEnd) { free(wb); free(nextSet); free(startSet); free(endSet); free(visited); return level + 1; }
                    for (int k = 0; k < wordListSize; k++) {
                        if (strcmp(wordList[k], wb) == 0 && !visited[k]) {
                            visited[k] = 1;
                            nextSet[ncnt++] = k;
                            break;
                        }
                    }
                }
                wb[j] = origin;
            }
            free(wb);
        }
        level++;
        free(startSet);
        startSet = nextSet;
        scnt = ncnt;
    }
    free(startSet); free(endSet); free(visited);
    return 0;
}
```

```ts [TypeScript]
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    let startSet = new Set<string>([beginWord]);
    let endSet = new Set<string>([endWord]);
    const visited = new Set<string>([beginWord, endWord]);
    let level = 1;

    while (startSet.size && endSet.size) {
        if (startSet.size > endSet.size) {
            const tmp = startSet; startSet = endSet; endSet = tmp;
        }
        const nextSet = new Set<string>();
        for (const word of startSet) {
            for (let j = 0; j < word.length; j++) {
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === word[j]) continue;
                    const nxt = word.slice(0, j) + ch + word.slice(j + 1);
                    if (endSet.has(nxt)) return level + 1;
                    if (wordSet.has(nxt) && !visited.has(nxt)) {
                        visited.add(nxt);
                        nextSet.add(nxt);
                    }
                }
            }
        }
        level++;
        startSet = nextSet;
    }
    return 0;
}
```

:::::

3. **复杂度分析**

- **时间复杂度**：`O(M² × N)`，但双向搜索通常将实际搜索节点数减少约一半。
- **空间复杂度**：`O(M × N)`，两个集合与 visited 集合的存储开销。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| 单向 BFS | `O(M² × N)` | `O(M × N)` | 实现直观，易理解 |
| 双向 BFS | `O(M² × N)` | `O(M × N)` | 搜索空间更小，效率更高 |

其中 `N` 为单词数量，`M` 为单词长度。当 `wordList` 较大时，优先使用双向 BFS。
