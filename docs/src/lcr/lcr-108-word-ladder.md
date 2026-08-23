# [LCR 108. 单词接龙](https://leetcode.cn/problems/om3reC/)



## 一、题目描述

字典 `wordList` 中从单词 `beginWord` 和 `endWord` 进行转换，需要一个表示这个过程的 **转换序列** 是一个形式上像 `beginWord -> s1 -> s2 -> ... -> sk` 这样的单词序列，并满足：

- 每对相邻的单词之间仅有单个字母不同。
- 转换过程中的每个单词 `si`（`1 <= i <= k`）必须是字典 `wordList` 中的单词。注意，`beginWord` 不必是字典中的单词。
- `sk == endWord`

给你两个单词 `beginWord` 和 `endWord` 以及一个字典 `wordList` ，返回 **从 `beginWord` 到 `endWord` 的最短转换序列中的单词数目** 。如果不存在这样的转换序列，返回 `0` 。



**示例 1：**

```
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：5
解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
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

### 2.1 方法一：BFS（逐字符变换）

1. **思路**

把单词看作节点，相差一个字母的单词之间存在边，问题转化为求 `beginWord` 到 `endWord` 的最短路径（BFS）：

- 用哈希集合 `wordSet` 存字典，方便判存在与去重；
- BFS 队列存「当前单词 + 步数」；
- 对每个单词的每个位置尝试替换 26 个字母，若新词在字典中且未访问，入队继续。

时间 `O(n × L × 26)`，空间 `O(n)`。

2. **代码实现**

::::::: code-group

```java [Java]
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        Deque<String> q = new ArrayDeque<>();
        q.offer(beginWord);
        int step = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                String cur = q.poll();
                char[] arr = cur.toCharArray();
                for (int j = 0; j < arr.length; j++) {
                    char orig = arr[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        arr[j] = c;
                        String nxt = new String(arr);
                        if (nxt.equals(endWord)) return step + 1;
                        if (set.contains(nxt)) {
                            set.remove(nxt);
                            q.offer(nxt);
                        }
                    }
                    arr[j] = orig;
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
        s = set(wordList)
        if endWord not in s:
            return 0
        q = deque([beginWord])
        step = 1
        while q:
            for _ in range(len(q)):
                cur = q.popleft()
                for i in range(len(cur)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        if c == cur[i]:
                            continue
                        nxt = cur[:i] + c + cur[i + 1:]
                        if nxt == endWord:
                            return step + 1
                        if nxt in s:
                            s.discard(nxt)
                            q.append(nxt)
            step += 1
        return 0
```

```cpp [C++]
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> s(wordList.begin(), wordList.end());
        if (!s.count(endWord)) return 0;
        queue<string> q;
        q.push(beginWord);
        int step = 1;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                string cur = q.front(); q.pop();
                for (int j = 0; j < cur.size(); j++) {
                    char orig = cur[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == orig) continue;
                        cur[j] = c;
                        if (cur == endWord) return step + 1;
                        if (s.count(cur)) {
                            s.erase(cur);
                            q.push(cur);
                        }
                    }
                    cur[j] = orig;
                }
            }
            step++;
        }
        return 0;
    }
};
```

```go [Go]
func ladderLength(beginWord string, endWord string, wordList []string) int {
    set := map[string]bool{}
    for _, w := range wordList {
        set[w] = true
    }
    if !set[endWord] {
        return 0
    }
    q := []string{beginWord}
    step := 1
    for len(q) > 0 {
        size := len(q)
        for i := 0; i < size; i++ {
            cur := q[i]
            arr := []byte(cur)
            for j := 0; j < len(arr); j++ {
                orig := arr[j]
                for c := byte('a'); c <= 'z'; c++ {
                    if c == orig {
                        continue
                    }
                    arr[j] = c
                    nxt := string(arr)
                    if nxt == endWord {
                        return step + 1
                    }
                    if set[nxt] {
                        delete(set, nxt)
                        q = append(q, nxt)
                    }
                }
                arr[j] = orig
            }
        }
        q = q[size:]
        step++
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
    const set = new Set(wordList);
    if (!set.has(endWord)) return 0;
    const q = [beginWord];
    let step = 1;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const cur = q.shift();
            const arr = [...cur];
            for (let j = 0; j < arr.length; j++) {
                const orig = arr[j];
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === orig) continue;
                    arr[j] = ch;
                    const nxt = arr.join('');
                    if (nxt === endWord) return step + 1;
                    if (set.has(nxt)) {
                        set.delete(nxt);
                        q.push(nxt);
                    }
                }
                arr[j] = orig;
            }
        }
        step++;
    }
    return 0;
};
```

```c [C]
#include <stdlib.h>
#include <string.h>

// C 中常用「虚拟节点 + 哈希」或暴力 BFS；这里给出哈希集合 + BFS 的等价实现，
// 哈希集合用开放寻址。为便于阅读，以下用「线性探测」保存字符串索引。
typedef struct { char** keys; int* used; int size; } HashSet;

#define HSIZE 20003

static int hset_put(HashSet* hs, char* key) {
    int h = 0;
    for (int i = 0; key[i]; i++) h = (h * 31 + key[i]) % HSIZE;
    while (hs->used[h] && strcmp(hs->keys[h], key) != 0) h = (h + 1) % HSIZE;
    if (hs->used[h]) return 0;
    hs->keys[h] = key;
    hs->used[h] = 1;
    return 1;
}

static int hset_has(HashSet* hs, char* key) {
    int h = 0;
    for (int i = 0; key[i]; i++) h = (h * 31 + key[i]) % HSIZE;
    while (hs->used[h]) {
        if (strcmp(hs->keys[h], key) == 0) return 1;
        h = (h + 1) % HSIZE;
    }
    return 0;
}

static int hset_remove(HashSet* hs, char* key) {
    int h = 0;
    for (int i = 0; key[i]; i++) h = (h * 31 + key[i]) % HSIZE;
    while (hs->used[h]) {
        if (strcmp(hs->keys[h], key) == 0) { hs->used[h] = 0; return 1; }
        h = (h + 1) % HSIZE;
    }
    return 0;
}

int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {
    HashSet hs;
    hs.keys = (char**)calloc(HSIZE, sizeof(char*));
    hs.used = (int*)calloc(HSIZE, sizeof(int));
    for (int i = 0; i < wordListSize; i++) hset_put(&hs, wordList[i]);
    if (!hset_has(&hs, endWord)) return 0;
    char** q = (char**)malloc((wordListSize + 1) * sizeof(char*));
    int head = 0, tail = 0;
    q[tail++] = beginWord;
    int step = 1, len = (int)strlen(beginWord);
    while (head < tail) {
        int size = tail - head;
        for (int i = 0; i < size; i++) {
            char* cur = q[head++];
            for (int j = 0; j < len; j++) {
                for (char c = 'a'; c <= 'z'; c++) {
                    if (c == cur[j]) continue;
                    char* nxt = (char*)malloc((len + 1) * sizeof(char));
                    strcpy(nxt, cur);
                    nxt[j] = c;
                    if (strcmp(nxt, endWord) == 0) { free(nxt); return step + 1; }
                    if (hset_has(&hs, nxt)) {
                        hset_remove(&hs, nxt);
                        q[tail++] = nxt;
                    } else {
                        free(nxt);
                    }
                }
            }
        }
        step++;
    }
    return 0;
}
```

```ts [TypeScript]
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    const set = new Set(wordList);
    if (!set.has(endWord)) return 0;
    const q: string[] = [beginWord];
    let step = 1;
    while (q.length) {
        const size = q.length;
        for (let i = 0; i < size; i++) {
            const cur = q.shift()!;
            const arr = [...cur];
            for (let j = 0; j < arr.length; j++) {
                const orig = arr[j];
                for (let c = 97; c <= 122; c++) {
                    const ch = String.fromCharCode(c);
                    if (ch === orig) continue;
                    arr[j] = ch;
                    const nxt = arr.join('');
                    if (nxt === endWord) return step + 1;
                    if (set.has(nxt)) {
                        set.delete(nxt);
                        q.push(nxt);
                    }
                }
                arr[j] = orig;
            }
        }
        step++;
    }
    return 0;
}
```

:::::::

3. **复杂度分析**

- **时间复杂度**：`O(n × L × 26)`，`L` 为单词长度。
- **空间复杂度**：`O(n)`，哈希集合与队列。

## 三、总结

| 方法 | 时间复杂度 | 空间复杂度 | 特点 |
| ---- | ---------- | ---------- | ---- |
| BFS 逐字符变换 | `O(n·L·26)` | `O(n)` | 标准解法 |

把「单词接龙」建模为图最短路，BFS 逐层扩展自然求出最短长度。每步枚举每个位置的 26 个字母，命中字典即入队并删除（避免回头）。

